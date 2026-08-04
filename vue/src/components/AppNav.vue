<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useResumeStore } from '../stores/useResumeStore';

const router = useRouter();
const route = useRoute();
const store = useResumeStore();

const items = [
  { path: '/',           label: '简历' },
  { path: '/tech-stack', label: '技术栈' },
  { path: '/timeline',   label: '时间线' },
  { path: '/about',      label: '关于' },
];

const isWide = ['/project/', '/tech-stack', '/timeline', '/about'].some(p => route.path.startsWith(p));
</script>

<template>
  <nav :class="['nav-bar', 'no-print', { wide: isWide }]">
    <span class="nav-name" @click="router.push('/')">陆威帆</span>
    <div class="nav-links">
      <span v-for="item in items" :key="item.path"
        :class="['nav-link', { active: route.path === item.path }]"
        @click="router.push(item.path)">{{ item.label }}</span>
    </div>
    <div class="nav-actions">
      <a href="https://github.com/OneFeiFan/web-resume" target="_blank" rel="noopener noreferrer"
        class="nav-link" style="font-size:var(--text-xs)">GitHub</a>
      <button class="nav-icon-btn" @click="store.toggleTheme()"
        :title="store.theme==='light'?'深色模式':'浅色模式'">
        {{ store.theme === 'light' ? '◐' : '◑' }}
      </button>
    </div>
  </nav>
</template>
