<template>
  <div class="user-spots">
    <div class="add-spot-container"> 
      <button @click="openAddSpotModal" class="action-btn">Add Spot</button>
    </div>
    <div v-if="spots.length > 0">
      <div v-for="spot in spots" :key="spot.id" class="spot">
        <h3>{{ spot.name }}</h3>
        <p>{{ spot.description }}</p>
        <div class="spot-images">
          <div v-for="(image, index) in getSpotImage(spot.id)" :key="index" class="spot-image">
            <img :src="image" alt="Spot Image">
          </div>
        </div>
        <div class="spot-details">
          <p><strong>Price Per Night:</strong> ${{ spot.pricePerNight }}</p>
          <div class="actions">
            <button @click="editSpot(spot)" class="action-btn">Edit</button>
            <button @click="deleteSpot(spot.id)" class="action-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You don't own any spots!</p>
    </div>

<div v-if="showAddSpotModal" class="edit-modal">
  <div class="modal-content">
    <h2>Add Spot</h2>
    <form @submit.prevent="addNewSpot">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="newSpot.name" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="newSpot.description"></textarea>
      </div>
      <div class="form-group">
        <label for="pricePerNight">Price Per Night ($)</label>
        <input type="number" v-model="newSpot.pricePerNight" required>
      </div>
      <div class="form-group">
        <label for="name">Location</label>
        <input type="text" v-model="newSpot.location" required>
      </div>
      <button type="submit">Add Spot</button>
      <button class="action-btn" @click="cancelAddSpot">Cancel</button>
    </form>
  </div>
</div>

    <div v-if="showEditModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Spot</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="editedSpot.name" required>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea v-model="editedSpot.description"></textarea>
          </div>
          <div class="form-group">
            <label for="pricePerNight">Price Per Night ($)</label>
            <input type="number" v-model="editedSpot.pricePerNight" required>
          </div>
          <button class="edit-btn save-btn" type="submit">Save Changes</button>
          <button class="edit-btn" @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSpots',
  data() {
    return {
      spots: [],
      editedSpot: {},
      newSpot: {
        name: '',
        description: '',
        pricePerNight: null
      },
      showEditModal: false,
      showAddSpotModal: false
    };
  },
  mounted() {
    this.fetchUserSpots();
  },
  methods: {
    async fetchUserSpots() {
      try {
        // Fetch user spots data from the API
        const userId = localStorage.getItem('userId')
        const response = await fetch('https://localhost:7044/CampingSpot/owner/'+userId);
        const spotsData = await response.json();
        this.spots = spotsData;
      } catch (error) {
        console.error('Error fetching spots data:', error);
      }
    },
    getSpotImage(ownerId) {
      const images = [];
      if (ownerId < 7) {
        for (let i = 1; i <= 4; i++) {
          images.push(`/src/assets/spots/${ownerId}/${i}.jpg`); // 7 BC WE ARE JUST "HARDCODING" THE PICTURES FOR THE DEMO
        }
      } else {
        images.push('/src/assets/spots/1/1.jpg');
      }
  return images;
    },
    editSpot(spot) {
      this.editedSpot = { ...spot }; // CLoning when editing bc of API
      this.showEditModal = true;
    },
    async saveChanges() {
      try {
        const response = await fetch(`https://localhost:7044/CampingSpot/${this.editedSpot.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editedSpot)
        });
        if (response.ok) {
          this.showEditModal = false;
          // Updating the spot array
          const index = this.spots.findIndex(spot => spot.id === this.editedSpot.id);
          if (index !== -1) {             this.spots[index] = { ...this.editedSpot };
          }
          // Reset editedSpot object
          this.editedSpot = {};
        } else {
          console.error('Error updating spot:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating spot:', error);
      }
    },
    cancelEdit() {
      this.showEditModal = false;
      this.editedSpot = {};
    },
    async deleteSpot(spotId) {
      try {
        const response = await fetch(`https://localhost:7044/CampingSpot/CampingSpot/${spotId}`, {
          method: 'DELETE',
          headers: {
            'accept': '*/*'
          }
        });
        if (response.ok) {
          // RrEMOving the spot from the array
          this.spots = this.spots.filter(spot => spot.id !== spotId);
          console.log('Spot deleted successfully');
        } else {
          console.error('Error deleting spot:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting spot:', error);
      }
    },
    openAddSpotModal() {
      this.showAddSpotModal = true;
    },
    async addNewSpot() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch('https://localhost:7044/CampingSpot', {
          method: 'POST',
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.newSpot.name,
            description: this.newSpot.description,
            pricePerNight: this.newSpot.pricePerNight,
            ownerId: userId,
            location : this.newSpot.location
          })
        });
        if (response.ok) {
          // Spot added successfully
          // Fetch updated spots data
          this.fetchUserSpots();
          // Close the modal
          this.showAddSpotModal = false;
          // Reset newSpot object
          this.newSpot = {
            name: '',
            description: '',
            pricePerNight: null,
            location : ''
          };
        } else {
          console.error('Error adding spot:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding spot:', error);
      }
    },
    cancelAddSpot() {
      this.showAddSpotModal = false;
      // Reset newSpot object
      this.newSpot = {
        name: '',
        description: '',
        pricePerNight: null
      };
    }
  }
};
</script>



<style scoped>

.user-spots {
  
  color: black;
}

.spot {
  border: 2px solid black;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  
}
.spot:hover{
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
}

.spot h3 {
  margin-top: 0;
  font-size: 24px;
  margin-bottom: 10px;
}

.spot p {
  margin-bottom: 15px;
  color: black;
  font-size: 16px;
}

.spot-images {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
}

.spot-images::-webkit-scrollbar {
  display: none; 
}

.spot-image {
  flex: 0 0 auto;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
}

.spot-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.edit-btn.save-btn {
  margin-right: 10px; /* Add margin to the right of the "Save" button */
}

.spot-details {
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.spot-details p {
  margin-bottom: 10px;
}

.spot-details strong {
  color: #333;
}

.spot-details strong::after {
  content: ':';
}

.actions {
  display: flex;
  justify-content: center;
}

.action-btn {
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: #fff;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #0056b3;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}
.add-spot-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
}

input[type="text"]{
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

input[type="number"] {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

button[type="submit"],
button[type="button"] {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  background-color: #0056b3;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
