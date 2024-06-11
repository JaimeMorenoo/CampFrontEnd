<!-- src/components/CreateAccountForm.vue -->
<template>
    <form @submit.prevent="createAccount">
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
      <button type="button" @click="$emit('toggleCreateAccountForm')" class="back-to-login-button">Back to Login</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const newUser = ref({
    username: '',
    name: '',
    lastName: '',
    dob: '',
    password: '',
    email: ''
  });
  
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
      toggleCreateAccountForm();
    } catch (err) {
      alert('Error creating account');
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="date"],
  input[type="email"],
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
    margin-top: 1rem;
  }
  
  .back-to-login-button {
    background-color: #007bff;
    margin-top: 1rem;
  }
  </style>
  