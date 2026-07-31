<script setup lang="ts">
import { useResumeStore } from '../stores/useResumeStore';
const store = useResumeStore();

function doPrint() { window.print(); }

const btn = {
  border: '1px solid var(--c-border)', background: 'var(--c-card)', color: 'var(--t2)',
  padding: '.35rem .9rem', borderRadius: '4px', cursor: 'pointer', fontSize: '.78rem',
  fontFamily: 'inherit', transition: 'all .15s',
};
const primaryBtn = { ...btn, background: 'var(--c-primary)', color: 'var(--c-surface)', borderColor: 'var(--c-primary)', fontWeight: 500 };
</script>

<template>
  <div v-if="store.viewMode !== 'print'" class="no-print" style="text-align:right;margin-bottom:.3rem">
    <button @click="store.toggleViewMode()" :style="btn" style="font-size:.75rem">打印预览</button>
  </div>
  <div v-else class="print-toolbar" style="position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:.8rem;padding:.6rem 0;margin-bottom:2rem;border-bottom:1px solid var(--c-border);background:var(--c-surface);font-size:.78rem">
    <span style="color:var(--t3);font-size:.75rem;font-family:'JetBrains Mono',monospace">打印预览 · A4</span>
    <div style="flex:1" />
    <button @click="store.toggleViewMode()" :style="btn">退出</button>
    <button @click="doPrint" :style="primaryBtn">下载 PDF</button>
  </div>
</template>
