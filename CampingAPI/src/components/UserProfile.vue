<template>
  <div class="user-profile">
    <div class="card" v-if="user">
      <div class="header">
        <img :src="avatarUrl" alt="User Avatar" class="avatar">
      </div>
      <div class="details">
        <h2>{{ user.username }}</h2>
        <p>{{ user.city }}, {{ user.state }}</p>
        <button class="edit-btn" @click="isEditing = true">Edit</button>
      </div>
      <div v-if="!isEditing" class="info">
        <p><span class="label">First Name:</span> <span class="value">{{ user.name }}</span></p>
        <p><span class="label">Last Name:</span> <span class="value">{{ user.lastName }}</span></p>
        <p><span class="label">DOB:</span> <span class="value">{{ user.dob }}</span></p>
        <p><span class="label">Country:</span> <span class="value">{{ user.country }}</span></p>
        <p><span class="label">Phone:</span> <span class="value">{{ user.phone }}</span></p>
      </div>
      <div v-else class="info">
        <p>
          <span class="label">First Name:</span> 
          <input v-model="editableUser.name" />
        </p>
        <p>
          <span class="label">Last Name:</span> 
          <input v-model="editableUser.lastName" />
        </p>
        <p>
          <span class="label">DOB:</span> 
          <input v-model="editableUser.dob" type="date" />
        </p>
        <p>
          <span class="label">Country:</span> 
          <input v-model="editableUser.country" />
        </p>
        <p>
          <span class="label">Phone:</span> 
          <input v-model="editableUser.phone" />
        </p>
        <button @click="saveChanges">Save</button>
        <button @click="isEditing = false">Cancel</button>
      </div>
      <div class="rating">
        <div class="rating-bar">
          <span class="rating-label">Your Rating</span>
          <span class="activity-label"></span>
          <div class="bar">
            <div class="activity-progress" :style="{ width: user.activity + '%' }"></div>
          </div>
        </div>
        <div class="rating-values">
          <span>{{ user.activity }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserProfile',
  data() {
    return {
      user: null,
      editableUser: {},
      isEditing: false,
      avatarUrl: 'https://img.freepik.com/premium-photo/cristiano-ronaldo-cartoon-logo-6_639744-1846.jpg' // Placeholder image URL
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = localStorage.getItem('userId'); // Get userId from local storage
      console.log(userId)
      if (!userId) {
        console.error('No user ID found in local storage');
        return;
      }
      try {
        const response = await fetch(`https://localhost:7044/User/${userId}`);
        const userData = await response.json();
        this.user = userData.value;
        this.user.rating = 53; // Hardcoded for example, replace with actual data
        this.user.activity = 90; // Hardcoded for example, replace with actual data
        this.editableUser = { ...this.user }; // Clone the user data for editing
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async saveChanges() {
      try {
        const response = await fetch(`https://localhost:7044/User/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editableUser)
        });
        if (response.ok) {
          this.user = { ...this.editableUser };
          this.isEditing = false;
        } else {
          console.error('Error updating user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
.user-profile {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px;
  padding: 20px;
  text-align: center;
  position: relative;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.details {
  text-align: center;
  margin-top: 10px;
}

.details h2 {
  margin: 0;
  font-size: 1.5rem;
}

.details p {
  margin: 5px 0;
  color: #555;
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

.edit-btn:hover {
  background-color: #0056b3;
}

.info {
  margin-top: 20px;
  text-align: left;
}

.info p {
  margin: 5px 0;
  color: #555;
}

.info .label {
  font-weight: bold;
}

.info .value {
  font-weight: normal;
}

.rating {
  margin-top: 20px;
  text-align: center;
}

.rating-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-label, .activity-label {
  font-size: 0.9rem;
  color: #777;
}

.bar {
  flex: 1;
  margin: 0 10px;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  position: relative;
}

.rating-progress {
  background-color: #ffcc00;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
}

.activity-progress {
  background-color: #00cc66;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
}

.rating-values {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  color: #333;
}
</style>
