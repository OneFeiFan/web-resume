<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useResumeStore } from '../stores/useResumeStore';

const router = useRouter();
const route = useRoute();
const store = useResumeStore();

const items = [
  { path: '/', label: '简历', icon: 'CV' },
  { path: '/tech-stack', label: '技术栈', icon: 'TS' },
  { path: '/timeline', label: '时间线', icon: 'TL' },
  { path: '/about', label: '关于', icon: 'AB' },
];
</script>

<template>
  <nav class="nav-rail no-print">
    <div class="nav-mono">WF</div>
    <div
      v-for="item in items" :key="item.path"
      :class="['nav-item', { active: route.path === item.path }]"
      @click="router.push(item.path)"
    >
      <span style="font-size:.7rem;font-family:'JetBrains Mono',monospace" :style="{fontWeight:route.path===item.path?600:400}">
        {{ item.icon }}
      </span>
      <span class="nav-tip">{{ item.label }}</span>
    </div>
    <div class="nav-spacer" />
    <a href="https://github.com/OneFeiFan/web-resume" target="_blank" rel="noopener noreferrer"
      class="nav-item" title="GitHub 开源" style="text-decoration:none">
      <span style="font-size:.7rem;font-family:'JetBrains Mono',monospace;font-weight:400">GH</span>
      <span class="nav-tip">GitHub</span>
    </a>
    <button class="nav-btn" @click="store.toggleTheme()" :title="store.theme==='light'?'深色':'浅色'">
      {{ store.theme === 'light' ? '◐' : '◑' }}
    </button>
  </nav>
</template>
