<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data } = useResume();
const { timeline, projects } = data;
const totalCommits = projects.reduce((s: number, p: any) => s + (Number(p.metrics.commits) || 0), 0);
const events = [...timeline].reverse();

const DOT_COLOR: Record<string, string> = {
  start: 'var(--c-primary)', end: 'var(--c-accent)', milestone: 'var(--c-primary)', gap: 'var(--t4)',
};
</script>

<template>
  <div>
    <h1 style="color:var(--c-primary)">时间线</h1>
    <div class="sec"><h2>Journey</h2></div>

    <div class="tl-track-new">
      <div v-for="(e, i) in events" :key="i"
        :class="['tl-slot', i%2===0 ? 'tl-up' : 'tl-down', e.type==='gap' ? 'tl-ghost' : '']">
        <template v-if="i%2===0">
          <div class="tl-card-new">
            <span class="tl-card-date">{{ e.date }}</span>
            <span class="tl-card-label">{{ e.label }}</span>
          </div>
          <div class="tl-stem" />
          <div :class="['tl-dot-new', e.type==='gap'?'tl-dot-dash':'']"
            :style="{borderColor:DOT_COLOR[e.type]||DOT_COLOR.milestone,background:e.type==='gap'?'var(--c-surface)':(DOT_COLOR[e.type]||DOT_COLOR.milestone)}" />
          <div class="tl-spacer" />
        </template>
        <template v-else>
          <div class="tl-spacer" />
          <div :class="['tl-dot-new', e.type==='gap'?'tl-dot-dash':'']"
            :style="{borderColor:DOT_COLOR[e.type]||DOT_COLOR.milestone,background:e.type==='gap'?'var(--c-surface)':(DOT_COLOR[e.type]||DOT_COLOR.milestone)}" />
          <div class="tl-stem" />
          <div class="tl-card-new">
            <span class="tl-card-date">{{ e.date }}</span>
            <span class="tl-card-label">{{ e.label }}</span>
          </div>
        </template>
      </div>
    </div>

    <div class="tl-legend">
      <span class="tl-legend-item"><span class="tl-dot-new" style="position:static;display:inline-block;background:var(--c-primary);border-color:var(--c-primary)" /> <span class="t4">开始/里程碑</span></span>
      <span class="tl-legend-item"><span class="tl-dot-new" style="position:static;display:inline-block;background:var(--c-accent);border-color:var(--c-accent)" /> <span class="t4">结束</span></span>
      <span class="tl-legend-item"><span class="tl-dot-new tl-dot-dash" style="position:static;display:inline-block" /> <span class="t4">过渡期</span></span>
    </div>

    <div class="sec"><h2>Stats</h2></div>
    <div class="mets">
      <div v-for="p in projects" :key="p.id" class="card" style="text-align:center;padding:1rem">
        <div class="met-num">{{ p.metrics.commits || '-' }}</div>
        <div class="met-lbl">{{ p.name.split('(')[0].trim() }}</div>
        <div class="proj-period">{{ p.period }}</div>
      </div>
    </div>
    <div class="card" style="text-align:center;margin-top:.5rem;background:var(--c-muted)">
      <div class="met-num" style="font-size:2.4rem">{{ totalCommits }}</div>
      <div class="met-lbl">总提交数（4 项目）</div>
    </div>
  </div>
</template>
