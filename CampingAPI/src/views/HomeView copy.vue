<template>
  <div class="home">
    <section class="hero">
      <h1>Welcome to Campify!</h1>
      <p>Find and book your favorite camping spots easily</p>
      <router-link to="/booking" class="btn-primary">Book Now</router-link>
    </section>
    <section class="features">
      <div class="feature">
        <h2>Discover Amazing Spots</h2>
        <p>Explore a wide range of camping spots that cater to all your needs.</p>
      </div>
      <div class="feature">
        <h2>Easy Booking</h2>
        <p>Book your favorite spots quickly and easily with our user-friendly interface.</p>
      </div>
      <div class="feature">
        <h2>Manage Your Trips</h2>
        <p>Keep track of all your bookings and plan your trips effortlessly.</p>
      </div>
    </section>
    <Slideshow />
  </div>
</template>

<script>
import Slideshow from '../components/Slideshow.vue';

export default {
  name: 'HomeView',
  components: {
    Slideshow,
  },
};
</script>

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  color: #ffffff;
  padding: 2rem;
  text-align: center;
  background-color: #001f3f; 
}

.hero {
  background: linear-gradient(to right, #0074D9, #001f3f); 
  color: white;
  padding: 4rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #0074D9; /* Electric Blue */
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.btn-primary:hover {
  background-color: white; /* Dark Blue */
  color: black;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 2rem;
}

.feature {
  flex: 1;
  margin: 1rem;
  background: #0074D9; /* Electric Blue Background */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.feature p {
  font-size: 1rem;
  color: #ffffff;
}
</style>
