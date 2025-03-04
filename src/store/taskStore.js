import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from './supabase';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      tasks.value = data;
    }
  };

  const ongoingTasks = computed(() => tasks.value.filter(task => task.status === 'ongoing'));
  const completedTasks = computed(() => tasks.value.filter(task => task.status === 'completed'));

  const toggleStatus = async (task) => {
    const updatedStatus = task.status === 'ongoing' ? 'completed' : 'ongoing';
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: updatedStatus })
      .eq('id', task.id);
      console.log(data);
    if (error) {
      console.error('Error updating task status:', error);
    } else {
      const taskToUpdate = tasks.value.find(t => t.id === task.id);
      if (taskToUpdate) {
        taskToUpdate.status = updatedStatus;
      }
    }
  };

  return {
    tasks,
    ongoingTasks,
    completedTasks,
    fetchTasks,
    toggleStatus
  };
});