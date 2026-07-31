<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useResume } from '../composables/useResume';

const route = useRoute();
const router = useRouter();
const { getProjectById } = useResume();
const project = computed(() => getProjectById(route.params.id as string));

const METRIC_KEYS: Record<string, string> = {
  commits: '提交', insertions: '+行', deletions: '-行', files: '文件',
  domains: '业务域', total_repo_commits: '总提交', contribution: '贡献占比', team_size: '团队',
};
</script>

<template>
  <div v-if="!project" style="text-align:center;padding:4rem 0">
    <p class="t3">项目未找到</p>
    <a @click="router.push('/')" class="chip" style="margin-top:.5rem;display:inline-flex;cursor:pointer">← 返回首页</a>
  </div>
  <div v-else>
    <a @click="router.push('/')" style="font-size:.78rem;display:inline-block;margin-bottom:2rem;cursor:pointer">← 返回首页</a>
    <h1 style="color:var(--c-primary)">{{ project.name }}</h1>
    <p class="proj-period" style="margin-top:.3rem">{{ project.period }} · {{ project.role }}</p>
    <p class="t2" style="font-size:.85rem;margin-top:.8rem;margin-bottom:1.5rem;line-height:1.7">{{ project.summary }}</p>

    <div class="mets" style="margin-bottom:2rem">
      <div v-for="(v, k) in project.metrics" :key="k" style="text-align:center;background:var(--c-muted);border-radius:6px;padding:.8rem">
        <div class="met-num">{{ v }}</div>
        <div class="met-lbl">{{ METRIC_KEYS[k] || k }}</div>
      </div>
    </div>

    <div class="proj-tags" style="margin-bottom:2rem">
      <span v-for="t in project.techStack" :key="t" class="proj-tag">{{ t }}</span>
    </div>

    <div class="sec"><h2>Deep Dive Cases ({{ project.cases.length }})</h2></div>
    <div v-for="(c, i) in project.cases" :key="i" class="adr">
      <h3><span class="adr-num">0{{ i+1 }}</span> {{ c.title }}</h3>
      <p style="margin-top:.5rem"><span class="case-label">背景</span> {{ c.background }}</p>
      <p><span class="case-label">决策</span> {{ c.decision }}</p>
      <p><span class="case-label">成果</span> {{ c.impact }}</p>
      <div v-if="c.commits.length" class="proj-tags" style="margin-top:.5rem">
        <span v-for="cm in c.commits" :key="cm.slice(0,8)" class="proj-tag">{{ cm }}</span>
      </div>
    </div>
  </div>
</template>
