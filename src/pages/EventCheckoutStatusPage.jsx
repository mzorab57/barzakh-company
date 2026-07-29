import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Clock3, QrCode, Ticket, X, XCircle } from 'lucide-react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApiError, apiRequest } from '@/lib/api';
import { buildInlineEmailPasses } from '@/lib/printablePasses';
import { parseEventSlug, resolveLocale } from '@/lib/catalog';

const LOOKUP_STORAGE_KEY = 'nukhbaglobal_last_checkout_lookup';
const AUTO_EMAIL_STORAGE_PREFIX = 'nukhbaglobal_auto_email_sent_';
const RETURN_MODAL_STORAGE_PREFIX = 'nukhbaglobal_return_modal_seen_';

const COPY = {
  ku: {
    title: 'دۆخی پارەدان ',
    missing: 'زانیارییەکانی ئەم order ـە لەسەر ئەم device ـە نەدۆزرایەوە.',
    pending: '',
    paid: 'پارەدان سەرکەوتوو بوو. ئێستا دەتوانیت QR پاسەکانت دابەزێنیت یان وەک PDF بیانپارێزیت.',
    failed: 'Payment سەرنەکەوت. دەتوانیت دووبارە status بپشکنیت.',
    check: 'پشکنینی status',
    download: 'دابەزاندنی PDF / Passes',
    openFib: 'کردنەوەی FIB payment',
    openFibApp: 'کردنەوەی FIB App',
    readableCode: 'Readable code',
    passes: 'Passes',
    order: 'Order',
    payment: 'Payment',
    loading: 'چاوەڕێی دۆخی پارەدان...',
    printableEmpty: 'هێشتا printable passes ئامادە نین.',
    back: 'گەڕانەوە بۆ booking',
    shareEmail: 'ناردن بە Email',
    downloading: 'چاوەڕێی دروستکردنی PDF...',
    sendingEmail: 'چاوەڕێی ناردنی email...',
    emailSent: 'تیکەتەکان بە سەرکەوتوویی نێردران بۆ ئیمەیڵی customer.',
    emailAutoSent: 'تیکەتەکان بە شێوەی خۆکار بۆ ئیمەیڵی customer نێردران.',
    emailAutoSending: 'تیکەتەکان بە شێوەی خۆکار بۆ ئیمەیڵ دەنێردرێن...',
    fibMobileHint: '',
    openingFib: 'چاوەڕێی ئامادەکردنی لینکی FIB...',
    ticketsReadyTitle: 'تیکەتەکانت ئامادەن',
    ticketsReadyHint: 'تکایە screenshot ـێک بگرە و لە مۆبایلەکەت هەڵیبگرە بۆ کاتی چوونە ژوورەوە.',
    codeLabel: 'کۆد',
    passengerLabel: 'ئامادەبوو',
    statusLabel: 'دۆخ',
    subEventLabel: 'Sub-event',
    scheduleLabel: 'بەروار و کات',
    close: 'داخستن',
  },
  ar: {
    title: 'الدفع والتذاكر',
    missing: 'لم يتم العثور على معلومات هذا الطلب على هذا الجهاز.',
    pending: 'الدفع ما زال معلقاً. بعد الإكمال في FIB ستقوم هذه الصفحة بتحديث الحالة تلقائياً.',
    paid: 'تم الدفع بنجاح. يمكنك الآن تنزيل التذاكر مع QR أو حفظها كملف PDF.',
    failed: 'فشل الدفع. يمكنك إعادة التحقق من الحالة.',
    check: 'التحقق من الحالة',
    download: 'تنزيل PDF / التذاكر',
    openFib: 'فتح دفع FIB',
    openFibApp: 'فتح تطبيق FIB',
    readableCode: 'الرمز المقروء',
    passes: 'التذاكر',
    order: 'الطلب',
    payment: 'الدفع',
    loading: 'جاري التحقق من حالة الدفع...',
    printableEmpty: 'لم تصبح التذاكر القابلة للطباعة جاهزة بعد.',
    back: 'العودة إلى الحجز',
    shareEmail: 'إرسال عبر البريد',
    downloading: 'جاري إنشاء ملف PDF...',
    sendingEmail: 'جاري إرسال البريد...',
    emailSent: 'تم إرسال التذاكر بنجاح إلى بريد العميل.',
    emailAutoSent: 'تم إرسال التذاكر تلقائياً إلى بريد العميل.',
    emailAutoSending: 'يتم الآن إرسال التذاكر تلقائياً إلى البريد...',
    fibMobileHint: '',
    openingFib: 'جارٍ تجهيز رابط FIB...',
    ticketsReadyTitle: 'تذاكرك جاهزة',
    ticketsReadyHint: 'يرجى أخذ لقطة شاشة والاحتفاظ بها على هاتفك لاستخدامها عند الدخول.',
    codeLabel: 'الرمز',
    passengerLabel: 'الاسم',
    statusLabel: 'الحالة',
    subEventLabel: 'الفعالية الفرعية',
    scheduleLabel: 'التاريخ والوقت',
    close: 'إغلاق',
  },
  en: {
    title: 'Payment & Passes',
    missing: 'This order lookup was not found on this device.',
    pending: 'Payment is still pending. After you complete it in FIB, this page will refresh the status automatically.',
    paid: 'Payment succeeded. You can now download the QR passes or save them as PDF.',
    failed: 'Payment did not succeed. You can check the status again.',
    check: 'Check status',
    download: 'Download PDF / Passes',
    openFib: 'Open FIB payment',
    openFibApp: 'Open FIB App',
    readableCode: 'Readable code',
    passes: 'Passes',
    order: 'Order',
    payment: 'Payment',
    loading: 'Checking payment status...',
    printableEmpty: 'Printable passes are not ready yet.',
    back: 'Back to booking',
    shareEmail: 'Share by Email',
    downloading: 'Preparing PDF...',
    sendingEmail: 'Sending email...',
    emailSent: 'Tickets were sent successfully to the customer email.',
    emailAutoSent: 'Tickets were sent automatically to the customer email.',
    emailAutoSending: 'Sending tickets automatically by email...',
    fibMobileHint: '',
    openingFib: 'Preparing the FIB link...',
    ticketsReadyTitle: 'Your Tickets Are Ready',
    ticketsReadyHint: 'Please take a screenshot and save it on your phone for entry.',
    codeLabel: 'Code',
    passengerLabel: 'Passenger',
    statusLabel: 'Status',
    subEventLabel: 'Sub-event',
    scheduleLabel: 'Date & Time',
    close: 'Close',
  },
};

