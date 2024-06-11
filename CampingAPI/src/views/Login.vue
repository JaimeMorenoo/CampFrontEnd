<template>
  <div class="auth">
    <h1 v-if="!showCreateAccountForm"></h1>
    <h1 v-else>Create Account</h1>
    <form v-if="!showCreateAccountForm" @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <button type="button" @click="toggleCreateAccountForm" class="create-account-button">Create Account</button>
    </form>
    <form v-else @submit.prevent="createAccount">
      <div class="form-group">
        <label for="new-username">Username</label>
        <input type="text" id="new-username" v-model="newUser.username" required />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newUser.name" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="newUser.lastName" required />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input type="date" id="dob" v-model="newUser.dob" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="newUser.email" required />
      </div>
      <div class="form-group">
        <label for="new-password">Password</label>
        <input type="password" id="new-password" v-model="newUser.password" required />
      </div>
      <button type="submit">Create Account</button>
      <button type="button" @click="toggleCreateAccountForm" class="back-to-login-button">Back to Login</button>
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
const showCreateAccountForm = ref(false);
const newUser = ref({
  username: '',
  name: '',
  lastName: '',
  dob: '',
  password: '',
  email: ''
});

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
    authState.isLoggedIn = true;
    authState.username = user;
    router.push(`/user/${userId}`);
  } catch (err) {
    error.value = 'Invalid username or password';
  }
};

const toggleCreateAccountForm = () => {
  showCreateAccountForm.value = !showCreateAccountForm.value;
};

const createAccount = async () => {
  try {
    await axios.post('https://localhost:7044/User/create', {
      userId: 0,
      username: newUser.value.username,
      name: newUser.value.name,
      lastName: newUser.value.lastName,
      dob: newUser.value.dob,
      password: newUser.value.password,
      email: newUser.value.email
    });
    alert('Account created successfully!');
    showCreateAccountForm.value = false;
  } catch (err) {
    alert('Error creating account');
  }
};
</script>

<style scoped>
.auth {
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  width: 100vw;
  height: 100vh;
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
input[type="password"],
input[type="date"],
input[type="email"] {
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
  background-color: #0074D9;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
}

.error-message {
  color: red;
  text-align: center;
}

.create-account-button {
  background-color: black;
  margin-top: 1rem;
}

.back-to-login-button {
  background-color: black;
  margin-top: 1rem;
}


</style>
