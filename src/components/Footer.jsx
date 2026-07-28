'use client';
import {
  Mail,
  MapPin,
  Phone,
  FacebookIcon,
  InstagramIcon,
  Music2,
  MessageCircle,
  ExternalLink,
  ArrowUpRight,
  HeartHandshake,
} from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CosmicParallaxBg } from './ui/parallax-cosmic-background';
import { ApiError, apiRequest } from '@/lib/api';
import { resolveLocale } from '@/lib/catalog';
import { getFooterContent } from '@/data/componentContent';

gsap.registerPlugin(ScrollTrigger);

const DONATION_LOOKUP_STORAGE_KEY = 'nukhbaglobal_last_donation_lookup';
const DONATION_PRESET_AMOUNTS = [5000, 10000, 25000, 50000, 100000];

const DONATION_COPY = {
  ku: {
    invalidAmount: 'تکایە بڕێکی دروست و تەواو بە IQD بنووسە.',
    preparing: 'چاوەڕێی دروستکردنی پارەدانی بەخشین...',
    action: 'بەخشین بکە',
    presetLabel: 'بڕی خێرا',
    presetPlaceholder: 'بڕێک هەڵبژێرە',
  },
  ar: {
    invalidAmount: 'يرجى إدخال مبلغ صحيح وكامل بالدينار العراقي.',
    preparing: 'جارٍ تجهيز دفع التبرع...',
    action: 'تبرع الآن',
    presetLabel: 'مبلغ سريع',
    presetPlaceholder: 'اختر مبلغاً',
  },
  en: {
    invalidAmount: 'Please enter a valid whole-number IQD donation amount.',
    preparing: 'Preparing your donation payment...',
    action: 'Donate now',
    presetLabel: 'Quick amount',
    presetPlaceholder: 'Select an amount',
  },
};

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

