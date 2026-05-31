'use client';
import { Mail, Facebook, Instagram, Send, Globe, ExternalLink, ArrowUpRight, Award } from 'lucide-react';
import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { CosmicParallaxBg } from './ui/parallax-cosmic-background';
import { getFooterContent } from '@/data/componentContent';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const footerContent = getFooterContent(t);

  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef([]);
  const statsRef = useRef(null);

  const statIconMap = {
    Award,
  };

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

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
        
        {/* Top Section: Hero Newsletter */}
        <div className="pt-24 sm:pt-32 lg:pt-40 pb-20 lg:pb-28 border-b border-white/5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left: Mega Brand Section */}
            <div ref={brandRef} className="lg:col-span-7 space-y-10">
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3">
               
                <div className="h-[1px] w-20 bg-gradient-to-r from-[#C5B78E] to-transparent" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.5em] text-[#C5B78E]">
                  {footerContent.badge}
                </span>
              </div>

              {/* Mega Typography */}
              <div>
                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase leading-[0.9] tracking-tighter mb-4">
                  <span className="block font-black text-white">{footerContent.titleLines[0]}</span>
                  <span className="block font-black text-white">{footerContent.titleLines[1]}</span>
                </h2>
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-normal lowercase tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5B78E] via-[#E6D6A3] to-[#b59e5f]">
                    {footerContent.titleLines[2]}
                  </span>
                </p>
              </div>

              {/* Description */}
              <div className="flex items-start gap-6 max-w-2xl">
                <div className="hidden sm:block w-[2px] h-32 bg-gradient-to-b from-[#C5B78E] to-transparent" />
                <p className="text-lg sm:text-xl text-white/50 font-light leading-relaxed">
                  {footerContent.description}
                </p>
              </div>

            </div>

            {/* Right: Premium Newsletter Form */}
            <div className="lg:col-span-5">
              <div className="relative group">
                
                {/* Decorative Background Card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[#C5B78E]/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 hover:border-[#C5B78E]/30 transition-all duration-700">
                  
                  <h3 className="text-2xl font-bold mb-6 text-white/90">
                    {footerContent.newsletter.title}
                  </h3>

                  <form onSubmit={handleSubscribe} className="space-y-5">
                    {/* Email Input */}
                    <div className="relative group/input">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none transition-colors group-focus-within/input:text-[#C5B78E]" strokeWidth={1.5} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={footerContent.newsletter.placeholder}
                        required
                        className="w-full pl-14 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:bg-white/10 focus:border-[#C5B78E]/50 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group/btn w-full flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-[#C5B78E] to-[#b59e5f] text-black rounded-2xl font-bold text-sm uppercase tracking-wider shadow-[0_10px_40px_rgba(197,183,142,0.3)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(197,183,142,0.5)] hover:scale-[1.02] active:scale-95"
                    >
                      <span>{footerContent.newsletter.buttonLabel}</span>
                      <Send className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
                    </button>
                  </form>

                  <p className="mt-5 text-xs text-white/30 font-light text-center">
                    {footerContent.newsletter.note}
                  </p>

                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Stats Section (Floating Cards) */}
        <div ref={statsRef} className="py-16 lg:py-20">
          <div className="grid grid-cols-1  gap-6 lg:gap-8">
            {footerContent.stats.map((stat, index) => {
              const Icon = statIconMap[stat.iconKey];
              return (
                <div
                  key={index}
                  className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.05] hover:border-[#C5B78E]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(197,183,142,0.1)]"
                >
                  {Icon ? <Icon className="mx-auto mb-4 h-7 w-7 text-[#C5B78E]" strokeWidth={1.6} /> : null}
                  <div className="text-4xl font-black text-white mb-2 transition-colors group-hover:text-[#C5B78E]">
                    {stat.number}
                  </div>
                  <div className="text-sm font-light uppercase tracking-[0.2em] text-white/50">
                    {stat.label}
                  </div>
                </div>
              );
            })}
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
