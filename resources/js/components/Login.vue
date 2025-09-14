<template>
  <div class="custom-background flex items-center justify-center p-4">
    <div class="custom-background-login p-8">
      <h1 class="welcome-text">Welcome Back</h1>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="email-text">Email Address</label>
          <div class="mt-1 relative">
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="w-full p-3 text-white placeholder:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out placeholder-white"
              placeholder="Enter your email"
              :disabled="isLoading"
              required
            />
            <svg
              class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>
        <div>
          <label for="password" class="email-text"
            >Password</label
          >
          <div class="mt-1 relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out placeholder-white text-white placeholder:text-white"
              placeholder="Enter your password"
              :disabled="isLoading"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 focus:outline-none"
              :disabled="isLoading"
            >
              <img v-if="showPassword" src="../../../public/images/view.png" />
              <img v-else src="../../../public/images/hide.png" />
            </button>
          </div>
        </div>
        <div
          v-if="error"
          class="text-red-500 text-sm text-center bg-red-100 p-2 rounded-lg"
        >
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="sign-in w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center"
        >
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        </button>
      </form>
      <p class="cs mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link
          to="/register"
          class="cs-2 hover:text-indigo-800 font-medium transition duration-300 ease-in-out"
        >
          Create an Account
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { email: "", password: "" },
      error: null,
      showPassword: false,
      isLoading: false
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await this.$axios.post("/login", this.form);
        localStorage.setItem("token", response.data.token);
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
      } finally {
        this.isLoading = false;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "serenity-extra-light";
  src: url(/fonts/fonnts.com-Serenity_Extra_Light.otf);
}
@font-face {
  font-family: "serenity-light";
  src: url(/fonts/fonnts.com-Serenity_Light.otf);
}
@font-face {
  font-family: "serenity-bold-italic";
  src: url(/fonts/fonnts.com-Serenity_Bold_Italic.otf);
}
@font-face {
  font-family: "serenity-thin-italic";
  src: url(/fonts/fonnts.com-Serenity_Thin_Italic.otf);
}
@font-face {
  font-family: "warnock-pro-semibold-italic";
  src: url(/fonts/fonnts.com-Warnock-Pro-Subhead-.otf);
}
@font-face {
  font-family: "serenity-bold";
  src: url(/fonts/fonnts.com-Serenity_Bold.otf);
}
@font-face {
  font-family: "serenity-medium";
  src: url(/fonts/fonnts.com-Serenity_Medium.otf);
}
.custom-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100vh;
}
.custom-background-login {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  width: 40%;
}
.welcome-text {
  font-size: 40px;
  text-align: center;
  font-family: "warnock-pro-semibold-italic";
  color: aliceblue;
}
.email-text {
  text-align: center;
  font-family: "serenity-light";
  color: aliceblue;
}
.cs{
  text-align: center;
  font-family: "serenity-extra-light";
  color: aliceblue; 
  font-size: 17px;
}
.cs-2{
  text-align: center;
  font-family: "serenity-extra-light";
  padding-left: 4px !important;
  color: #004a64;
}
.sign-in{
  background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
}
.sign-in:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
</style>