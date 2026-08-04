<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useResume } from '../composables/useResume';

const route = useRoute();
const router = useRouter();
const { getProjectById } = useResume();
const project = computed(() => getProjectById(route.params.id as string));

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '−行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};
</script>

<template>
  <div v-if="!project" style="text-align:center;padding:4rem 0">
    <p style="color:var(--ink-muted)">项目未找到</p>
    <a @click="router.push('/')" style="cursor:pointer;color:var(--red)">← 返回首页</a>
  </div>
  <div v-else>
    <a @click="router.push('/')" style="font-size:var(--text-sm);display:inline-block;margin-bottom:var(--sp-8);cursor:pointer;color:var(--ink-muted)">← 返回首页</a>
    <h1 style="font-family:'Noto Serif SC',serif">{{ project.name }}</h1>
    <p class="card-period" style="margin-top:var(--sp-1)">{{ project.period }} · {{ project.role }}</p>
    <p style="font-size:var(--text-base);color:var(--ink-soft);margin-top:var(--sp-4);margin-bottom:var(--sp-6);line-height:1.7">{{ project.summary }}</p>

    <div class="metrics-bar" style="margin-bottom:var(--sp-6)">
      <div v-for="(v, k) in project.metrics" :key="k" class="metric">
        <div class="metric-num">{{ v }}</div>
        <div class="metric-lbl">{{ METRIC_KEYS[k] || k }}</div>
      </div>
    </div>

    <div class="card-tags" style="margin-bottom:var(--sp-8)">
      <span v-for="t in project.techStack" :key="t" class="card-tag">{{ t }}</span>
    </div>

    <div class="section-head">
      <span class="section-label">Deep Dive Cases ({{ project.cases.length }})</span>
      <span class="section-rule" />
    </div>
    <div v-for="(c, i) in project.cases" :key="i" class="card-case" style="margin-bottom:var(--sp-4)">
      <h4>{{ String(i+1).padStart(2,'0') }} · {{ c.title }}</h4>
      <p><span class="card-case-label">背景</span> {{ c.background }}</p>
      <p><span class="card-case-label">决策</span> {{ c.decision }}</p>
      <p><span class="card-case-label">成果</span> {{ c.impact }}</p>
      <div v-if="c.commits.length" class="card-tags" style="margin-top:var(--sp-2)">
        <span v-for="cm in c.commits" :key="cm.slice(0,8)" class="card-tag">{{ cm.slice(0,7) }}</span>
      </div>
    </div>
  </div>
</template>
