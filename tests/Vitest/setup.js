import { config } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

// Mock Vue Router with all routes
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: { template: '<div>Mock Dashboard</div>' } },
        { path: '/login', name: 'login', component: { template: '<div>Mock Login</div>' } },
        { path: '/register', name: 'register', component: { template: '<div>Mock Register</div>' } },
        { path: '/todos/create', name: 'todo.create', component: { template: '<div>Mock Create Todo</div>' } },
        { path: '/todos/:id/edit', name: 'todo.edit', component: { template: '<div>Mock Edit Todo</div>' } },
    ],
});

// Apply router globally
config.global.plugins = [router];