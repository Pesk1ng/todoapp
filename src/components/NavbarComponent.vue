<template>

  <nav class="bg-gray-800">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 text-white items-center font-bold text-xl">
            <img class="h-8 w-auto mr-2" src="">
              Gestionnaire des tâches

          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link to="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page" v-if="authStore.access_token">Accueil</router-link>
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link to="/tasks/add" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                aria-current="page"  v-if="authStore.access_token">Ajouter une tâche</router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          

          <button type="button" @click="signOut" v-if="authStore.access_token"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
            Deconnexion
          </button>

          <button type="button" @click="route.push('/login')" v-if="!authStore.access_token"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
            Se connecter
          </button>


        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link to="/" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"  v-if="access_token">Accueil</router-link>
        <router-link to="/tasks/add" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"  v-if="access_token">Ajouter une tâche</router-link>
        <!-- 
        <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page">Dashboard</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
        <a href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
          -->
      </div>
    </div>
  </nav>


</template>

<script setup>
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const route = useRouter();
const authStore = useAuthStore();
const access_token = localStorage.getItem('accessToken');

const signOut = async () => {
  await authStore.signOut();
  route.push('/login');
};


</script>