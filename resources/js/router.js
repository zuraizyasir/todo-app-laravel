import { createRouter, createWebHistory } from 'vue-router';
import Login from '../js/components/Login.vue';
import Register from '../js/components/Register.vue';
import Dashboard from '../js/components/Dashboard.vue';
import TodoForm from '../js/components/TodoForm.vue';

const routes = [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    {
        path: '/',
        component: Dashboard,
        name: 'dashboard',
        meta: { requiresAuth: true },
    },
    {
        path: '/todos/create',
        component: TodoForm,
        name: 'todo.create',
        meta: { requiresAuth: true },
    },
    {
        path: '/todos/:id/edit',
        component: TodoForm,
        name: 'todo.edit',
        meta: { requiresAuth: true },
    },
    { path: '/', redirect: '/login' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        return next({ name: 'login' });
    }
    next();
});

export default router;