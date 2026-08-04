<script setup lang="ts">
import { useResumeStore } from '../stores/useResumeStore';
const store = useResumeStore();
</script>

<template>
  <div class="print-toolbar" style="position:sticky;top:0;z-index:30">
    <span style="color:var(--ink-muted);font-size:var(--text-xs)">打印预览 · A4</span>
    <div style="flex:1" />
    <button @click="store.toggleViewMode()" style="border:1px solid var(--rule);background:var(--paper);color:var(--ink-muted);padding:0.25rem 0.75rem;cursor:pointer;font-size:var(--text-sm);font-family:inherit;border-radius:2px">退出</button>
    <button @click="window.print()" style="border:1px solid var(--red);background:var(--red-pale);color:var(--red);padding:0.25rem 0.75rem;cursor:pointer;font-size:var(--text-sm);font-family:inherit;border-radius:2px;font-weight:500">下载 PDF</button>
  </div>
</template>
