<template>
  <div class="booking">
    <h1>Book a Camping Spot !</h1>
    <filter-component @apply-filters="filterSpots" />
    <div class="booking-spots">
      <booking-spot
        v-for="(spot, index) in filteredSpots"
        :key="index"
        :spot="spot"
        class="booking-spot"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookingSpot from '@/components/BookingSpots.vue'; 
import FilterComponent from '@/components/FilterComponent.vue'; 

export default {
  name: 'Booking',
  components: {
    BookingSpot,
    FilterComponent,
  },
  data() {
    return {
      bookingSpots: [],
      filteredSpots: [],
    };
  },
  mounted() {
    this.fetchBookingSpots();
  },
  methods: {
    async fetchBookingSpots() {
      try {
        const response = await axios.get('https://localhost:7044/CampingSpot');
        this.bookingSpots = response.data;
        this.filteredSpots = this.bookingSpots;
      } catch (error) {
        console.error('Error fetching booking spots:', error);
      }
    },
    filterSpots(filters) {
      this.filteredSpots = this.bookingSpots.filter((spot) => {
        return (
          (!filters.maxPrice || spot.pricePerNight <= filters.maxPrice) &&
          (!filters.location || spot.location.toLowerCase().includes(filters.location.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style scoped>
.booking {
  text-align: center;
  padding: 20px;
  background-color: #001f3f;
  color: black
  
}
html body{
  background-color: #001f3f;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white;
}

.booking-spots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.booking-spot {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.booking-spot:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.booking-spot img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.booking-spot-content {
  padding: 20px;
}

.booking-spot-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.booking-spot-description {
  color: #777;
  margin-bottom: 10px;
}

.booking-spot-price {
  font-size: 1.2rem;
  color: #27ae60;
}
</style>
