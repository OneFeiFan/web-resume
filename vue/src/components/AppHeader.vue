<script setup lang="ts">
import { useResume } from '../composables/useResume';
const { data } = useResume();
const p = data.personal;
</script>

<template>
  <header style="margin-bottom:3rem">
    <div style="display:flex;align-items:flex-start;gap:1.5rem;margin-bottom:1rem">
      <img src="/avatar.jpg" alt="头像" width="80" height="80"
        style="width:80px;height:80px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid var(--c-border);image-rendering:-webkit-optimize-contrast" />
      <div>
        <h1 style="color:var(--c-primary)">{{ p.name }}</h1>
        <p class="t3" style="font-size:1rem;margin-top:.3rem">{{ p.title }} · {{ p.location }}</p>
      </div>
    </div>
    <p class="t3" style="font-size:.82rem;margin-top:.5rem;font-family:'JetBrains Mono',monospace">{{ p.email }} · {{ p.phone }}</p>
    <p class="t3" style="font-size:.82rem;margin-top:0">{{ p.education }}</p>
    <p class="summary" style="margin-top:1.2rem">{{ p.summary }}</p>
  </header>
</template>
