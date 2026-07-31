<script setup lang="ts">
import { useResume } from '../composables/useResume';
import AppHeader from '../components/AppHeader.vue';
import SkillChips from '../components/SkillChips.vue';
import ProjectCard from '../components/ProjectCard.vue';

const { data, filteredProjects } = useResume();
const { experience, awards } = data;
</script>

<template>
  <div>
    <AppHeader />
    <SkillChips />

    <div class="sec"><h2>Experience</h2></div>
    <div style="margin-bottom:1.5rem">
      <h3 class="t1">{{ experience.company }}</h3>
      <p class="proj-period">{{ experience.role }} · {{ experience.period }}</p>
    </div>
    <div v-for="(b, i) in experience.bullets" :key="i" class="exp-item">
      <div class="exp-title">{{ b.title }}</div>
      <div class="exp-text">{{ b.content }}</div>
    </div>

    <div class="sec"><h2>Projects ({{ filteredProjects.length }}/{{ data.projects.length }})</h2></div>
    <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />

    <div class="sec"><h2>Honors</h2></div>
    <div v-for="(a, i) in awards" :key="i" class="award">
      <span class="award-badge">{{ a.title }}</span>
      <span>{{ a.event }}</span>
      <span class="award-year">{{ a.year }}</span>
    </div>

    <div class="print-only" style="display:none;margin-top:2rem;font-size:.7rem;color:var(--t4);border-top:1px solid #ddd;padding-top:.8rem">
      此简历由真实 Git 工程数据生成 · 基于 4 个项目 369 条提交
    </div>
  </div>
</template>
