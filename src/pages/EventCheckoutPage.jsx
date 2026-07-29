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

const COPY = {
  ku: {
    back: 'گەڕانەوە بۆ event',
    loading: 'چاوەڕێی checkout...',
    notFound: 'زانیارییەکانی booking نەدۆزرایەوە.',
    stepsTitle: 'هەنگاوەکانی حجزکردن',
    steps: ['تیکەت', 'وردەکاری', 'پارەدان'],
    next: 'هەنگاوی داهاتوو',
    previous: 'گەڕانەوە',
    createPayment: 'دروستکردنی payment',
    ticketHelp: 'ژمارەی ticket ـەکان هەڵبژێرە',
    detailsHelp: 'زانیارییەکانی کڕیار پڕبکەرەوە',
    paymentHelp: 'پوختەی داواکارییەکە بپشکنە و بچۆ بۆ payment',
    empty: 'بۆ ئەم event ـە ticket ـی checkout بەردەست نییە.',
    summary: 'پوختە',
    ticketSubtitle: 'ئەم دەقە لە داشبۆردەوە دێت',
    ticketPriceQty: 'ژمارەی تیکەت / نرخەکە',
    customerName: 'ناوی کڕیار',
    customerPhone: 'مۆبایل',
    customerEmail: 'ئیمەیڵ',
    customerAddress: 'ناونیشان',
    donation: 'بەخشین',
    donationHelp: 'چەند دەتوانیت ببەخشە بۆ بەردەوام بونمان جزاک اللە خیرا',
    total: 'کۆی گشتی',
    ticketsLabel: 'تیکەت',
    required: 'تکایە ticket و زانیاری سەرەکیەکان پڕبکەرەوە.',
    openPayment: 'چوونە FIB payment',
    ticketQty: 'دانە',
    selectedSubEvent: 'Sub-event هەڵبژێردراو',
    soldOut: 'ئەم ticket ـە تەواو بووە',
    ticketStepRequired: 'تکایە لانیکەم یەک ticket هەڵبژێرە پێش چوونە هەنگاوی داهاتوو.',
    detailsStepRequired: 'تکایە ناو، مۆبایل، ئیمەیڵ و ناونیشان پڕبکەرەوە پێش چوونە Payment.',
  },
  ar: {
    back: 'العودة إلى الفعالية',
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
    customerAddress: 'العنوان',
    donation: 'التبرع',
    donationHelp: 'تبرّع بما تستطيع، وجزاكم الله خيرًا على دعمكم المستمر.',
    total: 'الإجمالي',
    ticketsLabel: 'التذاكر',
    required: 'يرجى اختيار تذكرة واحدة على الأقل وإكمال البيانات الأساسية.',
    openPayment: 'الانتقال إلى دفع FIB',
    ticketQty: 'الكمية',
    selectedSubEvent: 'الجلسة المختارة',
    soldOut: 'هذه التذكرة نفدت',
    ticketStepRequired: 'يرجى اختيار تذكرة واحدة على الأقل قبل الانتقال إلى الخطوة التالية.',
    detailsStepRequired: 'يرجى إدخال الاسم ورقم الهاتف والبريد الإلكتروني والعنوان قبل الانتقال إلى الدفع.',
  },
  en: {
    back: 'Back to event',
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
    customerAddress: 'Address',
    donation: 'Donation',
    donationHelp: 'Donate whatever you can. Jazakum Allahu Khayran for your continued support.',
    total: 'Total',
    ticketsLabel: 'Tickets',
    required: 'Please select at least one ticket and complete the required fields.',
    openPayment: 'Continue to FIB payment',
    ticketQty: 'Quantity',
    selectedSubEvent: 'Selected sub-event',
    soldOut: 'This ticket is sold out',
    ticketStepRequired: 'Please select at least one ticket before continuing to the next step.',
    detailsStepRequired: 'Please fill in name, phone, email, and address before continuing to Payment.',
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
    customer_address: '',
    donation_amount: '0',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
  const hasCustomerDetails = customer.customer_name.trim() !== ''
    && customer.customer_phone.trim() !== ''
    && customer.customer_email.trim() !== ''
    && customer.customer_address.trim() !== '';

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

    if (step === 1 && !hasCustomerDetails) {
      setError(copy.detailsStepRequired);
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

    if (!hasCustomerDetails) {
      setError(copy.detailsStepRequired);
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
  return (
    <div className="bg-[#06070b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to={detailRoute} className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          {copy.back}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            {/* <p className="text-xs uppercase  text-[#d8c78f]">{title}</p> */}
            <p className="mt-5 text-lg font-semibold text-[#d8c78f]">{copy.stepsTitle}</p>
            <div className="mt-4 grid grid-cols-3">
              {copy.steps.map((label, index) => (
                <div
                  key={label}
                  className={`inline-flex min-w-0 items-center justify-center  rounded-full px-2 py-2.5 text-center text-sm ${
                    index === step
                      ? 'bg-[#d8c78f]/12 text-[#f1e5b8]'
                      : 'bg-white/[0.02] text-white/55'
                  }`}
                >
                  <span className="inline-flex h-6 w-4 shrink-0 items-center justify-center rounded-full bg-white/8 text-[11px]">
                    {index + 1}
                  </span>
                  <span className="truncate">{label}</span>
                </div>
              ))}
            </div>

            {/* <p className="mt-5 text-sm text-white/60">{stepHelp}</p> */}

         

            {step === 0 ? (
              <div className="mt-8 space-y-4">
                {tickets.length > 0 ? tickets.map((ticket) => {
                  const quantity = Number(quantities[ticket.id] || 0);
                  const isSoldOut = Number(ticket.remainingCount || 0) <= 0;
                  return (
                    <div key={ticket.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{getLocalizedText(ticket.title, locale, ticket.titleText || 'Ticket')}</h3>
                          {ticket.subEventTitle || ticket.subEventTitleText ? (
                            <p className="mt-1 text-sm text-white/55">
                              {getLocalizedText(ticket.subEventTitle, locale, ticket.subEventTitleText || copy.ticketSubtitle)}
                            </p>
                          ) : null}
                          <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-white/45">
                            {isSoldOut ? (
                              <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-3 py-2 text-rose-200">
                                {copy.soldOut}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex min-w-[13rem] flex-col items-end text-right">
                          <p className="text-xs font-medium text-white/50">{copy.ticketPriceQty}</p>
                          <div className="mt-3 flex items-center gap-4">
                            <p className="text-2xl font-bold text-[#eadcae]">{Number(ticket.price || 0).toLocaleString()} IQD</p>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
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

                <label className="space-y-2 text-sm text-white/76">
                  <span>{copy.donation}</span>
                  <p className="text-xs text-white/52">{copy.donationHelp}</p>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={customer.donation_amount}
                    onChange={(event) => setCustomer((current) => ({ ...current, donation_amount: event.target.value }))}
                    className="h-12 w-full rounded-2xl border border-white/8 bg-white/[0.04] px-4 text-white outline-none"
                  />
                </label>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ['customer_name', copy.customerName, 'text'],
                  ['customer_phone', copy.customerPhone, 'tel'],
                  ['customer_email', copy.customerEmail, 'email'],
                  ['customer_address', copy.customerAddress, 'text'],
                ].map(([field, label, type]) => (
                  <label key={field} className={`space-y-2 text-sm text-white/76 ${field === 'customer_address' ? 'sm:col-span-2' : ''}`}>
                    <span>{label}</span>
                    <input
                      type={type}
                      value={customer[field]}
                      onChange={(event) => setCustomer((current) => ({ ...current, [field]: event.target.value }))}
                      className="h-12 w-full rounded-2xl border border-white/8 bg-white/[0.04] px-4 text-white outline-none"
                    />
                  </label>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-8 space-y-4">
                {selectedItems.map((entry) => (
                  <div key={entry.ticket.id} className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4">
                    <div>
                      <p className="font-medium text-white">{getLocalizedText(entry.ticket.title, locale, entry.ticket.titleText || 'Ticket')}</p>
                      <p className="mt-1 text-sm text-white/55">{entry.quantity} x {Number(entry.ticket.price || 0).toLocaleString()} IQD</p>
                    </div>
                    <p className="text-lg font-semibold text-[#eadcae]">{(entry.quantity * Number(entry.ticket.price || 0)).toLocaleString()} IQD</p>
                  </div>
                ))}
                <div className="rounded-[1.5rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-5 text-sm text-white/72">
                  <p>{copy.customerName}: {customer.customer_name || '-'}</p>
                  <p className="mt-2">{copy.customerPhone}: {customer.customer_phone || '-'}</p>
                  <p className="mt-2">{copy.customerEmail}: {customer.customer_email || '-'}</p>
                  <p className="mt-2">{copy.customerAddress}: {customer.customer_address || '-'}</p>
                </div>
              </div>
            ) : null}

            {error ? <p className="mt-5 text-sm text-rose-300">{error}</p> : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/78 transition hover:bg-white/[0.07]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {copy.previous}
                </button>
              ) : null}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d8c78f] px-5 py-3 text-sm font-semibold text-[#1b1607] transition hover:bg-[#e6d7a1]"
                >
                  {copy.next}
                  <ArrowRight className="h-4 w-4" />
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
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <p className="text-xs uppercase tracking-[0.35em] text-[#d8c78f]">{copy.summary}</p>
            <div className="mt-6 rounded-[1.6rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-5">
              <div className="flex items-center justify-between text-sm text-white/65">
                <span>{copy.ticketsLabel}</span>
                <span>{ticketsTotal.toLocaleString()} IQD</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-white/65">
                <span>{copy.donation}</span>
                <span>{donationAmount.toLocaleString()} IQD</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm uppercase tracking-[0.25em] text-[#d8c78f]">{copy.total}</span>
                <span className="text-2xl font-bold text-white">{totalAmount.toLocaleString()} IQD</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
