import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Clock3, HeartHandshake, QrCode, RefreshCcw, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApiError, apiRequest } from '@/lib/api';
import { resolveLocale } from '@/lib/catalog';

const DONATION_LOOKUP_STORAGE_KEY = 'nukhbaglobal_last_donation_lookup';

const COPY = {
  ku: {
    title: 'پارەدان و بەخشین',
    missing: 'زانیارییەکانی ئەم بەخشینە لەسەر ئەم device ـە نەدۆزرایەوە.',
    pending: 'بەخشین هێشتا چاوەڕێیە. دوای تەواوکردن لە FIB، ئەم لاپەڕەیە status ـەکە خۆکار نوێ دەکاتەوە.',
    paid: 'بەخشینەکەت بە سەرکەوتوویی گەیشت. سوپاس بۆ پاڵپشتیت.',
    failed: 'پارەدان سەرنەکەوت. دەتوانیت دووبارە هەوڵ بدەیت.',
    missingQr: 'هێشتا QR ی پارەدان ئامادە نییە.',
    loading: 'چاوەڕێی دۆخی بەخشین...',
    check: 'پشکنینی status',
    openFib: 'کردنەوەی FIB App',
    openingFib: 'چاوەڕێی ئامادەکردنی لینکی FIB...',
    retrying: 'چاوەڕێی دروستکردنی payment ی نوێ...',
    donation: 'بەخشین',
    payment: 'پارەدان',
    readableCode: 'Readable code',
    amount: 'بڕ',
    back: 'گەڕانەوە بۆ سەرەتا',
  },
  ar: {
    title: 'الدفع والتبرع',
    missing: 'لم يتم العثور على معلومات هذا التبرع على هذا الجهاز.',
    pending: 'التبرع ما زال معلقاً. بعد الإكمال في FIB ستقوم هذه الصفحة بتحديث الحالة تلقائياً.',
    paid: 'تم استلام تبرعك بنجاح. شكراً لدعمك.',
    failed: 'فشل الدفع. يمكنك المحاولة مرة أخرى.',
    missingQr: 'رمز QR غير متاح حالياً.',
    loading: 'جاري التحقق من حالة التبرع...',
    check: 'التحقق من الحالة',
    openFib: 'فتح تطبيق FIB',
    openingFib: 'جارٍ تجهيز رابط FIB...',
    retrying: 'جارٍ إنشاء دفعة جديدة...',
    donation: 'التبرع',
    payment: 'الدفع',
    readableCode: 'الرمز المقروء',
    amount: 'المبلغ',
    back: 'العودة للرئيسية',
  },
  en: {
    title: 'Donation Payment',
    missing: 'This donation lookup was not found on this device.',
    pending: 'Your donation payment is still pending. After you complete it in FIB, this page refreshes automatically.',
    paid: 'Your donation was received successfully. Thank you for your support.',
    failed: 'Payment did not succeed. You can try again.',
    missingQr: 'The payment QR is not available right now.',
    loading: 'Checking donation status...',
    check: 'Check status',
    openFib: 'Open FIB App',
    openingFib: 'Preparing the FIB link...',
    retrying: 'Creating a new payment...',
    donation: 'Donation',
    payment: 'Payment',
    readableCode: 'Readable code',
    amount: 'Amount',
    back: 'Back home',
  },
};

