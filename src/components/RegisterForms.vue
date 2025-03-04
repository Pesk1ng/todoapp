<template>

  <div class="max-w-md lg:mt-40 sm:mt-20 md:mt-20  mx-auto p-6 bg-blue-100 rounded shadow-md">
    <h2 class="text-2xl font-bold mb-4">Inscription</h2>
    <form @submit.prevent="signUp">

      <label class="block mb-2">Email:</label>
      <input v-model="email" type="email" class="border p-2 w-full rounded mb-4" required />

      <label class="block mb-2">Mot de passe:</label>
      <input v-model="password" type="password" class="border p-2 w-full rounded mb-4" required />

      <div v-if="successMsg" class="mb-4 p-2 bg-green-100 text-green-700 rounded">
        {{ successMsg }}
      </div>

      <div v-if="errorMsg" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
        {{ errorMsg }}
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded" :disabled="isLoading">
        <span v-if="isLoading">Création du compte en cours...</span>
        <span v-else>S'inscrire</span>
      </button>
      <p>Already have an account ? <router-link to="/login" class="text-green-500">Login</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');
const isLoading = ref(false);
const router = useRouter();

const signUp = async () => {
  try {
    isLoading.value = true;
    await authStore.signUp(email.value, password.value);
    errorMsg.value = '';
    successMsg.value = 'Votre compte a été créé avec succès! Veuillez vérifier votre email pour confirmer votre inscription.';
    setTimeout(() => {
      router.push('/');
    }, 3000);
  } catch (error) {
    if (error.message.includes('User already registered')) {
      errorMsg.value = 'Un compte existe déjà avec cette adresse email. Veuillez vous connecter.';
    } else {
      errorMsg.value = error.message;
    }
    successMsg.value = '';
  } finally {
    isLoading.value = false;
  }
};

</script>