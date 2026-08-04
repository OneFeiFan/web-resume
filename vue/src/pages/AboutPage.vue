<script setup lang="ts">
import { ref } from 'vue';
import { useResumeStore } from '../stores/useResumeStore';
const store = useResumeStore();

const DECISIONS = [
  { title: '状态管理：为什么选 Pinia 而不是 Vuex？', tags: ['Pinia', 'Vuex', 'Composition API'], why: 'Pinia 的 Composition API 风格与 Vue 3 生态完全一致，类型推导完整，无需 mutations 概念。', tradeoff: 'Vuex 5 已合并为 Pinia。对于个人 Portfolio 规模，Pinia 在简洁与类型安全间取得最佳平衡。' },
  { title: '路由懒加载：defineAsyncComponent 代码分割', tags: ['Vue Router', 'Lazy Loading', 'Code Splitting'], why: '5 个页面拆分为独立 chunk，首页优先加载，其余按需。', tradeoff: '路由级分割有首次点击延迟，但对 5 页小站点几乎无感知。' },
  { title: '设计系统：与 React 版共享 CSS + 数据层', tags: ['CSS Variables', 'Design Tokens', 'Monorepo'], why: 'React 和 Vue 版本共用同一份 resume.json 数据和 index.css 设计 tokens。两套代码、同一套设计语言。', tradeoff: 'CSS 通过 Tailwind 工具类 + CSS 自定义属性实现，两个版本完全一致的视觉效果。' },
];

const expanded = ref<number | null>(null);
</script>

<template>
  <div>
    <h1 style="font-family:'Noto Serif SC',serif;color:var(--ink)">关于本站</h1>
    <p style="font-size:var(--text-base);color:var(--ink-soft);margin-top:var(--sp-2);margin-bottom:var(--sp-8)">
      本 Portfolio 采用 Vue 3 + Pinia 构建，与 React 版共享同一份数据层与设计 tokens。每项技术决策都有其理由和权衡。
    </p>

    <div class="section-head">
      <span class="section-label">Architecture Decisions</span>
      <span class="section-rule" />
    </div>
    <div v-for="(d, i) in DECISIONS" :key="i"
      class="adr-card" @click="expanded = expanded === i ? null : i">
      <div class="adr-badge">ADR-{{ String(i+1).padStart(2,'0') }}</div>
      <h3>{{ d.title }}</h3>
      <div v-if="expanded === i" class="adr-detail" style="margin-top:var(--sp-4)">
        <p><span class="adr-label">选择</span> {{ d.why }}</p>
        <p><span class="adr-label" style="color:var(--ink-soft)">权衡</span> {{ d.tradeoff }}</p>
        <div class="adr-tags">
          <span v-for="t in d.tags" :key="t" class="adr-tag">{{ t }}</span>
        </div>
      </div>
    </div>

    <div class="section-head">
      <span class="section-label">Data Source</span>
      <span class="section-rule" />
    </div>
    <div class="card">
      <p style="font-size:var(--text-base);color:var(--ink-soft);line-height:1.7">
        所有数据来自 Git 提交历史自动提取的结构化档案。每一条数据都可追溯到具体的 commit hash。
      </p>
    </div>

    <template v-if="store.recentProjects.length">
      <div class="section-head">
        <span class="section-label">Your Trail</span>
        <span class="section-rule" />
      </div>
      <p style="font-size:var(--text-xs);color:var(--ink-faint);margin-bottom:var(--sp-2)">
        存储在浏览器 localStorage · 不上传任何数据
      </p>
      <div class="chip-row">
        <router-link v-for="id in store.recentProjects" :key="id" :to="'/project/'+id" class="chip">{{ id }}</router-link>
      </div>
    </template>
  </div>
</template>
