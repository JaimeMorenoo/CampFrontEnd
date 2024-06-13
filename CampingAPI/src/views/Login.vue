<template>
  <div class="auth-page">
    <div class="auth">
      <h1 v-if="!showCreateAccountForm">Login</h1>
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
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.auth {
 
  padding: 1rem;
  max-width: 400px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  color: black;
  text-align: center;
  margin-bottom: 150px;

}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: black;
}

input[type="text"],
input[type="password"],
input[type="date"],
input[type="email"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #0074D9;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #005bb5;
}

.create-account-button,
.back-to-login-button {
  background-color: black;
  margin-top: 1rem;
}

.create-account-button:hover,
.back-to-login-button:hover {
  background-color: #333;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
