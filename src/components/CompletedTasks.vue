<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Completed Tasks</h2>
      <div v-if="completedTasks.length">
        <TaskItem
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
          @toggle-status="toggleStatus"
        />
      </div>
      <p v-else class="text-gray-600">No completed tasks.</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTaskStore } from '../store/taskStore';
  import TaskItem from './TaskItem.vue';
  
  const taskStore = useTaskStore();
  const completedTasks = computed(() => taskStore.completedTasks);
  
  const toggleStatus = (task) => {
    taskStore.toggleStatus(task);
  };
  </script>
  
  <style scoped>
  </style>