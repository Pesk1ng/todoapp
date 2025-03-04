import { defineStore } from 'pinia';
import { supabase } from './supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    access_token: null
  }),
  
  actions: {
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Erreur lors de l'inscription:", error.message);
        throw error;
      }
      this.user = data.user;
      this.access_token = data.session.access_token;
      localStorage.setItem('accessToken', this.access_token);
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log(data);
      this.user = data.user;
      this.access_token = data.session.access_token;
      localStorage.setItem('accessToken', this.access_token);
    },

    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
      this.access_token = null;
      localStorage.removeItem('accessToken');
      window.location.reload();
    },

    async checkAuthStatus() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          this.user = session.user;
          this.access_token = session.access_token;
          localStorage.setItem('accessToken', this.access_token);
          return true;
        }
        this.user = null;
        this.access_token = null;
        localStorage.removeItem('accessToken');
        return false;
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error.message);
        this.user = null;
        this.access_token = null;
        localStorage.removeItem('accessToken');
        return false;
      }
    },

    async fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      this.user = user;
      this.access_token = localStorage.getItem('accessToken');
    }
  }
});
