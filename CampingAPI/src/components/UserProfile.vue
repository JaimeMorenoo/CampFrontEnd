<template>
  <div class="test">

 
  <div class="user-profile">
    <div class="card" v-if="user">
      <div class="header">
        <img :src="avatarUrl" alt="User Avatar" class="avatar">
      </div>
      <div class="details">
        <h2>{{ user.username }}</h2>
        <button class="edit-btn" @click="isEditing = true">Edit</button>
      </div>
      <div v-if="!isEditing" class="info">
        <p><span class="label">First Name:</span> <span class="value">{{ user.name }}</span></p>
        <p><span class="label">Last Name:</span> <span class="value">{{ user.lastName }}</span></p>
        <p><span class="label">DOB:</span> <span class="value">{{ formatDate(user.dob) }}</span></p>
        
      </div>
      <div v-else class="info">
        <p>
          <span class="label">First Name:</span> 
          <input type='text' v-model="editableUser.name" />
        </p>
        <p>
          <span class="label">Last Name:</span> 
          <input type='text' v-model="editableUser.lastName" />
        </p>
        <p>
          <span class="label">DOB:</span> 
          <input v-model="editableUser.dob" type="date" />
        </p>
        <p>
          <span class="label">Password:</span> 
          <input type='password' v-model="editableUser.password" placeholder="Place new password" />
        </p>
        <button class="edit-btn save-btn" @click="saveChanges">Save</button>
        <button class="edit-btn" @click="isEditing = false">Cancel</button>
      </div>
      <div class="rating">
        <div class="rating-bar">
          <span class="rating-label">Your Rating</span>
          <span class="activity-label"></span>
      </div>
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
      avatarUrl: 'https://as1.ftcdn.net/v2/jpg/05/24/80/40/1000_F_524804077_gOLGMjqfvR5sB6E4cLif4mbiQU0jL1rw.jpg' // SIUUUU
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        console.error('No user ID found in local storage');
        return;
      }
      try {
        const response = await fetch(`https://localhost:7044/User/${userId}`);
        const userData = await response.json();
        this.user = userData.value;
        this.user.activity = 90; // RANDOM NOT ACTUAL VALUE
        this.editableUser = { ...this.user }; // CLONING THE USER DATA FOR EDITING BC OF API THAT HAS RANDOM VALUES
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
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      // Format the date as you wish
      const formattedDate = date.toLocaleDateString(); // Change the formatting as needed
      return formattedDate;
    }
  }
};
</script>


<style scoped>

.user-profile {
  display: flex;
  justify-content: center;
  padding: 20px; 
   
}

.test {
  background-color: #001f3f;
  width: 100vw;
  height: 100vh;
}


.card {
  background-color:  white;
  border-radius: 5px;
  overflow: hidden;
  width: 400px;
  padding: 20px;
  text-align: center;
  position: relative;
  left: 10px;
  color: black;
  border: 1px solid black; 
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
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
  color: black;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
}
.card:hover{
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);


}
.edit-btn:hover {
  background-color: #0056b3;
}

.info {
  margin-top: 20px;
  text-align: center
}

.info p {
  margin: 5px 0;
  color: black;
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

.edit-btn.save-btn {
  margin-right: 20px; 
}

.rating-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-label, .activity-label {
  font-size: 0.9rem;
  color: white;
}

.bar {
  flex: 1;
  margin: 0 10px;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  position: relative;
}


.activity-progress {
  background-color: #00cc66;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  text-align: center;
}

.rating-values {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  color: white;
}
input[type="text"],
input[type="password"],
input[type="date"],
input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
