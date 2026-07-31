<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data, activeSkill, toggleSkill } = useResume();
const skill = activeSkill;
</script>

<template>
  <div class="no-print">
    <div class="sec"><h2>Skills</h2></div>
    <div v-for="g in data.skills" :key="g.category" class="skill-row">
      <span class="cat">{{ g.category }}</span>
      <span v-for="s in g.items" :key="s"
        :class="['chip', { on: skill === s }]"
        @click="toggleSkill(s)">{{ s }}</span>
    </div>
    <p v-if="skill" class="t4" style="font-size:.72rem;margin-top:.3rem">
      已筛选「{{ skill }}」·
      <a @click="toggleSkill(skill!)" style="cursor:pointer">清除</a>
    </p>
  </div>
</template>
