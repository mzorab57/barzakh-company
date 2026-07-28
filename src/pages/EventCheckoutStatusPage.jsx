import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Clock3, Download, QrCode, RefreshCcw, Ticket, XCircle } from 'lucide-react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApiError, apiRequest } from '@/lib/api';
import { buildInlineEmailPasses, downloadPrintablePassesPdf } from '@/lib/printablePasses';
import { parseEventSlug, resolveLocale } from '@/lib/catalog';

const LOOKUP_STORAGE_KEY = 'nukhbaglobal_last_checkout_lookup';

const COPY = {
  ku: {
    title: 'Payment & Passes',
    missing: 'زانیارییەکانی ئەم order ـە لەسەر ئەم device ـە نەدۆزرایەوە.',
    pending: 'Payment هێشتا چاوەڕێیە. دوای تەواوکردن لە FIB، ئەم لاپەڕەیە بە شێوەی خۆکار status ـەکە نوێ دەکاتەوە.',
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
    shareWhatsApp: 'ناردن بە WhatsApp',
    downloading: 'چاوەڕێی دروستکردنی PDF...',
    sendingEmail: 'چاوەڕێی ناردنی email...',
    emailSent: 'تیکەتەکان بە سەرکەوتوویی نێردران بۆ ئیمەیڵی customer.',
    fibMobileHint: 'ئەگەر لە مۆبایل دایت، کلیک لەم دوگمەیە بکە بۆ کردنەوەی ڕاستەوخۆی FIB و تەواوکردنی پارەدان.',
    openingFib: 'چاوەڕێی ئامادەکردنی لینکی FIB...',
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
    shareWhatsApp: 'إرسال عبر واتساب',
    downloading: 'جاري إنشاء ملف PDF...',
    sendingEmail: 'جاري إرسال البريد...',
    emailSent: 'تم إرسال التذاكر بنجاح إلى بريد العميل.',
    fibMobileHint: 'إذا كنت على الهاتف، اضغط هذا الزر لفتح تطبيق FIB مباشرة وإكمال الدفع.',
    openingFib: 'جارٍ تجهيز رابط FIB...',
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
    shareWhatsApp: 'Share by WhatsApp',
    downloading: 'Preparing PDF...',
    sendingEmail: 'Sending email...',
    emailSent: 'Tickets were sent successfully to the customer email.',
    fibMobileHint: 'If you are on mobile, tap this button to open the FIB app directly and complete payment.',
    openingFib: 'Preparing the FIB link...',
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

function normalizeWhatsAppNumber(phone) {
  const digits = String(phone || '').replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.startsWith('964')) {
    return digits;
  }

  if (digits.startsWith('0') && digits.length === 11) {
    return `964${digits.slice(1)}`;
  }

  if (digits.startsWith('7') && digits.length === 10) {
    return `964${digits}`;
  }

  return digits;
}

function buildWhatsAppPassMessage({ passengerName, eventDate, subEventTitle, location, orderNumber, passesCount, shareUrl }) {
  const lines = [
    'السلام عليكم ورحمه الله وبركاته',
    `${passengerName || 'Guest'} خۆشەویست،`,
    '',
    'سوپاس بۆ داواکارییەکەت،',
    'داواکارییەکەت بە سەرکەوتوویی ئەنجامدرا هیوادارین بە بەژداری کردنت ببێتە مایەی خێر و بەرەکەت بۆ دونیا و قیانەی، ئێمەش بەردەوام بین کە خزمەتکردنی ئێوەی ئازیز و خۆشەویست و دین و نیشتیمانمان بکەین.',
    '',
    `${eventDate || 'N/A'} / ${subEventTitle || 'Main event'} [ ${location || 'N/A'} ]`,
    '',
    `Order: ${orderNumber || '-'}`,
    `Passes: ${passesCount || 0}`,
  ];

  if (shareUrl) {
    lines.push('', shareUrl);
  }

  return lines.join('\n');
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
  const [loading, setLoading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [sharingChannel, setSharingChannel] = useState(null);
  const [openingFib, setOpeningFib] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState(() => searchLookup?.paymentId || lookup?.paymentId || null);
  const [paymentLinksOverride, setPaymentLinksOverride] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const refreshInFlightRef = useRef(false);
  const activeLookup = searchLookup || lookup;

  const orderNumber = activeLookup?.orderNumber || null;
  const paymentId = currentPaymentId;
  const customer_phone = activeLookup?.customerPhone || null;
  const customer_email = activeLookup?.customerEmail || null;

  const refreshStatus = useCallback(async ({ silent = false } = {}) => {
    if (!orderNumber || (!customer_phone && !customer_email)) {
      return;
    }

    if (refreshInFlightRef.current) {
      return;
    }

    refreshInFlightRef.current = true;
    if (!silent) {
      setLoading(true);
    }
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
      if (!silent) {
        setLoading(false);
      }
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

      void refreshStatus({ silent: true });
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [refreshStatus, shouldAutoRefresh]);

  useEffect(() => {
    if (!shouldAutoRefresh) {
      return undefined;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void refreshStatus({ silent: true });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refreshStatus, shouldAutoRefresh]);

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

  const localPaymentStatus = normalizedPaymentStatus;
  const isPaid = ['success', 'paid', 'completed'].includes(String(localPaymentStatus).toLowerCase());
  const isFailed = ['failed', 'cancelled'].includes(String(localPaymentStatus).toLowerCase());
  const message = isPaid ? copy.paid : isFailed ? copy.failed : copy.pending;
  const passes = Array.isArray(passesPayload?.passes) ? passesPayload.passes : [];
  const paymentLinks = {
    qrCode: paymentLinksOverride?.qrCode || trackingPayload?.payment?.links?.qrCode || activeLookup?.paymentLinks?.qrCode || null,
    redirectionLink: paymentLinksOverride?.redirectionLink || trackingPayload?.payment?.links?.redirectionLink || activeLookup?.paymentLinks?.redirectionLink || null,
    readableCode: paymentLinksOverride?.readableCode || trackingPayload?.payment?.links?.readableCode || activeLookup?.paymentLinks?.readableCode || null,
  };
  const canShowFibMobileButton = !isPaid && Boolean(paymentLinks.redirectionLink || paymentLinks.qrCode || paymentId);
  const primaryPass = passes[0] || {};
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
  const whatsappHref = useMemo(() => {
    const normalizedPhone = normalizeWhatsAppNumber(customer_phone);

    if (!normalizedPhone || !orderNumber) {
      return null;
    }

    const text = buildWhatsAppPassMessage({
      passengerName: primaryPass.passengerName || activeLookup?.customerName || 'Guest',
      eventDate: primaryPass.eventDate || '',
      subEventTitle: primaryPass.subEventTitleText || primaryPass.ticketTitleText || '',
      location: primaryPass.subEventLocationText || '',
      orderNumber,
      passesCount: passes.length,
      shareUrl,
    });

    return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`;
  }, [activeLookup?.customerName, customer_phone, orderNumber, passes.length, primaryPass.eventDate, primaryPass.passengerName, primaryPass.subEventLocationText, primaryPass.subEventTitleText, primaryPass.ticketTitleText, shareUrl]);

  const handleSharePasses = async (channel) => {
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
  };

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
  }, [customer_email, customer_phone, orderNumber, paymentLinks?.qrCode, paymentLinks?.readableCode, paymentLinks?.redirectionLink]);

  return (
    <div className="bg-[#06070b] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to={`/events/${slug}/checkout`}
          className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          {copy.back}
        </Link>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d8c78f]">{copy.title}</p>
              <h1 className="mt-4 text-3xl font-bold text-white">{orderNumber}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68">{message}</p>
            </div>
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${
              isPaid ? 'bg-emerald-500/15 text-emerald-300' : isFailed ? 'bg-rose-500/15 text-rose-300' : 'bg-[#d8c78f]/15 text-[#eadcae]'
            }`}>
              {isPaid ? <CheckCircle2 className="h-7 w-7" /> : isFailed ? <XCircle className="h-7 w-7" /> : <Clock3 className="h-7 w-7" />}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.order}</p>
              <p className="mt-2 text-sm text-white">{orderNumber}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.payment}</p>
              <p className="mt-2 text-sm text-white">{statusPayload?.fibStatus || localPaymentStatus || '-'}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.readableCode}</p>
              <p className="mt-2 text-sm text-white">{paymentLinks?.readableCode || '-'}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.passes}</p>
              <p className="mt-2 text-sm text-white">{passes.length}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshStatus}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/78 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? copy.loading : copy.check}
            </button>
           
            {isPaid ? (
              <>
                <button
                  type="button"
                  onClick={async () => {
                    if (!printablePayload?.printablePasses?.length) {
                      setError(copy.printableEmpty);
                      return;
                    }

                    try {
                      setError('');
                      setSuccessMessage('');
                      setDownloadingPdf(true);
                      await downloadPrintablePassesPdf(printablePayload, {
                        fileName: `Passes-${orderNumber || 'passes'}.pdf`,
                      });
                    } catch (printError) {
                      setError(printError.message || 'Unable to open printable passes.');
                    } finally {
                      setDownloadingPdf(false);
                    }
                  }}
                  disabled={downloadingPdf}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/22 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Download className={`h-4 w-4 ${downloadingPdf ? 'animate-pulse' : ''}`} />
                  {downloadingPdf ? copy.downloading : copy.download}
                </button>
                {customer_email ? (
                  <button
                    type="button"
                    onClick={() => handleSharePasses('email')}
                    disabled={sharingChannel !== null}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/78 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sharingChannel === 'email' ? copy.sendingEmail : copy.shareEmail}
                  </button>
                ) : null}
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setError('');
                      setSuccessMessage('');
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm text-emerald-100 transition hover:text-white"
                  >
                    {copy.shareWhatsApp}
                  </a>
                ) : null}
              </>
            ) : null}
          </div>

          {!isPaid && paymentLinks?.qrCode ? (
            <div className="mt-8 rounded-[1.7rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-6">
              <div className="flex items-center gap-3">
                <QrCode className="h-5 w-5 text-[#eadcae]" />
                <p className="text-sm text-white/80">FIB QR</p>
              </div>
              <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <img
                  src={paymentLinks.qrCode}
                  alt="FIB QR code"
                  className="h-56 w-56 rounded-[1.5rem] border border-white/10 bg-white p-3"
                />
                {canShowFibMobileButton ? (
                  <div className="max-w-sm  md:hidden">
                    {/* <p className="text-sm leading-6 text-white/72">{copy.fibMobileHint}</p> */}
                    <button
                      type="button"
                      onClick={handleOpenFibPayment}
                      disabled={openingFib}
                      className=" inline-flex items-center gap-2 rounded-full bg-[#56bfb7] px-5 py-3 text-sm font-semibold text-[#f7f7f7] transition hover:bg-[#66c7bf] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                    
                      {openingFib ? copy.openingFib : copy.openFibApp}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {passes.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {passes.map((passItem) => (
                <div key={passItem.ticketCode} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5 text-[#d8c78f]" />
                    <div>
                      <h3 className="font-semibold text-white">{passItem.eventTitleText || 'Event Pass'}</h3>
                      <p className="text-sm text-white/55">{passItem.ticketTitleText || passItem.subEventTitleText || ''}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-white/72">
                    <p>Code: {passItem.ticketCode}</p>
                    <p>Passenger: {passItem.passengerName || activeLookup?.customerName || 'Guest'}</p>
                    <p>Status: {passItem.status || 'valid'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {successMessage ? <p className="mt-6 text-sm text-emerald-300">{successMessage}</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        </section>
      </div>
    </div>
  );
}
