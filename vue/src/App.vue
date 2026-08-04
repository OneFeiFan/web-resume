<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useResumeStore } from './stores/useResumeStore';
import { useTheme } from './composables/useTheme';
import AppNav from './components/AppNav.vue';
import PrintBar from './components/PrintBar.vue';
import TechFooter from './components/TechFooter.vue';

useTheme();
const route = useRoute();
const store = useResumeStore();

const mainClass = computed(() => {
  const cls = ['app-main'];
  if (['/project/', '/tech-stack', '/timeline', '/about'].some(p => route.path.startsWith(p))) cls.push('wide');
  if (store.viewMode === 'print') cls.push('print-mode');
  return cls.join(' ');
});
</script>

<template>
  <AppNav v-if="store.viewMode !== 'print'" />
  <main :class="mainClass">
    <PrintBar v-if="store.viewMode === 'print'" />
    <div v-else class="top-bar no-print">
      <div class="top-bar-ver">
        <span style="display:inline-flex;align-items:center;gap:4px">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polygon points="12,4 22,8 20,20 12,22 4,20 2,8" fill="#41B883" stroke="#35495E" stroke-width="0.6"/><path d="M12 5L6 8l1 9 5 1.5 5-1.5 1-9z" fill="#35495E"/></svg>
          Vue 3 版
        </span>
        <a href="/react/">React 版 →</a>
      </div>
      <button @click="store.toggleViewMode()" class="top-bar-btn">打印预览</button>
    </div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <component :is="Component" />
        </suspense>
      </template>
    </router-view>
    <TechFooter />
  </main>
</template>
