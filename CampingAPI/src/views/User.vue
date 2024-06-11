<template>
  <div class="user-profile">
    <div class="menu-container">
      <div class="menu">
        <router-link :to="'/user/' + username" class="menu-item"><strong>My Profile</strong></router-link>
        <router-link :to="'/user/' + username + '/spots'" class="menu-item"><strong>My Spots</strong></router-link>
        <router-link :to="'/user/' + username + '/bookings'" class="menu-item"><strong>My Bookings</strong></router-link>
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
  background-color: #001f3f;
}

.menu-container {
  margin-top: 20px; 
}

.menu {
  display: flex;
  position: relative;
  flex-direction: row; 
  width: 125%;
  max-width: 650px; 
  background-color: #001f3f;
  padding: 20px;
  right: 15%;;
  
}

.menu-item {
  flex: 1;
  text-align: center; 
  color: white;
  margin: 0 20px; 
}

.menu-item:last-child {
  margin-right: 0; 
}

.menu-item:hover {
  background-color: white; 
  color: black;
  border-radius: 100px;
}

.content {
  flex: 1;
  padding: 50px;
}
</style>
