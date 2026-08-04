import { useEffect, useRef, useCallback } from 'react';

/**
 * useScrollReveal — 基于 IntersectionObserver 的滚动触发动画
 *
 * 用法：
 *   const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
 *   <div ref={ref} className="reveal">...</div>
 *
 * 当元素进入视口时自动添加 `visible` class，触发 CSS 动画。
 * 元素离开视口时不移除 class（保持已展示状态）。
 */
interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  /** 是否只触发一次（默认 true） */
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = options;
  const ref = useRef<T>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            if (once) {
              triggered.current = true;
              observer.unobserve(el);
            }
          } else if (!once) {
            el.classList.remove('visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * useStaggerReveal — 容器级别的交错动画
 *
 * 用法：
 *   const ref = useStaggerReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal-stagger">
 *     <div>子元素 1</div>
 *     <div>子元素 2</div>
 *   </div>
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  return useScrollReveal<T>({ ...options, threshold: 0.08 });
}

/**
 * useDrawLine — 分割线绘制动画
 *
 * 用法：
 *   const ref = useDrawLine<HTMLDivElement>();
 *   <div ref={ref} className="sec-line" />
 */
export function useDrawLine<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('draw');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('draw');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
