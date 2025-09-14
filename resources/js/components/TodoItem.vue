<template>
    <div class="border-l-4 border-blue-500 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800 mb-2">{{ todo.title }}</h3>
                <p v-if="todo.description" class="text-gray-600 mb-3 line-clamp-2">{{ todo.description }}</p>
                
                <!-- Status Badge -->
                <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2">
                    <div :class="statusColor" class="w-2 h-2 rounded-full mr-2"></div>
                    {{ formatStatus(todo.status) }}
                </div>

                <!-- Due Date -->
                <p v-if="todo.due_date" class="text-sm text-gray-500">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {{ new Date(todo.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}
                </p>
            </div>
            
            <!-- Actions -->
            <div class="flex space-x-3 ml-4">
                <router-link 
                    :to="{ name: 'todo.edit', params: { id: todo.id } }" 
                    class="p-2 text-blue-500 hover:text-blue-700 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                    title="Edit Todo"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </router-link>
                <button 
                    @click="$emit('delete', todo.id)" 
                    class="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-lg hover:bg-red-50"
                    title="Delete Todo"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    computed: {
        statusColor() {
            const colors = {
                pending: 'bg-yellow-500',
                'in-progress': 'bg-blue-500',
                completed: 'bg-green-500',
            };
            return colors[this.todo.status] || 'bg-gray-500';
        },
    },
    methods: {
        formatStatus(status) {
            const formats = {
                pending: 'Pending',
                'in-progress': 'In Progress',
                completed: 'Completed',
            };
            return formats[status] || status;
        },
    },
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>