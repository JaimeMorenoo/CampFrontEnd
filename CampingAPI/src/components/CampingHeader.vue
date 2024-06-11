<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">Campify</router-link>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-link"><strong>Home</strong></router-link>
      <router-link to="/booking" class="nav-link"><strong>Booking</strong></router-link>
      <button v-if="authState.isLoggedIn" @click="goToUserProfile" class="nav-link user-button"><strong>{{ authState.username }}</strong></button>
      <button v-if="authState.isLoggedIn" @click="handleLogout" class="logout-button"><strong>Logout</strong></button> <!-- This 2 will only show if logged in-->
      <router-link v-else to="/login" class="nav-link"><strong>Login</strong></router-link>
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
  background-color: white; /* Electric Blue */
  padding: 1rem 2rem;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logo a {
  text-decoration: none;
  color: black;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: black; 
  color: white;
}

.user-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.user-button:hover {
  background-color: black; 
  color: white;
}
.logout-button:hover {
  background-color: black; 
  color: white;
}

.logout-button {
  background-color: transparent;
  border: 5px;
  cursor: pointer;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 1rem;
}
</style>
