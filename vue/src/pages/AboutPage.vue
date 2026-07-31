<script setup lang="ts">
import { useResumeStore } from '../stores/useResumeStore';
const store = useResumeStore();

const DECISIONS = [
  { title: '状态管理：为什么选 Pinia 而不是 Vuex？', tags: ['Pinia', 'Vuex', 'Composition API'], why: 'Pinia 的 Composition API 风格与 Vue 3 生态完全一致，类型推导完整，无需 mutations 概念。', tradeoff: 'Vuex 5 已合并为 Pinia。对于个人 Portfolio 规模，Pinia 在简洁与类型安全间取得最佳平衡。' },
  { title: '路由懒加载：defineAsyncComponent 代码分割', tags: ['Vue Router', 'Lazy Loading', 'Code Splitting'], why: '5 个页面拆分为独立 chunk，首页优先加载，其余按需。', tradeoff: '路由级分割有首次点击延迟，但对 5 页小站点几乎无感知。' },
  { title: '设计系统：与 React 版共享 CSS + 数据层', tags: ['CSS Variables', 'Design Tokens', 'Monorepo'], why: 'React 和 Vue 版本共用同一份 resume.json 数据和 index.css 设计 tokens。两套代码、同一套设计语言。', tradeoff: 'CSS 通过 Tailwind 工具类 + CSS 自定义属性实现，两个版本完全一致的视觉效果。' },
];
</script>

<template>
  <div>
    <h1 style="color:var(--c-primary)">关于本站</h1>
    <p class="t3" style="font-size:.88rem;margin-top:.3rem;margin-bottom:2rem">本 Portfolio 采用 Vue 3 + Pinia 构建，与 React 版共享同一份数据层与设计 tokens。每项技术决策都有其理由和权衡。</p>

    <div class="sec"><h2>Architecture Decisions</h2></div>
    <div v-for="(d, i) in DECISIONS" :key="i" class="adr">
      <h3><span class="adr-num">ADR-{{ i+1 }}</span> {{ d.title }}</h3>
      <p style="margin-top:.4rem"><span class="case-label">选择：</span>{{ d.why }}</p>
      <p><span style="color:#9B7A3A;font-weight:500;font-size:.72rem">权衡：</span>{{ d.tradeoff }}</p>
      <div class="adr-tags">
        <span v-for="t in d.tags" :key="t" class="proj-tag">{{ t }}</span>
      </div>
    </div>

    <div class="sec"><h2>Data Source</h2></div>
    <div class="card">
      <p class="t2" style="font-size:.85rem;line-height:1.7">
        所有数据来自 <code>~/career-vault/projects/</code> 下 4 个项目的结构化 JSON 档案，
        由 <code>/analyze-my-history</code> 和 <code>/extract-career-data</code> 从 369 条 Git 提交中自动提取。
        每一条数据都可追溯到具体的 commit hash。
      </p>
    </div>

    <div v-if="store.recentProjects.length" class="sec"><h2>Your Trail</h2></div>
    <p v-if="store.recentProjects.length" class="t4" style="font-size:.78rem;margin-bottom:.5rem">存储在浏览器 localStorage · 不上传任何数据</p>
    <div v-if="store.recentProjects.length" class="skill-row">
      <router-link v-for="id in store.recentProjects" :key="id" :to="'/project/'+id" class="chip">{{ id }}</router-link>
    </div>
  </div>
</template>
