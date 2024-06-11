<template>
  <div class="booking-spot">
    <div class="spot-images">
      <swiper :autoplay="true" :loop="true" :pagination="{ clickable: true }" class="swiper-images">
        <swiper-slide v-for="(image, imgIndex) in getSpotImage(spot.id)" :key="imgIndex">
          <img :src="image" alt="Spot Image" class="spot-image" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="spot-details">
      <h2>{{ spot.name }}</h2>
      <p>{{ spot.description }}</p>
      <p><strong>Price Per Night:</strong> ${{ spot.pricePerNight }}</p>
      <p>Stay in <strong>{{ spot.location }}!</strong></p>
      <div class="booking-form">
        <label for="check-in-date">Check-in Date:</label>
        <input type="date" v-model="checkInDate" required />

        <label for="check-out-date">Check-out Date:</label>
        <input type="date" v-model="checkOutDate" required />

        <p v-if="totalCost !== null"><strong>Total Cost:</strong> ${{ totalCost }}</p>

        <button @click="bookSpot">Book Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'; 
import 'swiper/swiper-bundle.css'; 
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'BookingSpot',
  components: {
    Swiper, 
    SwiperSlide, 
  },
  props: {
    spot: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
    };
  },
  computed: {
    totalCost() {
      if (this.checkInDate && this.checkOutDate) {
        const checkIn = new Date(this.checkInDate);
        const checkOut = new Date(this.checkOutDate);
        const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        if (days > 0) {
          return days * this.spot.pricePerNight;
        }
      }
      return null;
    },
  },
  methods: {
    getSpotImage(spotID) {
      const images = [];
      if (spotID < 7) {
        for (let i = 1; i <= 4; i++) {
          images.push(`/src/assets/spots/${spotID}/${i}.jpg`);
        }
      } else {
        images.push('/src/assets/spots/1/1.jpg');
      }
      return images;
    },
    async bookSpot() {
      const userId = localStorage.getItem('userId'); // USERID IN LOCAL STORAGE
      if (!userId) {
        alert('Please log in to book a spot.');
        this.$router.push('/login'); // CHEACK IF USER IS LOGGED
        return;
      }
      try {
        const response = await axios.post(`https://localhost:7044/Booking`, null, {
          params: {
            userId,
            campingSpotId: this.spot.id,
            checkInDate: this.checkInDate,
            checkOutDate: this.checkOutDate,
          },
        });
        alert('Booking successful!');
      } catch (error) {
        console.error('Error booking spot:', error);
        alert('Error booking spot.');
      }
    },
  },
};
</script>

<style scoped>
.booking-spot {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  width: 100%;
  max-width: 300px;
}

.spot-details {
  padding: 1rem;
}

.booking-spot h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.booking-spot p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.booking-spot img {
  width: 100%;
  height: 200px; 
  object-fit: cover; 
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.booking-form label {
  font-weight: bold;
}

.booking-form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.booking-form button {
  padding: 0.5rem 1rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.booking-form button:hover {
  background-color: #219150;
}


.parent-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}
</style>
