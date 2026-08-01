import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, Wallet } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApiError, apiRequest } from '@/lib/api';
import {
  buildEventSlug,
  getLocalizedText,
  parseEventSlug,
  resolveLocale,
} from '@/lib/catalog';

const LOOKUP_STORAGE_KEY = 'nukhbaglobal_last_checkout_lookup';
const DONATION_PRESET_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];
const CUSTOMER_PHONE_MAX_LENGTH = 16;

const COPY = {
  ku: {
    back: 'گەڕانەوە  ',
    loading: 'چاوەڕێی checkout...',
    notFound: 'زانیارییەکانی booking نەدۆزرایەوە.',
    stepsTitle: 'هەنگاوەکانی حجزکردن',
    steps: ['تیکەت', 'وردەکاری', 'پارەدان'],
    next: 'هەنگاوی داهاتوو',
    previous: 'گەڕانەوە',
    createPayment: 'پارەدان',
    ticketHelp: 'ژمارەی ticket ـەکان هەڵبژێرە',
    detailsHelp: 'زانیارییەکانی کڕیار پڕبکەرەوە',
    paymentHelp: 'پوختەی داواکارییەکە بپشکنە و بچۆ بۆ payment',
    empty: 'بۆ ئەم event ـە ticket ـی checkout بەردەست نییە.',
    summary: 'پوختە',
    ticketSubtitle: 'ئەم دەقە لە داشبۆردەوە دێت',
    ticketPriceQty: 'ژمارەی تیکەت     /    نرخەکەی',
    customerName: 'ناوی دووانی',
    customerPhone: 'ژمارە/ وەتس ئەپ',
    customerEmail: 'ئیمەیڵ',
    customerGender: 'ڕەگەز',
    customerAddressOptional: 'ناونیشان (ئیختیاری)',
    chooseGender: 'ڕەگەز هەڵبژێرە',
    genderMale: 'نێر',
    genderFemale: 'مێ',
    customerAddress: 'ناونیشان',
    donation: 'بەخشین',
    donationHelp: 'چەند دەتوانیت ببەخشە بۆ بەردەوام بونمان جزاک اللە خیرا',
    donationPresetLabel: 'بڕی خێرا هەڵبژێرە',
    donationCustomPlaceholder: 'یان بڕی خۆت بنووسە',
    total: 'کۆی گشتی',
    ticketsLabel: 'تیکەت',
    required: 'تکایە ticket و زانیاری سەرەکیەکان پڕبکەرەوە.',
    openPayment: 'چوونە FIB بۆ پارەدان',
    ticketQty: 'دانە',
    selectedSubEvent: 'Sub-event هەڵبژێردراو',
    soldOut: 'ئەم ticket ـە تەواو بووە',
    ticketStepRequired: 'تکایە لانیکەم یەک ticket هەڵبژێرە پێش چوونە هەنگاوی داهاتوو.',
    detailsStepRequired: 'تکایە ناو، مۆبایل، ئیمەیڵ و ڕەگەز پڕبکەرەوە پێش چوونە Payment.',
    invalidName: 'ناو تەنها دەق و بۆشایی و نیشانە سادەکان وەک - و \' وەردەگرێت.',
    invalidPhone: 'ژمارەی مۆبایل تەنها دەبێت لە ژمارە پێکبێت.',
    invalidEmail: 'تکایە ئیمەیڵێکی دروست بنووسە.',
  },
  ar: {
    back: 'العودة',
    loading: 'جاري تحميل صفحة الحجز...',
    notFound: 'تعذر العثور على بيانات الحجز لهذه الفعالية.',
    stepsTitle: 'خطوات الحجز',
    steps: ['التذاكر', 'التفاصيل', 'الدفع'],
    next: 'التالي',
    previous: 'السابق',
    createPayment: 'إنشاء الدفع',
    ticketHelp: 'اختر عدد التذاكر المناسبة',
    detailsHelp: 'أدخل بيانات العميل',
    paymentHelp: 'راجع الطلب ثم انتقل إلى الدفع',
    empty: 'لا توجد تذاكر متاحة للحجز حالياً.',
    summary: 'الملخص',
    ticketSubtitle: 'هذا النص يأتي من لوحة التحكم',
    ticketPriceQty: 'عدد التذاكر / السعر',
    customerName: 'اسم العميل',
    customerPhone: 'رقم الهاتف',
    customerEmail: 'البريد الإلكتروني',
    customerGender: 'الجنس',
    customerAddressOptional: 'العنوان (اختياري)',
    chooseGender: 'اختر الجنس',
    genderMale: 'ذكر',
    genderFemale: 'أنثى',
    customerAddress: 'العنوان',
    donation: 'التبرع',
    donationHelp: 'تبرّع بما تستطيع، وجزاكم الله خيرًا على دعمكم المستمر.',
    donationPresetLabel: 'اختر مبلغًا سريعًا',
    donationCustomPlaceholder: 'أو اكتب مبلغك',
    total: 'الإجمالي',
    ticketsLabel: 'التذاكر',
    required: 'يرجى اختيار تذكرة واحدة على الأقل وإكمال البيانات الأساسية.',
    openPayment: 'الانتقال إلى دفع FIB',
    ticketQty: 'الكمية',
    selectedSubEvent: 'الجلسة المختارة',
    soldOut: 'هذه التذكرة نفدت',
    ticketStepRequired: 'يرجى اختيار تذكرة واحدة على الأقل قبل الانتقال إلى الخطوة التالية.',
    detailsStepRequired: 'يرجى إدخال الاسم ورقم الهاتف والبريد الإلكتروني والجنس قبل الانتقال إلى الدفع.',
    invalidName: 'يجب أن يحتوي الاسم على أحرف فقط مع المسافات والرموز البسيطة مثل - و \'.',
    invalidPhone: 'يجب أن يحتوي رقم الهاتف على أرقام فقط.',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
  },
  en: {
    back: 'Back ',
    loading: 'Loading checkout...',
    notFound: 'Booking data could not be found for this event.',
    stepsTitle: 'Booking Steps',
    steps: ['Tickets', 'Details', 'Payment'],
    next: 'Next step',
    previous: 'Previous',
    createPayment: 'Create payment',
    ticketHelp: 'Choose the ticket quantities',
    detailsHelp: 'Fill in the customer details',
    paymentHelp: 'Review the order before moving into payment',
    empty: 'No tickets are currently available for checkout.',
    summary: 'Summary',
    ticketSubtitle: 'This text comes from the dashboard',
    ticketPriceQty: 'Ticket quantity / Price',
    customerName: 'Customer name',
    customerPhone: 'Phone number',
    customerEmail: 'Email address',
    customerGender: 'Gender',
    customerAddressOptional: 'Address (optional)',
    chooseGender: 'Select gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    customerAddress: 'Address',
    donation: 'Donation',
    donationHelp: 'Donate whatever you can. Jazakum Allahu Khayran for your continued support.',
    donationPresetLabel: 'Choose a quick amount',
    donationCustomPlaceholder: 'Or enter your own amount',
    total: 'Total',
    ticketsLabel: 'Tickets',
    required: 'Please select at least one ticket and complete the required fields.',
    openPayment: 'Continue to FIB payment',
    ticketQty: 'Quantity',
    selectedSubEvent: 'Selected sub-event',
    soldOut: 'This ticket is sold out',
    ticketStepRequired: 'Please select at least one ticket before continuing to the next step.',
    detailsStepRequired: 'Please fill in name, phone, email, and gender before continuing to Payment.',
    invalidName: 'Name can contain letters, spaces, and simple characters like - and \'.',
    invalidPhone: 'Phone number must contain digits only.',
    invalidEmail: 'Please enter a valid email address.',
  },
};

