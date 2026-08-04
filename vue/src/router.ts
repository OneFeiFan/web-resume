import { createRouter, createWebHistory } from 'vue-router';

const scrollCache = new Map<string, number>();

const router = createRouter({
  history: createWebHistory('/vue/'),
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
    { path: '/project/:id', name: 'project', component: () => import('./pages/ProjectDetail.vue') },
    { path: '/tech-stack', name: 'tech-stack', component: () => import('./pages/TechStack.vue') },
    { path: '/timeline', name: 'timeline', component: () => import('./pages/Timeline.vue') },
    { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    // Restore cached position for this route
    const cached = scrollCache.get(to.path);
    if (cached !== undefined) return { top: cached };
    return { top: 0 };
  },
});

// Save scroll position before leaving
router.beforeEach((_to, from) => {
  if (from.path) {
    scrollCache.set(from.path, window.scrollY);
  }
});

export default router;