function loadLookup() {
  try {
    const raw = sessionStorage.getItem(LOOKUP_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function buildLookupFromSearchParams(searchParams) {
  const orderNumber = searchParams.get('order') || '';
  const customerPhone = searchParams.get('phone') || '';
  const customerEmail = searchParams.get('email') || '';

  if (!orderNumber || (!customerPhone && !customerEmail)) {
    return null;
  }

  return {
    orderNumber,
    paymentId: searchParams.get('payment') || null,
    customerPhone: customerPhone || null,
    customerEmail: customerEmail || null,
    customerName: searchParams.get('name') || null,
    paymentLinks: null,
  };
}

function buildFibReturnUrl({ slug, customerPhone, customerEmail, customerName }) {
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

  return `${window.location.origin}/events/${slug}/checkout/status?${params.toString()}`;
}

function TicketsReadyModal({ open, passes, customerName, copy, onClose }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090b12] shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-white hover:text-black"
          aria-label={copy.close}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d8c78f]">{copy.passes}</p>
          <h2 className="mt-3 text-2xl font-bold text-white">{copy.ticketsReadyTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{copy.ticketsReadyHint}</p>
          {customerName ? <p className="mt-3 text-sm text-white/55">{customerName}</p> : null}
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="space-y-4">
            {passes.map((passItem, index) => (
              <div key={passItem.ticketCode || `${passItem.title || 'pass'}-${index}`} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="mx-auto w-full max-w-[152px] shrink-0 rounded-[1.35rem] border border-white/10 bg-white p-3">
                    {passItem.qrDataUrl ? (
                      <img
                        src={passItem.qrDataUrl}
                        alt={`${passItem.ticketCode || 'Ticket'} QR`}
                        className="aspect-square w-full rounded-[1rem] object-contain"
                      />
                    ) : (
                      <div className="flex aspect-square w-full items-center justify-center rounded-[1rem] bg-slate-100 text-slate-500">
                        <QrCode className="h-10 w-10" />
                      </div>
                    )}
                    <p className="mt-3 truncate text-center text-xs font-semibold tracking-[0.18em] text-slate-800">
                      {passItem.ticketCode || 'TICKET'}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <Ticket className="mt-0.5 h-5 w-5 shrink-0 text-[#d8c78f]" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">{passItem.title || 'Event Pass'}</h3>
                        <p className="text-sm text-white/55">{passItem.subtitle || passItem.subEventTitle || ''}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {passItem.subEventTitle ? (
                        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.subEventLabel}</p>
                          <p className="mt-2 text-sm text-white">{passItem.subEventTitle}</p>
                        </div>
                      ) : null}

                      {passItem.scheduleText ? (
                        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.scheduleLabel}</p>
                          <p className="mt-2 text-sm text-white">{passItem.scheduleText}</p>
                        </div>
                      ) : null}

                      <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.codeLabel}</p>
                        <p className="mt-2 text-sm text-white">{passItem.ticketCode || '-'}</p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.passengerLabel}</p>
                        <p className="mt-2 text-sm text-white">{passItem.passengerName || customerName || 'Guest'}</p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 sm:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.statusLabel}</p>
                        <p className="mt-2 text-sm text-white">{passItem.status || 'valid'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventCheckoutStatusPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = COPY[locale] || COPY.ku;
  const eventId = useMemo(() => parseEventSlug(slug).id, [slug]);
  const searchLookup = useMemo(() => buildLookupFromSearchParams(searchParams), [searchParams]);
  const [lookup] = useState(() => loadLookup());
  const [statusPayload, setStatusPayload] = useState(null);
  const [trackingPayload, setTrackingPayload] = useState(null);
  const [passesPayload, setPassesPayload] = useState(null);
  const [printablePayload, setPrintablePayload] = useState(null);
  const [sharingChannel, setSharingChannel] = useState(null);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [modalPasses, setModalPasses] = useState([]);
  const [currentPaymentId, setCurrentPaymentId] = useState(() => searchLookup?.paymentId || lookup?.paymentId || null);
  const [paymentLinksOverride, setPaymentLinksOverride] = useState(null);
  const [openingFib, setOpeningFib] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const refreshInFlightRef = useRef(false);
  const activeLookup = searchLookup || lookup;

  const orderNumber = activeLookup?.orderNumber || null;
  const paymentId = currentPaymentId;
  const customer_phone = activeLookup?.customerPhone || null;
  const customer_email = activeLookup?.customerEmail || null;
  const customer_name = activeLookup?.customerName || null;

  const refreshStatus = useCallback(async () => {
    if (!orderNumber || (!customer_phone && !customer_email)) {
      return;
    }

    if (refreshInFlightRef.current) {
      return;
    }

    refreshInFlightRef.current = true;
    setError('');

    try {
      if (paymentId) {
        const statusResponse = await apiRequest(`/api/payments/fib/check-status/${paymentId}`);
        setStatusPayload(statusResponse?.data || null);
      } else {
        setStatusPayload(null);
      }

      const query = new URLSearchParams({
        order_number: orderNumber,
        ...(customer_phone ? { customer_phone } : {}),
        ...(customer_email ? { customer_email } : {}),
      }).toString();

      const [trackResponse, passesResponse, printableResponse] = await Promise.all([
        apiRequest(`/api/customer/orders/track?${query}`),
        apiRequest(`/api/customer/orders/passes?${query}`),
        apiRequest(`/api/customer/orders/passes/printable?${query}`),
      ]);

      setTrackingPayload(trackResponse?.data || null);
      setPassesPayload(passesResponse?.data || null);
      setPrintablePayload(printableResponse?.data || null);
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : 'Unable to refresh payment status.');
    } finally {
      refreshInFlightRef.current = false;
    }
  }, [customer_email, customer_phone, orderNumber, paymentId]);

  const normalizedPaymentStatus = String(
    statusPayload?.localPaymentStatus
      || trackingPayload?.payment?.status
      || passesPayload?.order?.trackingState
      || 'pending',
  ).toLowerCase();

  const shouldAutoRefresh = Boolean(
    paymentId
      && orderNumber
      && (customer_phone || customer_email)
      && !['success', 'paid', 'completed', 'failed', 'cancelled', 'declined'].includes(normalizedPaymentStatus),
  );

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  useEffect(() => {
    if (!shouldAutoRefresh) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      void refreshStatus();
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [refreshStatus, shouldAutoRefresh]);

  useEffect(() => {
    if (!shouldAutoRefresh) {
      return undefined;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void refreshStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refreshStatus, shouldAutoRefresh]);

  const localPaymentStatus = normalizedPaymentStatus;
  const isPaid = ['success', 'paid', 'completed'].includes(String(localPaymentStatus).toLowerCase());
  const isFailed = ['failed', 'cancelled'].includes(String(localPaymentStatus).toLowerCase());
  const message = isPaid ? copy.paid : isFailed ? copy.failed : copy.pending;
  const passes = Array.isArray(passesPayload?.passes) ? passesPayload.passes : [];
  const fallbackModalPasses = useMemo(
    () =>
      passes.map((passItem) => ({
        title: passItem.eventTitleText || 'Event Pass',
        subtitle: passItem.ticketTitleText || passItem.subEventTitleText || '',
        subEventTitle: passItem.subEventTitleText || '',
        passengerName: passItem.passengerName || customer_name || 'Guest',
        scheduleText: '',
        ticketCode: passItem.ticketCode || '',
        qrDataUrl: '',
        status: passItem.status || 'valid',
      })),
    [customer_name, passes],
  );
  const paymentLinks = {
    qrCode: paymentLinksOverride?.qrCode || trackingPayload?.payment?.links?.qrCode || activeLookup?.paymentLinks?.qrCode || null,
    redirectionLink: paymentLinksOverride?.redirectionLink || trackingPayload?.payment?.links?.redirectionLink || activeLookup?.paymentLinks?.redirectionLink || null,
    readableCode: paymentLinksOverride?.readableCode || trackingPayload?.payment?.links?.readableCode || activeLookup?.paymentLinks?.readableCode || null,
  };
  const canShowFibMobileButton = !isPaid && Boolean(paymentLinks.redirectionLink || paymentLinks.qrCode || paymentId);
  const shareUrl = useMemo(() => {
    if (!orderNumber || (!customer_phone && !customer_email) || typeof window === 'undefined') {
      return '';
    }

    const params = new URLSearchParams({ order: orderNumber });
    if (paymentId) {
      params.set('payment', paymentId);
    }
    if (customer_phone) {
      params.set('phone', customer_phone);
    }
    if (customer_email) {
      params.set('email', customer_email);
    }
    if (activeLookup?.customerName) {
      params.set('name', activeLookup.customerName);
    }

    return `${window.location.origin}/events/${slug}/checkout/status?${params.toString()}`;
  }, [activeLookup?.customerName, customer_email, customer_phone, orderNumber, paymentId, slug]);

  const handleOpenFibPayment = useCallback(() => {
    const openLink = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      let fibLink = paymentLinks?.redirectionLink || '';

      if (!fibLink && orderNumber && (customer_phone || customer_email)) {
        setOpeningFib(true);
        setError('');

        try {
          const retryResponse = await apiRequest('/api/customer/orders/payments/retry', {
            method: 'POST',
            body: {
              order_number: orderNumber,
              customer_phone,
              customer_email,
              return_url: buildFibReturnUrl({
                slug,
                customerPhone: customer_phone,
                customerEmail: customer_email,
                customerName: customer_name,
              }),
            },
          });

          const nextPayment = retryResponse?.data?.payment || {};
          const nextPaymentId = retryResponse?.data?.payment?.paymentId || null;
          const nextLinks = {
            qrCode: nextPayment.qrCode || paymentLinks?.qrCode || null,
            redirectionLink: nextPayment.redirectionLink || null,
            readableCode: nextPayment.readableCode || paymentLinks?.readableCode || null,
          };

          if (nextPaymentId) {
            setCurrentPaymentId(nextPaymentId);
          }

          setPaymentLinksOverride(nextLinks);
          fibLink = nextLinks.redirectionLink || '';

          try {
            const raw = sessionStorage.getItem(LOOKUP_STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : null;

            if (parsed && typeof parsed === 'object') {
              sessionStorage.setItem(LOOKUP_STORAGE_KEY, JSON.stringify({
                ...parsed,
                paymentId: nextPaymentId || parsed.paymentId || null,
                paymentLinks: {
                  ...(parsed.paymentLinks || {}),
                  ...nextLinks,
                },
              }));
            }
          } catch {
            // Ignore session storage update failures.
          }
        } catch (requestError) {
          setError(requestError instanceof ApiError ? requestError.message : 'Unable to prepare the FIB payment link.');
          return;
        } finally {
          setOpeningFib(false);
        }
      }

      if (!fibLink) {
        setError('FIB payment link is not available right now.');
        return;
      }

      window.location.href = fibLink;
    };

    void openLink();
  }, [customer_email, customer_name, customer_phone, orderNumber, paymentId, paymentLinks?.qrCode, paymentLinks?.readableCode, paymentLinks?.redirectionLink, slug]);

  const handleSharePasses = useCallback(async (channel) => {
    if (!orderNumber || (!customer_phone && !customer_email)) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      setSharingChannel(channel);
      const inlinePasses = channel === 'email' && printablePayload?.printablePasses?.length
        ? await buildInlineEmailPasses(printablePayload)
        : [];
      await apiRequest('/api/customer/orders/passes/share', {
        method: 'POST',
        body: {
          order_number: orderNumber,
          customer_phone,
          customer_email,
          channel,
          share_url: shareUrl || null,
          inline_passes: inlinePasses,
        },
      });
      setSuccessMessage(copy.emailSent);
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : 'Unable to share passes right now.');
    } finally {
      setSharingChannel(null);
    }
  }, [copy.emailSent, customer_email, customer_phone, orderNumber, printablePayload, shareUrl]);

  useEffect(() => {
    let cancelled = false;

    setModalPasses(fallbackModalPasses);

    if (!printablePayload?.printablePasses?.length) {
      return () => {
        cancelled = true;
      };
    }

    void buildInlineEmailPasses(printablePayload)
      .then((inlinePasses) => {
        if (cancelled) {
          return;
        }

        setModalPasses(
          inlinePasses.map((passItem) => {
            const matchedPass = passes.find((entry) => entry.ticketCode === passItem.ticketCode);

            return {
              ...passItem,
              status: matchedPass?.status || 'valid',
            };
          }),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setModalPasses(fallbackModalPasses);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fallbackModalPasses, passes, printablePayload]);

  useEffect(() => {
    if (!isPaid || !searchParams.get('returned') || passes.length === 0 || !orderNumber) {
      return;
    }

    const modalStorageKey = `${RETURN_MODAL_STORAGE_PREFIX}${orderNumber}`;

    try {
      if (sessionStorage.getItem(modalStorageKey) === '1') {
        return;
      }
      sessionStorage.setItem(modalStorageKey, '1');
    } catch {
      // Ignore session storage access issues.
    }

    setShowTicketsModal(true);
  }, [isPaid, orderNumber, passes.length, searchParams]);

  useEffect(() => {
    if (!isPaid || !customer_email || !orderNumber || !printablePayload?.printablePasses?.length) {
      return;
    }

    const emailStorageKey = `${AUTO_EMAIL_STORAGE_PREFIX}${orderNumber}`;

    try {
      if (sessionStorage.getItem(emailStorageKey) === '1') {
        return;
      }
    } catch {
      // Ignore session storage access issues.
    }

    if (sharingChannel !== null) {
      return;
    }

    void handleSharePasses('email')
      .then(() => {
        try {
          sessionStorage.setItem(emailStorageKey, '1');
        } catch {
          // Ignore session storage access issues.
        }
        setSuccessMessage(copy.emailAutoSent);
      })
      .catch(() => {});
  }, [copy.emailAutoSent, customer_email, handleSharePasses, isPaid, orderNumber, printablePayload?.printablePasses?.length, sharingChannel]);

  if (!eventId) {
    return <Navigate to="/" replace />;
  }

  if (!activeLookup || !orderNumber || (!customer_phone && !customer_email)) {
    return (
      <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">
        {copy.missing}
      </div>
    );
  }

  return (
    <div className="bg-[#06070b] text-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
          <div className="flex flex-col items-center text-center">
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${
              isPaid ? 'bg-emerald-500/15 text-emerald-300' : isFailed ? 'bg-rose-500/15 text-rose-300' : 'bg-[#d8c78f]/15 text-[#eadcae]'
            }`}>
              {isPaid ? <CheckCircle2 className="h-7 w-7" /> : isFailed ? <XCircle className="h-7 w-7" /> : <Clock3 className="h-7 w-7" />}
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#d8c78f]">{copy.title}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">{message}</p>
          </div>

          {!isPaid && paymentLinks?.qrCode ? (
            <div className="mx-auto mt-8 max-w-md rounded-[1.7rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-6">
              <div className="flex items-center justify-center gap-3">
                <QrCode className="h-5 w-5 text-[#eadcae]" />
                <p className="text-sm text-white/80">FIB QR</p>
              </div>
              <div className="mt-5 flex flex-col items-center gap-5">
                <img
                  src={paymentLinks.qrCode}
                  alt="FIB QR code"
                  className="h-56 w-56 rounded-[1.5rem] border border-white/10 bg-white p-3"
                />
                {canShowFibMobileButton ? (
                  <div className="w-full md:hidden">
                    <p className="text-center text-sm leading-6 text-white/72">{copy.fibMobileHint}</p>
                    <button
                      type="button"
                      onClick={handleOpenFibPayment}
                      disabled={openingFib}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#56bfb7] px-5 py-3 text-sm font-semibold text-[#f7f7f7] transition hover:bg-[#66c7bf] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {openingFib ? copy.openingFib : copy.openFibApp}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {isPaid && customer_email && (sharingChannel === 'email' || successMessage) ? (
            <p className="mt-6 text-sm text-emerald-300">
              {sharingChannel === 'email' ? copy.emailAutoSending : successMessage}
            </p>
          ) : successMessage ? <p className="mt-6 text-sm text-emerald-300">{successMessage}</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        </section>
      </div>
      <TicketsReadyModal
        open={showTicketsModal}
        passes={modalPasses}
        customerName={customer_name}
        copy={copy}
        onClose={() => setShowTicketsModal(false)}
      />
    </div>
  );
}
