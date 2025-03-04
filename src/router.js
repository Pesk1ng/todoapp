import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForms from "@/components/RegisterForms.vue";
import TaskItem from "./components/TaskItem.vue";
import AddTask from "./components/AddTask.vue";
//import { useAuthStore } from "./store/authStore";

const routes = [
    {path: '/', name: 'Home', component: TaskItem, meta: {requiresAuth:true}},
    {path: '/tasks', name: 'TaskItem', component: TaskItem, meta: {requiresAuth:true}},
    {path: '/tasks/add', name: 'AddTask', component: AddTask, meta: {requiresAuth:true}},
    {path: '/register', name: 'Register', component: RegisterForms},
    {path: '/login', name: 'Login', component: LoginForm},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to,from,next) => {
    const isAuthentificated = localStorage.getItem('accessToken');
    // const authStore = useAuthStore();

    // if(to.meta.requiresAuth && !isAuthentificated){
    //     next('/login');
    // }
    // else{
    //     next();
    // }

    if (to.meta.requiresAuth && !isAuthentificated) {
        next('/login')
    } else if (to.meta.requiresGuest && isAuthentificated) {
        next('/')
    } else {
        next()
    }



})

export default router;
