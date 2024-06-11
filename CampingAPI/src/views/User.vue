<template>
  <div class="user-profile">
    <div class="menu-container">
      <div class="menu">
        <router-link :to="'/user/' + username" class="menu-item">My Profile</router-link>
        <router-link :to="'/user/' + username + '/spots'" class="menu-item">My Spots</router-link>
        <router-link :to="'/user/' + username + '/bookings'" class="menu-item">My Bookings</router-link>
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
  align-items: center; /* Center horizontally */
  align-content: center;
}

.menu-container {
  margin-top: 20px; /* Adjust spacing */
}

.menu {
  display: flex;
  flex-direction: row; /* Display menu items side by side */
  width: 115%; /* Expand to fill available space */
  max-width: 650px; /* Limit maximum width */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-item {
  flex: 1; /* Distribute space evenly */
  text-align: center; /* Center text horizontally */
  text-decoration: none;
  color: #333;
  margin: 0 10px; /* Adjust spacing between items */
  transition: color 0.3s;
}

.menu-item:last-child {
  margin-right: 0; /* Remove margin from the last item */
}

.menu-item:hover {
  color: #555;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
