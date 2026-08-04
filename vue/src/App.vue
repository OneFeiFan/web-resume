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
        <span>💚 Vue 3 版</span>
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
