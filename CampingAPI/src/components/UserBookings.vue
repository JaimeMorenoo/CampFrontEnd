<template>
  
  <div class="user-bookings">
    <h2 style="color: black;">My Bookings</h2>
    <div v-if="bookings.length" class="bookings-list">
      <div v-for="booking in bookings" :key="booking.id" class="booking-card">
        <img :src="getSpotImage(booking.campingSpotId)" alt="Spot Image" class="spot-image" />
        <div class="booking-details">
          <h3>{{ booking.spotName }}</h3>
          <p><strong>Check-in Date:</strong> {{ formatDate(booking.checkInDate) }}</p>
          <p><strong>Check-out Date:</strong> {{ formatDate(booking.checkOutDate) }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No bookings found.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBookings',
  data() {
    return {
      bookings: []
    };
  },
  mounted() {
    
    this.fetchUserBookings();
  },
  methods: {
    async fetchUserBookings() {
      const userId = localStorage.getItem('userId'); // WE STROE ONCE LOGGED IN THE USERID!!!
      if (!userId) {
        alert('User not logged in.');
        return;
      }
      try {
        const response = await fetch(`https://localhost:7044/Booking/bookings/user/${userId}`);
        const bookingsData = await response.json();
        this.bookings = bookingsData.map(booking => ({
          ...booking,
          totalCost: this.calculateTotalCost(booking.checkInDate, booking.checkOutDate, booking.pricePerNight)
        }));
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      }
    },
    calculateTotalCost(checkInDate, checkOutDate, pricePerNight) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
      const totalCost = days > 0 ? days * pricePerNight : 0;
      return totalCost.toFixed(2);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getSpotImage(spotID) {
      const images = [];
      if (spotID < 7) {
        for (let i = 1; i <= 4; i++) {
          images.push(`/src/assets/spots/${spotID}/${i}.jpg`);
        }
      } else {
        images.push('/src/assets/spots/1/1.jpg');
      }
      return images[0]; 
    }
  }
};
</script>
<style scoped>
.user-bookings {
  padding: 0px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

}


.bookings-list {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; 
  
}

.booking-card {
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px; 
  color: black;
}

.booking-card:hover{
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
}

.spot-image {
  width: 100%;
  height: 200px;
  object-fit: cover; 
}

.booking-details {
  padding: 1rem;
}

.booking-details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;

}

.booking-details p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.booking-details strong {
  font-weight: bold;
}
</style>

  