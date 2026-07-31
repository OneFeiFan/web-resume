import { watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const scrollCache = new Map<string, number>();

export function useScrollManager() {
  const router = useRouter();
  let currentPath = router.currentRoute.value.path;

  const save = () => {
    scrollCache.set(currentPath, window.scrollY);
  };

  const restore = (path: string) => {
    const target = scrollCache.get(path);
    if (target !== undefined) {
      let tries = 0;
      const attempt = () => {
        window.scrollTo(0, target);
        tries++;
        if (window.scrollY < target - 10 && tries < 8) {
          requestAnimationFrame(attempt);
        }
      };
      requestAnimationFrame(attempt);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Save on leave, restore on enter
  watch(() => router.currentRoute.value.path, (to, from) => {
    scrollCache.set(from, window.scrollY);
    currentPath = to;
    restore(to);
  });

  onBeforeUnmount(() => save());
}
