<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100"
  >
    <div class="container mx-auto p-6">
      <!-- Header -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8"
      >
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-4xl font-bold text-gray-800">
            {{ isEdit ? "Edit Todo" : "Create Todo" }}
          </h1>
          <router-link
            to="/"
            class="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
          >
            ← Back to Dashboard
          </router-link>
        </div>
        <p class="text-gray-600">
          {{
            isEdit
              ? "Update your existing task details."
              : "Add a new task to your list."
          }}
        </p>
      </div>

      <!-- Form Card -->
      <div
        class="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-w-2xl mx-auto"
      >
        <form @submit.prevent="submit" class="space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="Enter a clear and concise title for your task"
              required
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Description</label
            >
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Provide more details about this task..."
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              v-model="form.status"
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <!-- Due Date -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Due Date</label
            >
            <input
              v-model="form.due_date"
              type="date"
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"
          >
            {{ error }}
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4 pt-4">
            <router-link
              to="/"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              {{ isEdit ? "Update Todo" : "Create Todo" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { title: "", description: "", status: "pending", due_date: null },
      error: null,
      isEdit: false,
    };
  },
  mounted() {
    if (this.$route.name === "todo.edit") {
      this.isEdit = true;
      this.fetchTodo();
    }
  },
  methods: {
    async fetchTodo() {
      try {
        const response = await this.$axios.get(
          `/todos/${this.$route.params.id}`
        );
        this.form = {
      ...response.data,
      due_date: response.data.due_date ? response.data.due_date.split('T')[0] : ''
    };
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to load todo";
      }
    },
    async submit() {
      try {
        const url = this.isEdit ? `/todos/${this.$route.params.id}` : "/todos";
        const method = this.isEdit ? "put" : "post";
        await this.$axios[method](url, this.form);
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to save todo";
      }
    },
  },
};
</script>