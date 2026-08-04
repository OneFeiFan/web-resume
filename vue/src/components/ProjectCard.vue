<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Project } from '../types/resume';

const props = defineProps<{ project: Project }>();
const expanded = ref(false);
const router = useRouter();

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '−行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};
</script>

<template>
  <article class="card">
    <div class="card-header">
      <h3>{{ project.name }}</h3>
      <div class="card-mini-metrics">
        <div v-for="(v, k) in project.metrics" :key="k" class="card-mini-metric">
          <div class="card-mini-num">{{ v }}</div>
          <div class="card-mini-lbl">{{ METRIC_KEYS[k] || k }}</div>
        </div>
      </div>
    </div>
    <p class="card-period" style="margin-top:0.3rem">{{ project.period }} · {{ project.role }}</p>
    <p class="card-desc">{{ project.summary }}</p>
    <div class="card-tags">
      <span v-for="t in project.techStack" :key="t" class="card-tag">{{ t }}</span>
    </div>
    <div class="card-actions no-print">
      <span v-if="!expanded" class="card-action" @click="expanded=true">展开案例 ({{ project.cases.length }})</span>
      <span v-else class="card-action" @click="expanded=false">收起</span>
      <span class="card-action" @click="router.push('/project/'+project.id)">完整项目页 →</span>
    </div>
    <div v-if="expanded">
      <div v-for="(c, i) in project.cases" :key="i" class="card-case">
        <h4>{{ String(i+1).padStart(2,'0') }} · {{ c.title }}</h4>
        <p><span class="card-case-label">背景</span> {{ c.background }}</p>
        <p><span class="card-case-label">决策</span> {{ c.decision }}</p>
        <p><span class="card-case-label">成果</span> {{ c.impact }}</p>
        <div v-if="c.commits.length" class="card-tags" style="margin-top:0.4rem">
          <span v-for="cm in c.commits" :key="cm.slice(0,8)" class="card-tag">{{ cm.slice(0,7) }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
