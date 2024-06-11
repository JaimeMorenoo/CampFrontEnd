<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { reactive, provide } from 'vue'
import CampingHeader from "./components/CampingHeader.vue"
import Footer from "./components/Footer.vue"
import Carousel from '@chenfengyuan/vue-carousel';

const authState = reactive({
  isLoggedIn: false,
  username: ''
});

provide('authState', authState);

const checkAuthStatus = () => {
  const storedUserId = localStorage.getItem('userId');
  const storedUsername = localStorage.getItem('username');
  if (storedUserId && storedUsername) {       
    authState.isLoggedIn = true;
    authState.username = storedUsername;    // WE ARE PROVIDING A GLOBAL REACTIVE AUTHSTATE FOR LATER 
  } else {
    authState.isLoggedIn = false;
    authState.username = '';
  }
};

checkAuthStatus();
</script>

<template>
  <CampingHeader />
  <Footer /> 
  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