export default function Footer() {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationError, setDonationError] = useState('');
  const [submittingDonation, setSubmittingDonation] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const footerContent = getFooterContent(t);
  const locale = resolveLocale(i18n?.language);
  const donationCopy = DONATION_COPY[locale] || DONATION_COPY.ku;

  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef([]);
  const statsRef = useRef(null);

  const socialIconMap = {
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    TikTok: Music2,
    WhatsApp: MessageCircle,
  };

  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );

      linksRef.current.forEach((link, index) => {
        gsap.fromTo(
          link,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%',
            },
          }
        );
      });

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleDonate = async () => {
    const normalizedAmount = sanitizeDonationAmount(donationAmount);

    if (!/^\d+$/.test(normalizedAmount) || Number(normalizedAmount) <= 0) {
      setDonationError(donationCopy.invalidAmount);
      return;
    }

    try {
      setDonationError('');
      setSubmittingDonation(true);
      const response = await apiRequest('/api/donations/checkout', {
        method: 'POST',
        body: {
          amount: Number(normalizedAmount),
        },
      });

      const donation = response?.data || {};
      const lookup = {
        donationNumber: donation.donationNumber || null,
        paymentId: donation.payment?.paymentId || null,
        amount: donation.amount || Number(normalizedAmount),
        currency: donation.currency || 'IQD',
        paymentLinks: {
          qrCode: donation.payment?.qrCode || null,
          redirectionLink: donation.payment?.redirectionLink || null,
          readableCode: donation.payment?.readableCode || null,
        },
      };

      sessionStorage.setItem(DONATION_LOOKUP_STORAGE_KEY, JSON.stringify(lookup));

      const params = new URLSearchParams({
        donation: lookup.donationNumber || '',
      });

      if (lookup.paymentId) {
        params.set('payment', lookup.paymentId);
      }

      navigate(`/donations/status?${params.toString()}`);
    } catch (requestError) {
      setDonationError(requestError instanceof ApiError ? requestError.message : 'Unable to start donation payment right now.');
    } finally {
      setSubmittingDonation(false);
    }
  };

  const handleDonationAmountChange = (event) => {
    setDonationAmount(sanitizeDonationAmount(event.target.value));
    setDonationError('');
  };

  const handlePresetSelect = (amount) => {
    setDonationAmount(String(amount));
    setDonationError('');
  };

  const formattedDonationAmount = formatDonationAmount(donationAmount);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#050403] text-white"
    >
      
      {/* === Ultra Premium Background === */}
      <div className="absolute inset-0 z-0">
        <CosmicParallaxBg
          head=""
          text=""
          loop={true}
          className="h-full w-full"
          primaryColor="#88743e"
          secondaryColor="#C5B78E"
        />
        
        {/* Multi-layer Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050403]/40 via-[#0a0805]/70 to-[#050403]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,183,142,0.08),transparent_50%)]" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] animate-pulse-slow" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] mix-blend-overlay" />
      </div>

      {/* === Main Content === */}
      <div className="relative z-10 container max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Links Grid Section */}
        <div className="py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-t border-white/5">
          
          {/* Sections */}
          <div ref={(el) => (linksRef.current[0] = el)} className="space-y-8">
            <h4 className="text-2xl font-black uppercase tracking-tight text-[#C5B78E]">
              {footerContent.quickLinksTitle}
            </h4>
            <ul className="space-y-4">
              {footerContent.usefulLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300"
                  >
                    <span className="text-base font-light group-hover:translate-x-2 transition-transform">
                      {link.name}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div ref={(el) => (linksRef.current[1] = el)} className="space-y-8">
            <h4 className="text-2xl font-black uppercase tracking-tight text-[#C5B78E]">
              {footerContent.connectTitle}
            </h4>
            
            {/* Email */}
            <a
              href={`mailto:${footerContent.email}`}
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#C5B78E]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C5B78E]/10 border border-[#C5B78E]/20 group-hover:bg-[#C5B78E] group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-light text-white/70 group-hover:text-white transition-colors">
                {footerContent.email}
              </span>
            </a>

            <a
              href={footerContent.location.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#C5B78E]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C5B78E]/10 border border-[#C5B78E]/20 group-hover:bg-[#C5B78E] group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  {footerContent.location.label}
                </p>
                <span className="block truncate text-sm font-light text-white/70 group-hover:text-white transition-colors">
                  {footerContent.location.text}
                </span>
              </div>
            </a>

            <div className="grid gap-4 sm:grid-cols-2">
              {footerContent.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#C5B78E]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C5B78E]/10 border border-[#C5B78E]/20 group-hover:bg-[#C5B78E] group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                      {footerContent.phoneLabel}
                    </p>
                    <span className="block text-sm font-light text-white/70 group-hover:text-white transition-colors" dir="ltr">
                      {phone}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40">
                {footerContent.followUsLabel}
              </h5>
              <div className="flex gap-3">
                {footerContent.socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.iconKey];
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        group/social relative flex items-center justify-center w-14 h-14 rounded-full 
                        bg-white/5 border border-white/10 backdrop-blur-xl
                        transition-all duration-500
                        hover:scale-110 hover:-translate-y-2
                        ${social.color}
                      `}
                      aria-label={social.label}
                    >
                      {Icon ? (
                        <Icon
                          className="w-6 h-6 text-white transition-transform group-hover/social:scale-110"
                          strokeWidth={1.5}
                        />
                      ) : null}
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Donation Section */}
        <div ref={statsRef} className="py-16 lg:py-20 relative z-20">
          {/* تێبینی: لێرە overflow-hidden لادراوە بۆ ئەوەی ڕێگە بە لیستەکە بدات بێتە دەرەوەی بۆکسەکە */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8 lg:p-10 relative z-20">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#C5B78E]/25 bg-[#C5B78E]/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-[#C5B78E]">
                  <HeartHandshake className="h-4 w-4" strokeWidth={1.8} />
                  <span className='text-lg'>{footerContent.donation.badge}</span>
                </div>
                <div className="mt-6 space-y-5">
                  {footerContent.donation.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-2xl leading-8 text-white/78 text-xs">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 sm:p-6 relative z-30">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#C5B78E]">
                  {footerContent.donation.formLabel}
                </p>
                
                <div className="mt-5 flex flex-col gap-4 sm:flex-row relative">
                  
                  <div className="relative w-full sm:flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formattedDonationAmount}
                      onChange={handleDonationAmountChange}
                      onFocus={() => setShowPresets(true)}
                      onBlur={() => setTimeout(() => setShowPresets(false), 200)}
                      placeholder={footerContent.donation.placeholder || donationCopy.presetPlaceholder}
                      className="relative z-40 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 pe-16 text-base text-white placeholder:text-white/35 outline-none transition focus:border-[#C5B78E]/60 focus:bg-white/[0.06]"
                    />
                    <span className="pointer-events-none absolute inset-y-0 end-5 z-40 flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      IQD
                    </span>

                    {/* زێد ئیندێکس کراوە بە 999 و باگراوەندی بەشەکانی سەرەوە چاککرا */}
                    <div
                      className={`absolute left-0 top-[calc(100%+8px)] z-[999] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0805] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                        showPresets ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="p-2 relative z-[1000] bg-[#0a0805]">
                        <div className="mb-1 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                          {donationCopy.presetLabel}
                        </div>
                        {DONATION_PRESET_AMOUNTS.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              handlePresetSelect(amount);
                              setShowPresets(false);
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/[0.08] hover:text-white"
                          >
                            <span>{formatDonationAmount(amount)}</span>
                            <span className="text-xs text-[#C5B78E]/60">IQD</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDonate}
                    disabled={submittingDonation}
                    className="relative z-40 rounded-2xl border border-[#C5B78E]/30 bg-[#C5B78E]/12 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#f4ead0] transition hover:bg-[#C5B78E]/18 sm:w-auto"
                  >
                    {submittingDonation ? donationCopy.preparing : (footerContent.donation.buttonLabel || donationCopy.action)}
                  </button>
                </div>

               
                {donationError ? (
                  <p className="mt-3 text-sm text-rose-300 relative z-10">{donationError}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-sm text-white/30 font-light text-center md:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-[#C5B78E] font-medium">{footerContent.copyrightName}</span>. 
            {footerContent.rightsReserved}
          </p>

          <div className="flex items-center gap-2 text-xs text-white/20">
            <span>{footerContent.credits.prefix}</span>
            <span>{footerContent.credits.by}</span>
            <a
              href={footerContent.credits.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-[#C5B78E] hover:text-white transition-colors"
            >
              <span className="font-bold">{footerContent.credits.label}</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </a>
          </div>

        </div>

      </div>

      {/* Decorative Bottom Gradient Line */}
      <div className="relative z-10 h-1 bg-gradient-to-r from-transparent via-[#C5B78E] to-transparent opacity-50" />

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>

    </footer>
  );
}