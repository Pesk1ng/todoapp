import { defineStore } from 'pinia';
import { supabase } from './supabase';
import { useRouter } from 'vue-router';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      const user = (await supabase.auth.getUser()).data?.user;
      if(!user || !user.id){
        useRouter().push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      this.tasks = data;
    },

    async addTask(title,description) {
      const user = (await supabase.auth.getUser()).data?.user;
      if(!user || !user.id){
        useRouter().push('/login');
        return;
      }

      const task = {
        title: title, 
        user_id: user.id,
        completed: false,
        description: description,
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .select();

      if (error) throw error;
      this.tasks.unshift(data[0]);
    },

    async toggleTask(id, completed) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id)
        .select();
        console.log(data);  
      if (error) throw error;
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) this.tasks[index].completed = completed;
    },

    async deleteTask(id) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }
});
