<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data } = useResume();
const p = data.personal;
</script>

<template>
  <header class="hero">
    <div class="hero-row">
      <img src="/avatar.jpg" alt="头像" width="72" height="72" class="hero-avatar" />
      <div>
        <h1 class="hero-name">{{ p.name }}</h1>
        <p class="hero-sub">{{ p.title }} · {{ p.location }}</p>
        <div class="hero-meta">
          <span>{{ p.email }}</span>
          <span>{{ p.phone }}</span>
        </div>
      </div>
    </div>
    <div class="hero-meta" style="margin-top:var(--sp-2)">{{ p.education }}</div>
    <p class="hero-summary">{{ p.summary }}</p>
  </header>
</template>
