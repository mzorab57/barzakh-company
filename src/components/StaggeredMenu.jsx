import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import './StaggeredMenu.css';
import { getStaggeredMenuContent } from '@/data/componentContent';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const staggeredMenuContent = getStaggeredMenuContent(t);
  const [open, setOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({ type: 'main', items: items });
  
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const openTlRef = useRef(null);

  // ڕێفەکان بۆ ٣ خەتەکەی هەمبەرگر مینیۆ
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    gsap.to([...preLayerElsRef.current, panelRef.current], {
      xPercent: position === 'left' ? -100 : 100,
      duration: 0.4,
      ease: 'power3.in'
    });
    
    // گەڕاندنەوەی ٣ خەتەکە بۆ باری ئاسایی (Hamburger)
    gsap.to(line1Ref.current, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.out' });
    gsap.to(line2Ref.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    gsap.to(line3Ref.current, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.out' });
    
    gsap.to(textInnerRef.current, { yPercent: 0, duration: 0.5 });
    setCurrentMenu({ type: 'main', items });
  }, [items, onMenuClose, position]);

  // ئینیمەیشنی هاتنە ژوورەوەی ئایتمەکان
  const animateItemsIn = useCallback((container) => {
    const labels = Array.from(container.querySelectorAll('.sm-panel-itemLabel'));
    if (labels.length) {
      gsap.fromTo(labels, 
        { yPercent: 130, rotate: 8 },
        { yPercent: 0, rotate: 0, duration: 0.8, ease: 'power4.out', stagger: 0.08 }
      );
    }
  }, []);

  const handleItemClick = useCallback((e, item) => {
    if (item.isParent && item.children) {
      e.preventDefault();
      // ئینیمەیشنی دەرچوونی لیستە کۆنەکە
      const labels = Array.from(panelRef.current.querySelectorAll('.sm-panel-itemLabel'));
      gsap.to(labels, {
        yPercent: -130,
        rotate: -8,
        duration: 0.4,
        ease: 'power4.in',
        stagger: 0.03,
        onComplete: () => {
          setCurrentMenu({ type: 'sub', items: item.children, parentLabel: item.label });
        }
      });
    }
  }, []);

  const goBack = useCallback(() => {
    const labels = Array.from(panelRef.current.querySelectorAll('.sm-panel-itemLabel'));
    gsap.to(labels, {
      yPercent: 130,
      rotate: 8,
      duration: 0.4,
      ease: 'power4.in',
      stagger: 0.03,
      onComplete: () => {
        setCurrentMenu({ type: 'main', items: items });
      }
    });
  }, [items]);

  const handleLeafItemClick = useCallback((item) => {
    closeMenu();

    if (!item?.link) return;
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }

    navigate(item.link);
  }, [closeMenu, navigate]);

  // هەر کاتێک مینیوەکە گۆڕا، ئینیمەیشنەکە کار بکات
  useEffect(() => {
    if (open && panelRef.current) {
      animateItemsIn(panelRef.current);
    }
  }, [currentMenu, open, animateItemsIn]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;
    openTlRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    const tl = gsap.timeline({ paused: true });
    
    layers.forEach((layer, index) => {
      tl.fromTo(layer, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, index * 0.07);
    });
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, layers.length * 0.07);
    openTlRef.current = tl;
    return tl;
  }, [position]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      buildOpenTimeline()?.play(0);
      setCurrentMenu({ type: 'main', items: items });
      
      // گۆڕینی ٣ خەتەکە بۆ X
      gsap.to(line1Ref.current, { y: 7, rotate: 45, duration: 0.5, ease: 'power3.out' });
      gsap.to(line2Ref.current, { scaleX: 0, opacity: 0, duration: 0.5, ease: 'power3.out' });
      gsap.to(line3Ref.current, { y: -7, rotate: -45, duration: 0.5, ease: 'power3.out' });
      
    } else {
      onMenuClose?.();
      gsap.to([...preLayerElsRef.current, panelRef.current], {
        xPercent: position === 'left' ? -100 : 100,
        duration: 0.4,
        ease: 'power3.in'
      });
      setCurrentMenu({ type: 'main', items });
      
      // گەڕاندنەوە بۆ ٣ خەتەکە
      gsap.to(line1Ref.current, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.out' });
      gsap.to(line2Ref.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
      gsap.to(line3Ref.current, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.out' });
    }
    
    // ئەنیمەیشنی تێکستەکە
    gsap.to(textInnerRef.current, { yPercent: target ? -50 : 0, duration: 0.5 });
  }, [items, onMenuOpen, onMenuClose, buildOpenTimeline, position]);

  useLayoutEffect(() => {
    const preContainer = preLayersRef.current;
    if (preContainer) {
      preLayerElsRef.current = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      gsap.set([panelRef.current, ...preLayerElsRef.current], { xPercent: position === 'right' ? 100 : -100 });
    }
  }, [position]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return undefined;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu, closeOnClickAway, open]);

  return (
    <div className={`staggered-menu-wrapper ${className || ''}`} data-open={open || undefined} style={{ '--sm-accent': accentColor }}>
      <div ref={preLayersRef} className="sm-prelayers">
        {colors.map((color, i) => <div key={i} className="sm-prelayer" style={{ background: color }} />)}
      </div>

      <button
        ref={toggleBtnRef}
        className="sm-toggle"
        onClick={toggleMenu}
        style={{ color: changeMenuColorOnOpen && open ? openMenuButtonColor : menuButtonColor }}
      >
        <span className="sm-toggle-textWrap">
          <span ref={textInnerRef} className="sm-toggle-textInner">
            {staggeredMenuContent.toggleLabels.map((line) => (
              /* لێرەدا قەبارەی تێکستەکە بچووک کرایەوە و شێوازێکی ناسکی پێدرا */
              <span key={line} className="sm-toggle-line text-sm uppercase  font-bold"></span> //{line} bo danani text wak menu la taisht se xataka
            ))}
          </span>
        </span>
        {/* ئایکۆنی هەمبەرگر نوێکراوەتەوە */}
        <span className="sm-icon">
          <span ref={line1Ref} className="sm-icon-line line-1" />
          <span ref={line2Ref} className="sm-icon-line line-2" />
          <span ref={line3Ref} className="sm-icon-line line-3" />
        </span>
      </button>

      <aside ref={panelRef} className="staggered-menu-panel">
        <div className="sm-panel-inner">
          <div className="sm-menu-content">
            {currentMenu.type === 'sub' && (
              <button className="sm-back-button" onClick={goBack}>
                {`← ${staggeredMenuContent.backToMenuLabel}`}
              </button>
            )}
            
            <ul className="sm-panel-list" data-numbering={displayItemNumbering && currentMenu.type === 'main'}>
              {currentMenu.items.map((item, index) => (
                <li key={index} className="sm-panel-itemWrap">
                  <a href={item.link || '#'} className="sm-panel-item" onClick={(e) => {
                    if (item.isParent) {
                      handleItemClick(e, item);
                      return;
                    }

                    e.preventDefault();
                    handleLeafItemClick(item);
                  }}>
                    <span className="sm-panel-itemLabel text-xl lg:text-4xl">
                      {item.label} 
                      {item.isParent && <span className="sm-item-arrow"> ↗ </span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {displaySocials && currentMenu.type === 'main' && (
            <div className="sm-socials h-32">
              <h3 className="sm-socials-title">{staggeredMenuContent.socialsTitle}</h3>
              <ul className="sm-socials-list">
                {socialItems.map((s, i) => (
                  <li key={i}><a href={s.link} className="sm-socials-link">{s.label}</a></li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;