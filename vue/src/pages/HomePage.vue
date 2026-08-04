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

    <div class="section-head">
      <span class="section-label">Experience</span>
      <span class="section-rule" />
    </div>
    <div class="exp-header">
      <h3>{{ experience.company }}</h3>
      <p class="exp-period">{{ experience.role }} · {{ experience.period }}</p>
    </div>
    <div v-for="(b, i) in experience.bullets" :key="i" class="exp-item">
      <div class="exp-item-title">{{ b.title }}</div>
      <div class="exp-item-content">{{ b.content }}</div>
    </div>

    <div class="section-head">
      <span class="section-label">Projects</span>
      <span class="section-count">{{ filteredProjects.length }}/{{ data.projects.length }}</span>
      <span class="section-rule" />
    </div>
    <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />

    <div class="section-head">
      <span class="section-label">Honors</span>
      <span class="section-rule" />
    </div>
    <div v-for="(a, i) in awards" :key="i" class="award-row">
      <span class="award-badge">{{ a.title }}</span>
      <span>{{ a.event }}</span>
      <span class="award-year">{{ a.year }}</span>
    </div>
  </div>
</template>
