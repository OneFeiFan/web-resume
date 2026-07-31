<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data } = useResume();
const { skills, projects } = data;

const COUNTS: Record<string, number> = {
  'JavaScript (ES6+)': 4, TypeScript: 1, HTML5: 4, CSS3: 4,
  'React 17': 1, 'Vue 2/3': 3, UniApp: 1, WePY: 1, 'Ant Design Pro': 1, Element: 0,
  '微信小程序': 1, '蓝牙 BLE': 1, 'WiFi 配网': 1, 'Canvas 海报': 1, 'H5 适配': 1,
  Git: 4, Webpack: 3, Jenkins: 0, '蓝湖': 0, TAPD: 0, '语雀': 0, TailwindCSS: 0,
};
</script>

<template>
  <div>
    <h1 style="color:var(--c-primary)">技术栈全景</h1>
    <div class="sec"><h2>按类别</h2></div>
    <div v-for="g in skills" :key="g.category" style="margin-bottom:1.5rem">
      <h3 class="t4" style="font-size:.78rem;margin-bottom:.5rem;font-family:'JetBrains Mono',monospace">{{ g.category }}</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.5rem">
        <div v-for="s in g.items" :key="s" class="skill-card">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <span class="t1" style="font-size:.85rem">{{ s }}</span>
            <span v-if="g.category !== '工程化'" class="t4" style="font-family:'JetBrains Mono',monospace;font-size:.7rem">{{ COUNTS[s] ?? 0 }} 项目</span>
          </div>
          <div v-if="g.category !== '工程化'" class="skill-bar">
            <div class="skill-bar-fill" :style="{width:(Math.min(100,(COUNTS[s]??0)/projects.length*100))+'%'}" />
          </div>
        </div>
      </div>
    </div>

    <div class="sec"><h2>按项目</h2></div>
    <div v-for="p in projects" :key="p.id" class="card">
      <div class="proj-hdr">
        <h3>{{ p.name }}</h3>
        <span class="proj-period">{{ p.period }}</span>
      </div>
      <div class="proj-tags">
        <span v-for="t in p.techStack" :key="t" class="proj-tag">{{ t }}</span>
      </div>
    </div>
  </div>
</template>
