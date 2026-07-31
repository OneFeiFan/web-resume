<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useResumeStore } from './stores/useResumeStore';
import { useTheme } from './composables/useTheme';
import AppNav from './components/AppNav.vue';
import PrintBar from './components/PrintBar.vue';
import FrameworkSwitcher from './components/FrameworkSwitcher.vue';
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
    <PrintBar />
    <FrameworkSwitcher />
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
