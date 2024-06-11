<template>
  <div class="filter-container">
    <h3>Filter Spots</h3>
    <div class="filter-item">
      <label for="price">Max Price Per Night:</label>
      <input type="number" v-model="filters.maxPrice" @input="applyFilters" placeholder="Max Price" />
    </div>
    <div class="filter-item">
      <label for="location">Location:</label>
      <input type="text" v-model="filters.location" @input="applyFilters" placeholder="Location" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',
  data() {
    return {
      filters: {
        maxPrice: null,
        location: '',
      }
    };
  },
  methods: {
    applyFilters() {
      this.$emit('apply-filters', this.filters);
    }
  }
};
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px;
  background-color: #001f3f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.filter-container h3 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
}

.filter-item input {
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 4px;
  font-size: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Add transition effect */
}

.filter-item:hover {
  transform: scale(1.05); /* Apply scale effect on hover */
}

.filter-item input:focus {
  border-color: black;
  outline: none;
  box-shadow: 0 0 5px rgba(39, 174, 96, 0.5);
}
</style>
