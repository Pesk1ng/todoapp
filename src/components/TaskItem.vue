<template>

    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-4">Liste des Tâches</h2>

            <div v-if="!todoStore.tasks?.length" class="text-center text-gray-500">Aucune tâche disponible</div>

            <ul class="space-y-4">
                <li v-for="task in todoStore.tasks" :key="task.id"
                    class="p-4 border rounded-lg shadow-md flex justify-between items-center"
                    :class="{ 'bg-green-100': task.completed }">
                    <div class="">
                        <h3 class="text-lg font-semibold">{{ task.title }}</h3>
                        <p class="text-gray-600 truncate">{{ task.description || 'Pas de description' }}</p>
                        <p class="text-sm text-gray-500">Ajouté le : {{ formatDate(task.created_at) }}</p>
                    </div>

                    <div class="flex gap-2">
                        <button @click="toggleTask(task.id)" class="px-4 py-1 text-white rounded transition"
                            :class="task.completed ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
                            :disabled="task.completed">
                            ✅ Terminer
                        </button>
                        <button @click="deleteTask(task.id)"
                            class="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                            ❌ Supprimer
                        </button>
                    </div>
                </li>
            </ul>
        </div>


    </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { useTodoStore } from '../store/todoStore';
import toastr from 'toastr';
const todoStore = useTodoStore();

const formatDate = (date) => new Date(date).toLocaleString();

onMounted(() => {
    todoStore.fetchTasks();
});



const toggleTask = async (id) => {
    // console.log(task)
    await todoStore.toggleTask(id, true);
    setTimeout(() => {
        toastr.success("Tâche terminée avec succès", "Success");
    }, 500);
};

const deleteTask = async (id) => {
    await todoStore.deleteTask(id);
    setTimeout(() => {
        toastr.success("Tâche supprimée avec succès", "Success");
    }, 500);
};
</script>