<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data } = useResume();
const { timeline, projects } = data;
const totalCommits = projects.reduce((s: number, p: any) => s + (Number(p.metrics.commits) || 0), 0);
const events = [...timeline].reverse();

const DOT_CLASS: Record<string, string> = {
  start: 'solid', end: 'end', milestone: 'solid', gap: 'dash',
};
</script>

<template>
  <div>
    <h1 style="font-family:'Noto Serif SC',serif">时间线</h1>

    <div class="section-head">
      <span class="section-label">Journey</span>
      <span class="section-rule" />
    </div>

    <div class="tl-track">
      <div v-for="(e, i) in events" :key="i"
        :class="['tl-slot', i%2===0 ? 'tl-up' : 'tl-down', e.type==='gap' ? 'tl-ghost' : '']">
        <template v-if="i%2===0">
          <div class="tl-card"><span class="tl-date">{{ e.date }}</span><span class="tl-label">{{ e.label }}</span></div>
          <div class="tl-stem" />
          <div :class="['tl-dot', DOT_CLASS[e.type] || 'solid']" />
          <div class="tl-spacer" />
        </template>
        <template v-else>
          <div class="tl-spacer" />
          <div :class="['tl-dot', DOT_CLASS[e.type] || 'solid']" />
          <div class="tl-stem" />
          <div class="tl-card"><span class="tl-date">{{ e.date }}</span><span class="tl-label">{{ e.label }}</span></div>
        </template>
      </div>
    </div>

    <div class="tl-legend">
      <span><span class="tl-legend-dot" style="background:var(--ink)" /> 里程碑</span>
      <span><span class="tl-legend-dot" style="background:var(--red)" /> 结束</span>
      <span><span class="tl-legend-dot" style="background:var(--paper);border:2px dashed var(--ink-muted)" /> 过渡期</span>
    </div>

    <div class="section-head">
      <span class="section-label">Stats</span>
      <span class="section-rule" />
    </div>
    <div class="metrics-bar">
      <div v-for="p in projects" :key="p.id" class="metric">
        <div class="metric-num">{{ p.metrics.commits || '-' }}</div>
        <div class="metric-lbl">{{ p.name.split('(')[0].trim() }}</div>
        <div class="card-period" style="font-size:0.62rem;margin-top:2px">{{ p.period }}</div>
      </div>
    </div>
    <div class="card" style="text-align:center;margin-top:var(--sp-2);background:var(--paper-deeper)">
      <div class="metric-num" style="font-size:2rem">{{ totalCommits }}</div>
      <div class="metric-lbl">总提交数（{{ projects.length }} 项目）</div>
    </div>
  </div>
</template>