function loadLookup() {
  try {
    const raw = sessionStorage.getItem(DONATION_LOOKUP_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function buildLookupFromSearchParams(searchParams) {
  const donationNumber = searchParams.get('donation') || '';
  if (!donationNumber) {
    return null;
  }

  return {
    donationNumber,
    paymentId: searchParams.get('payment') || null,
    paymentLinks: null,
  };
}

export default function DonationStatusPage() {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = COPY[locale] || COPY.ku;
  const searchLookup = useMemo(() => buildLookupFromSearchParams(searchParams), [searchParams]);
  const [lookup] = useState(() => loadLookup());
  const [trackingPayload, setTrackingPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openingFib, setOpeningFib] = useState(false);
  const [retryingPayment, setRetryingPayment] = useState(false);
  const [paymentId, setPaymentId] = useState(() => searchLookup?.paymentId || lookup?.paymentId || null);
  const [paymentLinksOverride, setPaymentLinksOverride] = useState(null);
  const [error, setError] = useState('');
  const refreshInFlightRef = useRef(false);
  const activeLookup = searchLookup || lookup;
  const donationNumber = activeLookup?.donationNumber || null;

  const refreshStatus = useCallback(async ({ silent = false } = {}) => {
    if (!donationNumber) {
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
      const query = new URLSearchParams({ donation_number: donationNumber }).toString();
      const response = await apiRequest(`/api/donations/track?${query}`);
      const payload = response?.data || null;
      setTrackingPayload(payload);

      const nextPaymentId = payload?.payment?.paymentId || null;
      if (nextPaymentId) {
        setPaymentId(nextPaymentId);
      }
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : 'Unable to refresh donation status.');
    } finally {
      refreshInFlightRef.current = false;
      if (!silent) {
        setLoading(false);
      }
    }
  }, [donationNumber]);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  const normalizedStatus = String(trackingPayload?.payment?.status || trackingPayload?.donation?.status || 'pending').toLowerCase();
  const isPaid = normalizedStatus === 'paid';
  const isFailed = ['failed', 'cancelled'].includes(normalizedStatus);
  const shouldAutoRefresh = Boolean(
    donationNumber && paymentId && !['paid', 'failed', 'cancelled', 'refunded'].includes(normalizedStatus),
  );

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

  const message = isPaid ? copy.paid : isFailed ? copy.failed : copy.pending;
  const paymentLinks = {
    qrCode: paymentLinksOverride?.qrCode || trackingPayload?.payment?.links?.qrCode || activeLookup?.paymentLinks?.qrCode || null,
    redirectionLink: paymentLinksOverride?.redirectionLink || trackingPayload?.payment?.links?.redirectionLink || activeLookup?.paymentLinks?.redirectionLink || null,
    readableCode: paymentLinksOverride?.readableCode || trackingPayload?.payment?.links?.readableCode || activeLookup?.paymentLinks?.readableCode || null,
  };

  const persistLookup = useCallback((nextLookup) => {
    sessionStorage.setItem(DONATION_LOOKUP_STORAGE_KEY, JSON.stringify(nextLookup));
  }, []);

  const handleOpenFib = useCallback(() => {
    const openLink = async () => {
      if (!donationNumber || typeof window === 'undefined') {
        return;
      }

      let fibLink = paymentLinks?.redirectionLink || '';

      if (!fibLink) {
        setRetryingPayment(true);
        setError('');

        try {
          const response = await apiRequest('/api/donations/payments/retry', {
            method: 'POST',
            body: {
              donation_number: donationNumber,
            },
          });

          const donation = response?.data?.donation || {};
          const nextPayment = donation.payment || {};
          const nextLookup = {
            donationNumber,
            paymentId: nextPayment.paymentId || paymentId || null,
            amount: donation.donation?.amount || trackingPayload?.donation?.amount || null,
            currency: donation.donation?.currency || trackingPayload?.donation?.currency || 'IQD',
            paymentLinks: {
              qrCode: nextPayment.links?.qrCode || null,
              redirectionLink: nextPayment.links?.redirectionLink || null,
              readableCode: nextPayment.links?.readableCode || null,
            },
          };

          setPaymentId(nextLookup.paymentId);
          setPaymentLinksOverride(nextLookup.paymentLinks);
          persistLookup(nextLookup);
          fibLink = nextLookup.paymentLinks.redirectionLink || '';
          await refreshStatus({ silent: true });
        } catch (requestError) {
          setError(requestError instanceof ApiError ? requestError.message : 'Unable to prepare the donation payment link.');
          return;
        } finally {
          setRetryingPayment(false);
        }
      }

      if (!fibLink) {
        setError(copy.missingQr);
        return;
      }

      setOpeningFib(true);
      window.location.href = fibLink;
    };

    void openLink();
  }, [copy.missingQr, donationNumber, paymentId, paymentLinks?.redirectionLink, persistLookup, refreshStatus, trackingPayload?.donation?.amount, trackingPayload?.donation?.currency]);

  if (!activeLookup || !donationNumber) {
    return (
      <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">
        {copy.missing}
      </div>
    );
  }

  return (
    <div className="bg-[#06070b] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          {copy.back}
        </Link>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase  text-[#d8c78f]">{copy.title}</p>
              <h1 className="mt-4 text-3xl font-bold text-white">{donationNumber}</h1>
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
              <p className="text-[10px] uppercase  text-white/40">{copy.donation}</p>
              <p className="mt-2 text-sm text-white">{donationNumber}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase  text-white/40">{copy.amount}</p>
              <p className="mt-2 text-sm text-white">{Number(trackingPayload?.donation?.amount || activeLookup?.amount || 0).toLocaleString()} {trackingPayload?.donation?.currency || activeLookup?.currency || 'IQD'}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase  text-white/40">{copy.payment}</p>
              <p className="mt-2 text-sm text-white">{trackingPayload?.payment?.status || '-'}</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-4">
              <p className="text-[10px] uppercase  text-white/40">{copy.readableCode}</p>
              <p className="mt-2 text-sm text-white">{paymentLinks?.readableCode || '-'}</p>
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

            {!isPaid && !paymentLinks?.qrCode ? (
              <button
                type="button"
                onClick={handleOpenFib}
                disabled={openingFib || retryingPayment}
                className="inline-flex items-center gap-2 rounded-full bg-[#56bfb7] px-5 py-3 text-sm font-semibold text-[#f7f7f7] transition hover:bg-[#66c7bf] disabled:cursor-not-allowed disabled:opacity-60 md:hidden"
              >
                <HeartHandshake className="h-4 w-4" />
                {retryingPayment ? copy.retrying : openingFib ? copy.openingFib : copy.openFib}
              </button>
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
                <button
                  type="button"
                  onClick={handleOpenFib}
                  disabled={openingFib || retryingPayment}
                  className="inline-flex items-center gap-2 rounded-full bg-[#56bfb7] px-5 py-3 text-sm font-semibold text-[#f7f7f7] transition hover:bg-[#66c7bf] disabled:cursor-not-allowed disabled:opacity-60 md:hidden"
                >
                  <HeartHandshake className="h-4 w-4" />
                  {retryingPayment ? copy.retrying : openingFib ? copy.openingFib : copy.openFib}
                </button>
              </div>
            </div>
          ) : null}

          {isPaid ? (
            <div className="mt-8 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/8 p-6">
              <p className="text-sm leading-7 text-emerald-100">{copy.paid}</p>
            </div>
          ) : null}

          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        </section>
      </div>
    </div>
  );
}
