<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div class="container mx-auto p-6">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">Todo Dashboard</h1>
                    <p class="text-gray-600">Manage your tasks efficiently and stay productive.</p>
                </div>
                <button 
                    @click="logout" 
                    :disabled="isLoggingOut"
                    class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center min-w-[120px]"
                >
                    <span v-if="!isLoggingOut">Logout</span>
                    <span v-else class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging out...
                    </span>
                </button>
            </div>

            <!-- Actions and Filters -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <router-link to="/todos/create" class="d-flex md:col-span-1 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center font-semibold">
                    <svg class="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Create New Todo
                </router-link>

                <div class="md:col-span-2 bg-white rounded-xl shadow-md p-4 border border-gray-200">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Status Filter -->
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Filter by Status</label>
                            <select v-model="filters.status" @change="fetchTodos" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                                <option value="">All Tasks</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <!-- Due Date Filter -->
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Filter by Due Date</label>
                            <input 
                                v-model="filters.due_date" 
                                type="date" 
                                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                @change="fetchTodos"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Todo List -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <TodoList :todos="todos" @delete="deleteTodo" @update="fetchTodos" />
            </div>

            <!-- Pagination -->
            <div v-if="Object.keys(meta).length" class="mt-8 bg-white rounded-xl shadow-md p-4 border border-gray-200 flex justify-between items-center">
                <p class="text-gray-600">Page {{ meta.current_page }} of {{ meta.last_page }} ({{ meta.total }} total tasks)</p>
                <div class="space-x-2">
                    <button v-if="meta.prev_page_url" @click="fetchTodos(meta.current_page - 1)" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 font-semibold shadow-md">
                        Previous
                    </button>
                    <button v-if="meta.next_page_url" @click="fetchTodos(meta.current_page + 1)" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 font-semibold shadow-md">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TodoList from './TodoList.vue';

export default {
    components: { TodoList },
    data() {
        return {
            todos: [],
            filters: { status: '', due_date: '' },
            meta: {},
            isLoggingOut: false,
        };
    },
    mounted() {
        this.fetchTodos();
    },
    methods: {
        async fetchTodos(page = 1) {
            try {
                const response = await this.$axios.get('/todos', {
                    params: { 
                        page, 
                        status: this.filters.status,
                        due_date: this.filters.due_date,
                    },
                });
                this.todos = response.data.data;
                this.meta = response.data;
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        },
        async deleteTodo(id) {
            if (confirm('Are you sure you want to delete this todo?')) {
                try {
                    await this.$axios.delete(`/todos/${id}`);
                    this.fetchTodos(this.meta.current_page);
                } catch (error) {
                    console.error('Failed to delete todo:', error);
                }
            }
        },
        async logout() {
            this.isLoggingOut = true;
            
            try {
                await this.$axios.post('/logout');
                localStorage.removeItem('token');
                delete this.$axios.defaults.headers.common['Authorization'];
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.error('Logout failed:', error);
                alert('Logout failed. Please try again.');
            } finally {
                this.isLoggingOut = false;
            }
        },
    },
};
</script>

<style scoped>
button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
}
.d-flex{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}
</style>