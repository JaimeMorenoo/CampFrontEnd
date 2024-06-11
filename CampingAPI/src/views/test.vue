<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login" v-if="!showRegisterForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
  
      <div v-if="showRegisterForm" class="register-form">
        <h1>Create Account</h1>
        <form @submit.prevent="createAccount">
          <div class="form-group">
            <label for="newUsername">Username</label>
            <input type="text" id="newUsername" v-model="newUser.username" required />
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
            <label for="newPassword">Password</label>
            <input type="password" id="newPassword" v-model="newUser.password" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="newUser.email" required />
          </div>
          <button type="submit">Create Account</button>
          <button type="button" @click="showRegisterForm = false">Cancel</button>
        </form>
      </div>
  
      <div v-if="!showRegisterForm" class="register">
        <p>Don't have an account?</p>
        <button @click="showRegisterForm = true">Create New Account</button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showRegisterForm: false,
      newUser: {
        username: '',
        name: '',
        lastName: '',
        dob: '',
        password: '',
        email: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://localhost:7044/Auth/login', {
          username: this.username,
          password: this.password
        });
        const { username, userId, token } = response.data;
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        authState.isLoggedIn = true;  // Here we change the authstate to true so it will re render the page with the new changes!
        authState.username = user;
        this.$router.push('/user/' + userId);
      } catch (error) {
        this.error = 'Invalid username or password';
      }
    },
    async createAccount() {
      try {
        await axios.post('https://localhost:7044/User/create', this.newUser);
        alert('Account created successfully!');
        this.showRegisterForm = false;
        this.newUser = {
          username: '',
          name: '',
          lastName: '',
          dob: '',
          password: '',
          email: ''
        };
      } catch (error) {
        console.error('Error creating account:', error);
        alert('Error creating account.');
      }
    }
  }
};
</script>
<style scoped>
.login {
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="password"],
input[type="email"],
input[type="date"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
  font-size: 1rem;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #e04b29;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 1rem;
}

.register {
  text-align: center;
  margin-top: 1rem;
}

.register button {
  background-color: #3498db;
  margin-top: 0.5rem;
}

.register button:hover {
  background-color: #2980b9;
}

.register-form {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}
</style>
