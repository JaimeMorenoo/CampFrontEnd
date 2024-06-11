<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const authState = inject('authState');
const username = ref('');
const password = ref('');
const error = ref('');

const login = async () => {
  try {
    const response = await axios.post('https://localhost:7044/Auth/login', {
      username: username.value,
      password: password.value
    });
    const { username: user, userId, token } = response.data;
    localStorage.setItem('username', user);
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    authState.isLoggedIn = true;  // Here we change the authstate to true so it will re render the page with the new changes!
    authState.username = user;
    router.push(`/user/${userId}`);
  } catch (err) {
    error.value = 'Invalid username or password';
  }
};
</script>

<style scoped>
.login {
  padding: 2rem;
  max-width: 400px;
  margin: auto;
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #FC522E;
  color: white;
  cursor: pointer;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
