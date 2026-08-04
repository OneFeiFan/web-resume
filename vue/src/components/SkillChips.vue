<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data, activeSkill, toggleSkill, filteredProjects } = useResume();
</script>

<template>
  <div class="no-print">
    <div class="section-head">
      <span class="section-label">Skills</span>
      <span class="section-rule" />
    </div>
    <div v-for="g in data.skills" :key="g.category" class="skill-group">
      <span class="skill-cat">{{ g.category }}</span>
      <div class="chip-row">
        <span v-for="s in g.items" :key="s"
          :class="['chip', { on: activeSkill === s }]"
          @click="toggleSkill(s)">{{ s }}</span>
      </div>
    </div>
    <p v-if="activeSkill" class="filter-hint">
      已筛选「{{ activeSkill }}」— 匹配 {{ filteredProjects.length }} 个项目
      <a @click="toggleSkill(activeSkill!)">清除</a>
    </p>
  </div>
</template>
