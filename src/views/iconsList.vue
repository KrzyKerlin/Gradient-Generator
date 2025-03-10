<template>
  <v-container class="d-flex flex-column align-center pa-4">
    <BackButton />
    <h1 class="my-4 text-center text-primary">Font Awesome Icons</h1>
    <v-card elevation="3">
      <v-card-title class="text-h5 text-center">Icons</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col
            v-for="(icon, index) in paginatedIcons"
            :key="`${icon}-${index}`"
            cols="3"
            class="d-flex flex-column align-center"
          >
            <div class="icon-container d-flex flex-column align-center">
              <i :class="icon" style="font-size: 32px;"></i>
            </div>
            <small class="mt-2 text-center gray">{{ icon }}</small>
          </v-col>
        </v-row>
        <!-- Pagination Controls -->
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(icons.length / pageSize)"
          class="mt-4"
        ></v-pagination>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";

export default {
  name: "IconsList",
  setup() {
    const icons = ref([]);
    const currentPage = ref(1); // Current page for pagination
    const pageSize = 24; // Number of icons per page

    // Computed property to calculate paginated icons
    const paginatedIcons = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return icons.value.slice(start, end);
    });

    const loadIcons = async () => {
      try {
        const response = await fetch("/icons.json");
        const data = await response.json();

        // Combine categories and add prefixes
        icons.value = [
          ...data.solid.map((icon) => `fa-solid ${icon}`),
          ...data.regular.map((icon) => `fa-regular ${icon}`),
          ...data.brands.map((icon) => `fa-brands ${icon}`),
        ];
      } catch (error) {
        console.error("Error loading icons:", error);
      }
    };

    // Set the background on component mount
    onMounted(() => {
      document.body.style.background = 'linear-gradient(to right, #8987e3, #c4c4e4)';
      loadIcons();
    });

    // Reset the background when the component is removed
    onUnmounted(() => {
      document.body.style.background = '';
    });

    return { 
      icons, 
      currentPage, 
      pageSize, 
      paginatedIcons 
    };
  },
};
</script>

<style scoped>
.icon-container {
  height: 60px;
  width: 60px;
  margin: 0 auto;
}

i {
  color: #000;
}

i:hover {
  color: #1976d2;
  transform: scale(1.2);
  transition: all 0.2s ease-in-out;
}

small {
  font-size: 14px;
}

.v-card-title {
  font-weight: bold;
}
</style>
