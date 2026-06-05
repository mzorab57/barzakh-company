'use client';
import { Mail, Facebook, Instagram, Globe, ExternalLink, ArrowUpRight, HeartHandshake } from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { CosmicParallaxBg } from './ui/parallax-cosmic-background';
import { getFooterContent } from '@/data/componentContent';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [donationAmount, setDonationAmount] = useState('');
  const { t } = useTranslation();
  const footerContent = getFooterContent(t);

  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef([]);
  const statsRef = useRef(null);

  const socialIconMap = {
    Facebook,
    Instagram,
    Globe,
  };

  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Brand section - slide in from left
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

      // Links - stagger from bottom
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

      // Stats - scale in
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
        
      

        {/* Donation Section */}
        <div ref={statsRef} className="py-16 lg:py-20">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#C5B78E]/25 bg-[#C5B78E]/10 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-[#C5B78E]">
                  <HeartHandshake className="h-4 w-4" strokeWidth={1.8} />
                  <span className='text-lg'>{footerContent.donation.badge}</span>
                </div>
                <div className="mt-6 space-y-5">
                  {footerContent.donation.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-2xl  leading-8 text-white/78 text-xs">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#C5B78E]">
                  {footerContent.donation.formLabel}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={donationAmount}
                    onChange={(event) => setDonationAmount(event.target.value)}
                    placeholder={footerContent.donation.placeholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-base text-white placeholder:text-white/35 outline-none transition focus:border-[#C5B78E]/60 focus:bg-white/[0.06]"
                  />
                  <button
                    type="button"
                    className="rounded-2xl border border-[#C5B78E]/30 bg-[#C5B78E]/12 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#f4ead0] transition hover:bg-[#C5B78E]/18"
                  >
                    {footerContent.donation.buttonLabel}
                  </button>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid Section */}
        <div className="py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 border-t border-white/5">
          
          {/* Useful Links */}
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

          {/* International Presence */}
          <div ref={(el) => (linksRef.current[1] = el)} className="space-y-8">
            <h4 className="text-2xl font-black uppercase tracking-tight text-[#C5B78E]">
              {footerContent.globalReachTitle}
            </h4>
            <ul className="grid grid-cols-2 gap-4">
              {footerContent.international.map((country) => (
                <li key={country.code}>
                  <a
                    href={`#${country.code.toLowerCase()}`}
                    className="group flex flex-col items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#C5B78E]/30 transition-all duration-300"
                  >
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-[#C5B78E]">
                      {country.code}
                    </span>
                    <span className="text-sm font-light text-white/60 group-hover:text-white transition-colors">
                      {country.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div ref={(el) => (linksRef.current[2] = el)} className="space-y-8">
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

        {/* Bottom Bar */}
        <div className="py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <p className="text-sm text-white/30 font-light text-center md:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-[#C5B78E] font-medium">{footerContent.copyrightName}</span>. 
            {footerContent.rightsReserved}
          </p>

          {/* Credits */}
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
