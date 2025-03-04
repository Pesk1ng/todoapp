<template>
    <div class="h-1 bg-blue-500 transition-all" :style="{ width: progress + '%' }"></div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const progress = ref(0);
  
  watch(route, () => {
    progress.value = 0;
    let interval = setInterval(() => {
      if (progress.value >= 100) {
        clearInterval(interval);
      } else {
        progress.value += 5;
      }
    }, 50);
  });
  </script>
  