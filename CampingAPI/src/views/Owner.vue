<template>
    <div class="owner">
      <h1>Owner Page</h1>
      <!-- Owner-specific functionality go here -->
    </div>
    <UserProfile :user="user" />
  </template>
  
  <style scoped>
  .owner {
    padding: 2rem;
  }
  </style>


<script setup>
import UserProfile from '../components/UserProfile.vue'; // Import the UserProfile component

import { useRoute } from 'vue-router';

const route = useRoute();
const username = route.params.username;
</script>