function persistLookup(payload) {
  sessionStorage.setItem(LOOKUP_STORAGE_KEY, JSON.stringify(payload));
}

function buildFibReturnUrl({ eventSlug, customerPhone, customerEmail, customerName }) {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams({ returned: '1' });

  if (customerPhone) {
    params.set('phone', customerPhone);
  }
  if (customerEmail) {
    params.set('email', customerEmail);
  }
  if (customerName) {
    params.set('name', customerName);
  }

  return `${window.location.origin}/events/${eventSlug}/checkout/status?${params.toString()}`;
}

function sanitizeDonationAmount(value) {
  return String(value || '').replace(/[^\d]/g, '').replace(/^0+(?=\d)/, '');
}

function formatDonationAmount(value) {
  const normalized = sanitizeDonationAmount(value);

  if (!normalized) {
    return '';
  }

  return new Intl.NumberFormat('en-US').format(Number(normalized));
}

function sanitizeCustomerName(value) {
  return String(value || '').replace(/[^A-Za-z\u0600-\u06FF\s'-]/g, '');
}

function sanitizeCustomerPhone(value) {
  return String(value || '').replace(/[^\d]/g, '').slice(0, CUSTOMER_PHONE_MAX_LENGTH);
}

function sanitizeCustomerEmail(value) {
  return String(value || '').replace(/\s+/g, '').toLowerCase();
}

function isValidCustomerName(value) {
  return /^[A-Za-z\u0600-\u06FF\s'-]+$/.test(String(value || '').trim());
}

function isValidCustomerPhone(value) {
  return new RegExp(`^\\d{1,${CUSTOMER_PHONE_MAX_LENGTH}}$`).test(String(value || '').trim());
}

function isValidCustomerEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export default function EventCheckoutPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = COPY[locale] || COPY.ku;
  const eventId = useMemo(() => parseEventSlug(slug).id, [slug]);
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [customer, setCustomer] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_gender: '',
    customer_address: '',
    donation_amount: '0',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showDonationPresets, setShowDonationPresets] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    let ignore = false;

    apiRequest(`/api/catalog/events/${eventId}/checkout`)
      .then((response) => {
        if (!ignore) {
          setPayload(response?.data || null);
        }
      })
      .catch(() => {
        if (!ignore) {
          setPayload(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [eventId]);

  const event = payload?.event;
  const allTickets = useMemo(() => (Array.isArray(payload?.tickets) ? payload.tickets : []), [payload?.tickets]);
  const requestedSubEventId = Number(searchParams.get('subEventId') || 0) || null;
  const tickets = useMemo(() => {
    if (!requestedSubEventId) {
      return allTickets;
    }

    return allTickets.filter((ticket) => ticket.subEventId === requestedSubEventId);
  }, [allTickets, requestedSubEventId]);
  const detailRoute = event ? `/events/${buildEventSlug(event)}` : '/';
  useEffect(() => {
    setQuantities((current) => Object.fromEntries(
      Object.entries(current).filter(([ticketId]) => tickets.some((ticket) => String(ticket.id) === ticketId)),
    ));
  }, [tickets]);

  const selectedItems = useMemo(
    () => tickets
      .map((ticket) => ({
        ticket,
        quantity: Number(quantities[ticket.id] || 0),
      }))
      .filter((entry) => entry.quantity > 0),
    [tickets, quantities],
  );

  const ticketsTotal = useMemo(
    () => selectedItems.reduce((sum, entry) => sum + (Number(entry.ticket.price || 0) * entry.quantity), 0),
    [selectedItems],
  );
  const donationAmount = Math.max(0, Number(customer.donation_amount || 0));
  const totalAmount = ticketsTotal + donationAmount;
  const formattedDonationAmount = formatDonationAmount(customer.donation_amount);
  const hasCustomerDetails = customer.customer_name.trim() !== ''
    && customer.customer_phone.trim() !== ''
    && customer.customer_email.trim() !== ''
    && customer.customer_gender.trim() !== '';
  const customerDetailsError = useMemo(() => {
    if (!hasCustomerDetails) {
      return copy.detailsStepRequired;
    }

    if (!isValidCustomerName(customer.customer_name)) {
      return copy.invalidName;
    }

    if (!isValidCustomerPhone(customer.customer_phone)) {
      return copy.invalidPhone;
    }

    if (!isValidCustomerEmail(customer.customer_email)) {
      return copy.invalidEmail;
    }

    return '';
  }, [copy.detailsStepRequired, copy.invalidEmail, copy.invalidName, copy.invalidPhone, customer.customer_email, customer.customer_name, customer.customer_phone, hasCustomerDetails]);

  if (!eventId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">{copy.loading}</div>;
  }

  if (!event) {
    return <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">{copy.notFound}</div>;
  }

  const updateQuantity = (ticket, nextValue) => {
    const max = Math.max(0, Math.min(ticket.maxPerUser || 99, ticket.remainingCount || 0));
    const normalized = Math.max(0, Math.min(max, nextValue));

    setQuantities((current) => ({
      ...current,
      [ticket.id]: normalized,
    }));
  };

  const handleNextStep = () => {
    if (step === 0 && selectedItems.length === 0) {
      setError(copy.ticketStepRequired);
      return;
    }

    if (step === 1 && customerDetailsError) {
      setError(customerDetailsError);
      return;
    }

    setError('');
    setStep((current) => Math.min(2, current + 1));
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      setError(copy.ticketStepRequired);
      return;
    }

    if (customerDetailsError) {
      setError(customerDetailsError);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const eventSlug = buildEventSlug(event);
      const returnUrl = buildFibReturnUrl({
        eventSlug,
        customerPhone: customer.customer_phone.trim(),
        customerEmail: customer.customer_email.trim(),
        customerName: customer.customer_name.trim(),
      });
      const response = await apiRequest('/api/payments/fib/checkout', {
        method: 'POST',
        body: {
          customer_name: customer.customer_name.trim(),
          customer_phone: customer.customer_phone.trim(),
          customer_email: customer.customer_email.trim() || null,
          customer_gender: customer.customer_gender.trim(),
          customer_address: customer.customer_address.trim() || null,
          donation_amount: donationAmount,
          total_amount: totalAmount,
          return_url: returnUrl,
          items: selectedItems.map((entry) => ({
            ticket_id: entry.ticket.id,
            quantity: entry.quantity,
          })),
        },
      });

      const checkout = response?.data || {};
      persistLookup({
        eventId,
        eventSlug,
        orderNumber: checkout.orderNumber,
        paymentId: checkout.paymentId,
        customerPhone: customer.customer_phone.trim(),
        customerEmail: customer.customer_email.trim(),
        customerName: customer.customer_name.trim(),
        paymentLinks: {
          qrCode: checkout.qrCode || null,
          redirectionLink: checkout.redirectionLink || null,
          readableCode: checkout.readableCode || null,
        },
      });

      navigate(`/events/${eventSlug}/checkout/status`, {
        replace: true,
        state: {
          orderNumber: checkout.orderNumber,
          paymentId: checkout.paymentId,
        },
      });
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : 'Checkout failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDonationAmountChange = (event) => {
    setCustomer((current) => ({
      ...current,
      donation_amount: sanitizeDonationAmount(event.target.value),
    }));
  };

  const handleDonationPresetSelect = (amount) => {
    setCustomer((current) => ({
      ...current,
      donation_amount: String(amount),
    }));
    setShowDonationPresets(false);
  };
  return (
    <div className=" text-white   w-full justify-center mb-44 lg:mb-0  ">
      <div className="container  mx-auto max-w-[700px]  px-4 lg:py-10 sm:px-6 lg:px-8">
        <Link to={detailRoute} className="hidden lg:inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          {copy.back}
        </Link>

        <div className="mt-7  gap-8 ">
          <section className="rounded-[2rem]  bg-white/[0.03] p-4 pb-10 border border-[#26241b]  sm:p-9">
            {/* <p className="text-xs uppercase  text-[#d8c78f]">{title}</p> */}
            <p className=" text-lg font-semibold  text-[#d8c78f]">{copy.stepsTitle}</p>
            <div className="mt-2 pb-2 space-x-1 border-b border-[#26241b]">
              {copy.steps.map((label, index) => (
                <div
                  key={label}
                  className={`inline-flex min-w-0 items-center justify-center  rounded-full px-3 py-1 text-center text-sm ${
                    index === step
                      ? 'bg-[#d8c78f]/12 text-[#f1e5b8]'
                      : 'bg-white/[0.02] text-white/55'
                  }`}
                >
                  <span className="inline-flex  h-6 w-4 shrink-0 items-center justify-center rounded-full bg-white/8 text-[11px]">
                    {index + 1}
                  </span>
                  <span className="truncate ">{label}</span>
                </div>
              ))}
            </div>

            {/* <p className="mt-5 text-sm text-white/60">{stepHelp}</p> */}

         
               {/* hangawy 1 */}
            {step === 0 ? (
              <div className="mt-4 space-y-4 ">
                {tickets.length > 0 ? tickets.map((ticket) => {
                  const quantity = Number(quantities[ticket.id] || 0);
                  const isSoldOut = Number(ticket.remainingCount || 0) <= 0;
                  return (
                    <div key={ticket.id} className="rounded-[1.5rem] my-7 border border-white/10 bg-black/20 p-5">
                      <div className="flex flex-wrap flex-col items-start justify-between ">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{getLocalizedText(ticket.title, locale, ticket.titleText || 'Ticket')}</h3>
                          {/* {ticket.subEventTitle || ticket.subEventTitleText ? (
                            <p className="mt-1 text-sm text-white/55">
                              {getLocalizedText(ticket.subEventTitle, locale, ticket.subEventTitleText || copy.ticketSubtitle)}
                            </p>
                          ) : null} */}
                          <div className="mt-1 flex flex-wrap  gap-3 font-light text-xs uppercase  text-white/45">
                            {isSoldOut ? (
                              <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-2 text-rose-200">
                                {copy.soldOut}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex  flex-col items-start text-left">
                          <p className="text-xs font-medium text-white/50">{copy.ticketPriceQty}</p>
                          <div className="mt-3 flex  w-full items-center gap-4">

                            {/* quantity */}
                            <div className="inline-flex items-center  rounded-full border border-white/10 bg-white/[0.03] ">
                              <button
                                type="button"
                                onClick={() => updateQuantity(ticket, quantity - 1)}
                                disabled={isSoldOut}
                                className="rounded-full p-2 text-white/72 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-10 text-center text-sm font-semibold">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(ticket, quantity + 1)}
                                disabled={isSoldOut}
                                className="rounded-full p-2 text-white/72 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* price */}
                            <p className="text-xl font-bold text-[#eadcae]">{Number(ticket.price || 0).toLocaleString()} IQD</p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-8 text-sm text-white/60">
                    {copy.empty}
                  </div>
                )}


                {/* Donation */}
                <div className='mt-5 border-t border-[#26241b]'>
                <label className="space-y-3 text-sm text-white/76 ">
                  <div className='mt-4 text-primary'>{copy.donation}</div>
                  <p className="text-xs text-white/70 ">{copy.donationHelp}</p>
                  <div className="rounded-[1.5rem]   ">
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formattedDonationAmount}
                        onChange={handleDonationAmountChange}
                        onFocus={() => setShowDonationPresets(true)}
                        onBlur={() => setTimeout(() => setShowDonationPresets(false), 200)}
                        placeholder={copy.donationCustomPlaceholder}
                        className="relative z-40 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pe-16 text-white placeholder:text-white/30 outline-none transition focus:border-[#C5B78E]/60 focus:bg-white/[0.06]"
                      />
                      <span className="pointer-events-none absolute inset-y-0 end-4 z-40 flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/34">
                        IQD
                      </span>

                      <div
                        className={`absolute left-0 top-[calc(100%+8px)] z-[999] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0805] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                          showDonationPresets ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                        }`}
                      >
                        <div className="p-2">
                          <div className="mb-1 px-3 py-2 text-[10px] font-bold uppercase text-white/40">
                            {copy.donationPresetLabel}
                          </div>
                          {DONATION_PRESET_AMOUNTS.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => handleDonationPresetSelect(amount)}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
                            >
                              <span>{formatDonationAmount(amount)}</span>
                              <span className="text-xs text-[#C5B78E]/60">IQD</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
                </div>



              </div>
            ) : null}

            {/* hangawy 2 */}
            {step === 1 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ['customer_name', copy.customerName, 'text'],
                  ['customer_phone', copy.customerPhone, 'tel'],
                  ['customer_email', copy.customerEmail, 'email'],
                  ['customer_gender', copy.customerGender, 'select'],
                  // ['customer_address', copy.customerAddressOptional, 'text'],
                ].map(([field, label, type]) => (
                  <label key={field} className={`space-y-2 text-sm text-white/60 ${field === 'customer_address' || field === 'customer_gender' ? 'sm:col-span-2' : ''}`}>
                    <span>{label}</span>
                    {field === 'customer_gender' ? (
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          ['male', copy.genderMale],
                          ['female', copy.genderFemale],
                        ].map(([value, optionLabel]) => {
                          const checked = customer.customer_gender === value;

                          return (
                            <label
                              key={value}
                              className={`group  flex cursor-pointer items-center gap-3 rounded-2xl  px-4 py-3 transition ${
                                checked
                                  ? 'border-[#d8c78f]/60 bg-[#d8c78f]/12 text-[#f1e5b8]'
                                  : 'border-white/8 bg-white/[0.04] text-white/72 hover:border-white/15 hover:bg-white/[0.06]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="customer_gender"
                                value={value}
                                checked={checked}
                                onChange={(event) => setCustomer((current) => ({ ...current, customer_gender: event.target.value }))}
                                className="sr-only "
                              />
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary/10 transition ${
                                  checked
                                    ? 'border-[#d8c78f] bg-[#d8c78f] text-[#1b1607]'
                                    : 'border-white/18 bg-black/50 text-transparent group-hover:border-white/30'
                                }`}
                              >
                                ✓
                              </span>
                              <span className="text-sm font-medium">{optionLabel}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <input
                        type={type}
                        value={customer[field]}
                        onChange={(event) => {
                          const nextValue = field === 'customer_name'
                            ? sanitizeCustomerName(event.target.value)
                            : field === 'customer_phone'
                              ? sanitizeCustomerPhone(event.target.value)
                              : field === 'customer_email'
                                ? sanitizeCustomerEmail(event.target.value)
                                : event.target.value;

                          setCustomer((current) => ({ ...current, [field]: nextValue }));
                        }}
                        inputMode={field === 'customer_phone' ? 'numeric' : field === 'customer_email' ? 'email' : 'text'}
                        pattern={field === 'customer_phone' ? '[0-9]*' : undefined}
                        maxLength={field === 'customer_phone' ? CUSTOMER_PHONE_MAX_LENGTH : undefined}
                        autoComplete={field === 'customer_name' ? 'name' : field === 'customer_phone' ? 'tel' : field === 'customer_email' ? 'email' : 'off'}
                        autoCapitalize={field === 'customer_email' ? 'none' : 'sentences'}
                        spellCheck={field === 'customer_email' ? false : true}
                        className="h-12 w-full rounded-2xl border border-primary/10 text-right bg-white/[0.04] px-4 text-white outline-none"
                      />
                    )}
                  </label>
                ))}
              </div>
            ) : null}

{/* hangawy 3 */}
            {step === 2 ? (
              <div className="mt-8 space-y-4">
                {selectedItems.map((entry) => (
                  <div key={entry.ticket.id} className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4">
                    <div>
                      <p className="font-medium text-white">{getLocalizedText(entry.ticket.title, locale, entry.ticket.titleText || 'Ticket')}</p>
                      <p className="mt-1 text-sm text-white/55">{Number(entry.ticket.price || 0).toLocaleString()} &#215; {entry.quantity}  </p>
                    </div>
                    <p className="text-lg font-semibold text-[#eadcae]">{(entry.quantity * Number(entry.ticket.price || 0)).toLocaleString()} IQD</p>
                  </div>
                ))}
                <div className="rounded-[1.5rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-5 text-sm text-white/72">
                  <p className='text-white/80'><span className='text-white'>{copy.customerName} :&nbsp; </span> {customer.customer_name || '-'}</p>
                  <p className="mt-2 text-white/80"><span className='text-white'>{copy.customerPhone} :&nbsp; </span> {customer.customer_phone || '-'}</p>
                  <p className="mt-2 text-white/80"><span className='text-white'>{copy.customerEmail} :&nbsp; </span> {customer.customer_email || '-'}</p>
                  {/* <p className="mt-2">{copy.customerGender}: {getGenderLabel(customer.customer_gender, copy)}</p> */}
                  {/* <p className="mt-2">{copy.customerAddress}: {customer.customer_address || '-'}</p> */}
                </div>
              </div>
            ) : null}

            {error ? <p className="mt-5 text-sm text-rose-300">{error}</p> : null}
                <div className="mt-4 flex items-center justify-between border-b border-white/10 pt-4">
                {step === 1 ? null : (
                  <>
                  <span className="text-lg uppercase text-[#d8c78f]">{copy.total}</span>
                  <span className="text-xl font-bold text-white">{totalAmount.toLocaleString()} IQD</span>
                  </>
                )}  

              </div>
            <div className="mt-5 flex justify-between flex-wrap items-center gap-3">
              
              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => { handleNextStep(); window.scrollTo({ top: 0, behavior: 'smooth' })}}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d8c78f] px-5 py-3 text-xs font-semibold text-[#1b1607] transition hover:bg-[#e6d7a1]"
                >
                  {copy.next}
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d8c78f] px-5 py-3 text-sm font-semibold text-[#1b1607] transition hover:bg-[#e6d7a1] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Wallet className="h-4 w-4" />
                  {submitting ? '...' : copy.createPayment}
                </button>
              )}
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs text-white/78 transition hover:bg-white/[0.07]"
                >
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                  {copy.previous}
                </button>
              ) : null}

            </div>
          
          </section>

         {/* Summary aside */}
          {/* <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <p className="text-xs uppercase  text-[#d8c78f]">{copy.summary}</p>
            <div className="mt-6 rounded-[1.6rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-5">
              <div className="flex items-center justify-between text-sm text-white/65">
                <span>{copy.ticketsLabel}</span>
                <span>{ticketsTotal.toLocaleString()} IQD</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-white/65">
                <span>{copy.donation}</span>
                <span>{donationAmount.toLocaleString()} IQD</span>
              </div>
              
            </div>
          </aside> */}
        </div>
      </div>
    </div>
  );
}
