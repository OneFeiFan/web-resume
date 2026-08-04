import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp — 数字递增动画
 *
 * 当元素进入视口时，数字从 0 平滑递增到目标值。
 * Git 增量数据使用 "+" 前缀，减量使用 "−" 前缀。
 *
 * 用法：
 *   const { ref, display } = useCountUp({ end: 369, duration: 800 });
 *   <span ref={ref}>{display}</span>
 */
interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** locale 格式化（如 "en-US" 添加千分位逗号） */
  formatLocale?: string;
  /** 延迟启动（ms），用于编排入场序曲 */
  delay?: number;
}

export function useCountUp({
  end,
  duration = 800,
  prefix = '',
  suffix = '',
  formatLocale,
  delay = 0,
}: UseCountUpOptions) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            observer.unobserve(el);
            startCount();
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    function startCount() {
      if (prefersReduced) {
        const formatted = formatLocale
          ? end.toLocaleString(formatLocale)
          : String(end);
        setDisplay(`${prefix}${formatted}${suffix}`);
        return;
      }

      const startTime = performance.now() + delay;

      function tick(now: number) {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        // ease-out-expo-like curve
        const eased = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * end);

        const formatted = formatLocale
          ? current.toLocaleString(formatLocale)
          : String(current);
        setDisplay(`${prefix}${formatted}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }

    return () => observer.disconnect();
  }, [end, duration, prefix, suffix, formatLocale, delay]);

  return { ref, display };
}
