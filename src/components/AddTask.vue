<template>
    <div class="add-task max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">📌 Ajouter une nouvelle tâche</h2>

        <form @submit.prevent="addTask" class="space-y-4">
            <!-- Title Input -->
            <div>
                <label for="title" class="block text-gray-700 font-medium">Titre</label>
                <input v-model="title" id="title" type="text"
                    class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
                    placeholder="Enter task title..."  />
            </div>

            <!-- Description Input -->
            <div>
                <label for="description" class="block text-gray-700 font-medium">Description</label>
                <textarea v-model="description" id="description"
                    class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
                    placeholder="Enter task description..." ></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                ➕ Ajouter une tâche
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/store/todoStore';
import { useRouter } from 'vue-router';
import toastr from 'toastr';

const todoStore = useTodoStore();
const title = ref('');
const description = ref('');
const router = useRouter();

const addTask = async () => {
    if (title.value && description.value) {
        await todoStore.addTask(title.value, description.value);

        setTimeout(() => {
            toastr.success("Tâche ajoutée avec succès!", "Success");
            title.value = '';
            description.value = '';
            router.push('/');
        }, 500);
    }else{
        toastr.error("Veuillez remplir tous les champs", "Erreur");
    }
};
</script>

<style scoped>
.add-task {
    @apply border border-gray-200;
}
</style>