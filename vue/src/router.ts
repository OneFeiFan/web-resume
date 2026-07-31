import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/vue/'),
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
    { path: '/project/:id', name: 'project', component: () => import('./pages/ProjectDetail.vue') },
    { path: '/tech-stack', name: 'tech-stack', component: () => import('./pages/TechStack.vue') },
    { path: '/timeline', name: 'timeline', component: () => import('./pages/Timeline.vue') },
    { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;
