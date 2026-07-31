<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Project } from '../types/resume';

defineProps<{ project: Project }>();
const expanded = ref(false);
const router = useRouter();

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '-行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};
</script>

<template>
  <article class="card">
    <div class="proj-hdr">
      <h3>{{ project.name }}</h3>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <div v-for="(v, k) in project.metrics" :key="k" style="text-align:center">
          <div class="met-num" style="font-size:1.1rem">{{ v }}</div>
          <div class="met-lbl">{{ METRIC_KEYS[k] || k }}</div>
        </div>
      </div>
    </div>
    <p class="proj-period">{{ project.period }} · {{ project.role }}</p>
    <p class="t2" style="font-size:.85rem;margin-top:.4rem;line-height:1.7">{{ project.summary }}</p>
    <div class="proj-tags">
      <span v-for="t in project.techStack" :key="t" class="proj-tag">{{ t }}</span>
    </div>
    <div class="no-print" style="margin-top:.8rem;display:flex;gap:1rem">
      <a v-if="!expanded" @click="expanded=true" style="font-size:.78rem;cursor:pointer">▸ 展开深度案例 ({{ project.cases.length }})</a>
      <a v-else @click="expanded=false" style="font-size:.78rem;cursor:pointer">▾ 收起</a>
      <a @click="router.push('/project/'+project.id)" style="font-size:.78rem;cursor:pointer">→ 完整项目页</a>
    </div>
    <div v-if="expanded" style="margin-top:.8rem">
      <div v-for="(c, i) in project.cases" :key="i" class="case">
        <h4><span class="case-label">0{{ i+1 }}</span> {{ c.title }}</h4>
        <p><span class="case-label">背景</span> {{ c.background }}</p>
        <p><span class="case-label">决策</span> {{ c.decision }}</p>
        <p><span class="case-label">成果</span> {{ c.impact }}</p>
        <div v-if="c.commits.length" class="proj-tags">
          <span v-for="cm in c.commits" :key="cm.slice(0,8)" class="proj-tag">{{ cm }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
