<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Ongoing Tasks</h2>
      <div v-if="ongoingTasks.length">
        <TaskItem
          v-for="task in ongoingTasks"
          :key="task.id"
          :task="task"
          @toggle-status="toggleStatus"
        />
      </div>
      <p v-else class="text-gray-600">No ongoing tasks.</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTaskStore } from '../store/taskStore';
  import TaskItem from './TaskItem.vue';
  
  const taskStore = useTaskStore();
  const ongoingTasks = computed(() => taskStore.ongoingTasks);
  
  const toggleStatus = (task) => {
    taskStore.toggleStatus(task);
  };
  </script>
  
  <style scoped>
  </style>