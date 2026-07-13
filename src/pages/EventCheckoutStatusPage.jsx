import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, Download, ExternalLink, QrCode, RefreshCcw, Ticket, XCircle } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApiError, apiRequest } from '@/lib/api';
import { openPrintablePassesWindow } from '@/lib/printablePasses';
import { parseEventSlug, resolveLocale } from '@/lib/catalog';

const LOOKUP_STORAGE_KEY = 'nukhbaglobal_last_checkout_lookup';

const COPY = {
  ku: {
    title: 'Payment & Passes',
    missing: 'زانیارییەکانی ئەم order ـە لەسەر ئەم device ـە نەدۆزرایەوە.',
    pending: 'Payment هێشتا چاوەڕێیە. دەتوانیت لە FIB دا تەواوی بکەیت و دواتر status بپشکنیت.',
    paid: 'پارەدان سەرکەوتوو بوو. ئێستا دەتوانیت QR پاسەکانت دابەزێنیت یان وەک PDF بیانپارێزیت.',
    failed: 'Payment سەرنەکەوت. دەتوانیت دووبارە status بپشکنیت.',
    check: 'پشکنینی status',
    download: 'دابەزاندنی PDF / Passes',
    openFib: 'کردنەوەی FIB payment',
    readableCode: 'Readable code',
    passes: 'Passes',
    order: 'Order',
    payment: 'Payment',
    loading: 'چاوەڕێی دۆخی پارەدان...',
    printableEmpty: 'هێشتا printable passes ئامادە نین.',
    back: 'گەڕانەوە بۆ booking',
  },
  ar: {
    title: 'الدفع والتذاكر',
    missing: 'لم يتم العثور على معلومات هذا الطلب على هذا الجهاز.',
    pending: 'الدفع ما زال معلقاً. يمكنك إكماله عبر FIB ثم التحقق من الحالة.',
    paid: 'تم الدفع بنجاح. يمكنك الآن تنزيل التذاكر مع QR أو حفظها كملف PDF.',
    failed: 'فشل الدفع. يمكنك إعادة التحقق من الحالة.',
    check: 'التحقق من الحالة',
    download: 'تنزيل PDF / التذاكر',
    openFib: 'فتح دفع FIB',
    readableCode: 'الرمز المقروء',
    passes: 'التذاكر',
    order: 'الطلب',
    payment: 'الدفع',
    loading: 'جاري التحقق من حالة الدفع...',
    printableEmpty: 'لم تصبح التذاكر القابلة للطباعة جاهزة بعد.',
    back: 'العودة إلى الحجز',
  },
  en: {
    title: 'Payment & Passes',
    missing: 'This order lookup was not found on this device.',
    pending: 'Payment is still pending. Complete it in FIB, then check the latest status.',
    paid: 'Payment succeeded. You can now download the QR passes or save them as PDF.',
    failed: 'Payment did not succeed. You can check the status again.',
    check: 'Check status',
    download: 'Download PDF / Passes',
    openFib: 'Open FIB payment',
    readableCode: 'Readable code',
    passes: 'Passes',
    order: 'Order',
    payment: 'Payment',
    loading: 'Checking payment status...',
    printableEmpty: 'Printable passes are not ready yet.',
    back: 'Back to booking',
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

export default function EventCheckoutStatusPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = COPY[locale] || COPY.ku;
  const eventId = useMemo(() => parseEventSlug(slug).id, [slug]);
  const [lookup] = useState(() => loadLookup());
  const [statusPayload, setStatusPayload] = useState(null);
  const [trackingPayload, setTrackingPayload] = useState(null);
  const [passesPayload, setPassesPayload] = useState(null);
  const [printablePayload, setPrintablePayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const orderNumber = lookup?.orderNumber || null;
  const paymentId = lookup?.paymentId || null;
  const customer_phone = lookup?.customerPhone || null;
  const customer_email = lookup?.customerEmail || null;

  const refreshStatus = async () => {
    if (!orderNumber || !paymentId) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const statusResponse = await apiRequest(`/api/payments/fib/check-status/${paymentId}`);
      setStatusPayload(statusResponse?.data || null);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStatus();
  }, [orderNumber, paymentId]);

  if (!eventId) {
    return <Navigate to="/" replace />;
  }

  if (!lookup || !orderNumber) {
    return (
      <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">
        {copy.missing}
      </div>
    );
  }

  const localPaymentStatus = statusPayload?.localPaymentStatus || trackingPayload?.payment?.status || passesPayload?.order?.trackingState || 'pending';
  const isPaid = ['success', 'paid', 'completed'].includes(String(localPaymentStatus).toLowerCase());
  const isFailed = ['failed', 'cancelled'].includes(String(localPaymentStatus).toLowerCase());
  const message = isPaid ? copy.paid : isFailed ? copy.failed : copy.pending;
  const passes = Array.isArray(passesPayload?.passes) ? passesPayload.passes : [];
  const paymentLinks = trackingPayload?.payment?.links || lookup?.paymentLinks || {};

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
            {paymentLinks?.redirectionLink ? (
              <a
                href={paymentLinks.redirectionLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#d8c78f] px-5 py-3 text-sm font-semibold text-[#1b1607] transition hover:bg-[#e6d7a1]"
              >
                <ExternalLink className="h-4 w-4" />
                {copy.openFib}
              </a>
            ) : null}
            {isPaid ? (
              <button
                type="button"
                onClick={async () => {
                  if (!printablePayload?.printablePasses?.length) {
                    setError(copy.printableEmpty);
                    return;
                  }

                  try {
                    await openPrintablePassesWindow(printablePayload);
                  } catch (printError) {
                    setError(printError.message || 'Unable to open printable passes.');
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/22"
              >
                <Download className="h-4 w-4" />
                {copy.download}
              </button>
            ) : null}
          </div>

          {paymentLinks?.qrCode ? (
            <div className="mt-8 rounded-[1.7rem] border border-[#d8c78f]/20 bg-[#d8c78f]/8 p-6">
              <div className="flex items-center gap-3">
                <QrCode className="h-5 w-5 text-[#eadcae]" />
                <p className="text-sm text-white/80">FIB QR</p>
              </div>
              <img
                src={paymentLinks.qrCode}
                alt="FIB QR code"
                className="mt-5 h-56 w-56 rounded-[1.5rem] border border-white/10 bg-white p-3"
              />
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
                    <p>Passenger: {passItem.passengerName || lookup.customerName || 'Guest'}</p>
                    <p>Status: {passItem.status || 'valid'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {error ? <p className="mt-6 text-sm text-rose-300">{error}</p> : null}
        </section>
      </div>
    </div>
  );
}
