<template>
  <div class="user-profile">
    <div class="menu-container">
      <div class="menu">
        <router-link :to="'/user/' + username" class="menu-item"><strong>Profile</strong></router-link>
        <router-link :to="'/user/' + username + '/spots'" class="menu-item"><strong>Spots</strong></router-link>
        <router-link :to="'/user/' + username + '/bookings'" class="menu-item"><strong>Bookings</strong></router-link>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const username = route.params.username;
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center; 
  align-content: center;
  min-height: 100vh;
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  color: white;
  padding-top: 20px;
  box-sizing: border-box;
}

.menu-container {
  margin-top: 20px;
  width: 100%;
  display:grid;
  justify-content: center;
}

.menu {
  display: flex;
  flex-direction: row;
  padding: 2px 20px;
  border-radius: 10px;
}

.menu-item {
  flex: 1;
  text-align: center;
  color: black;
  margin: 0 10px;
  padding: 10px;
}

.menu-item:last-child {
  margin-right: 0;
}

.menu-item:hover {
  transform: scale(1.05);
}

.content {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  margin-top: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
