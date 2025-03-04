<template>
  
  <NavbarComponent />
  <ProgressBar />
  <router-view />
</template>

<script setup>
  import { provide, onMounted } from 'vue';
  import NavbarComponent from './components/NavbarComponent.vue';
  import { useRouter } from 'vue-router';
  import ProgressBar from './components/ProgressBar.vue';
  import { useAuthStore } from './store/authStore';
  const router = useRouter();
  provide('router', router);

  const authStore = useAuthStore();
  // Vérification de l'authentification
  onMounted(async () => {
    // Vous devrez adapter cette fonction selon votre système d'authentification
    const isAuthenticated = await authStore.checkAuthStatus(); // À implémenter selon votre système
    console.log(isAuthenticated);
    const publicRoutes = ['/login', '/register']; // Ajoutez ici vos routes publiques
    
    if (!isAuthenticated && !publicRoutes.includes(router.currentRoute.value.path)) {
      router.push('/login');
    }
  });

  // function checkAuthStatus() {
  //   // Exemple de vérification - à adapter selon votre système
  //   const token = localStorage.getItem('auth_token');
  //   return !!token;
  // }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
