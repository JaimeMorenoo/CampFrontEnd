<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">Camping App</router-link>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/booking" class="nav-link">Booking</router-link>
      <button v-if="authState.isLoggedIn" @click="goToUserProfile" class="nav-link user-button">{{ authState.username }}</button>
      <button v-if="authState.isLoggedIn" @click="handleLogout" class="logout-button">Logout</button> <!-- This 2 will only show if logged in-->
      <router-link v-else to="/login" class="nav-link">Login</router-link>
    </nav>
  </header>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authState = inject('authState');

const handleLogout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  authState.isLoggedIn = false;
  authState.username = '';
  router.push('/login');
};

const goToUserProfile = () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    router.push(`/user/${userId}`);
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FC522E;
  padding: 1rem 2rem;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logo a {
  text-decoration: none;
  color: white;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.user-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-button {
  background-color: transparent;
  border: 5px;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1rem;
}
</style>
