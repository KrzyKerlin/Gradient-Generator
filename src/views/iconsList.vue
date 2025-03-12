<template>
  <v-container class="d-flex flex-column align-center pa-2">
    <BackButton />
    <h1 class="my-4 text-center text-primary">Icons</h1>
    <!-- Search Icon field -->
    <v-text-field v-model="searchQuery" label="Search Icons" class="w-75" outlined append-inner-icon="mdi-magnify"></v-text-field>
    <small class="h-6">Font Awesome Icons</small>
    <v-card elevation="0" class="w-100 d-flex flex-column justify-center mt-2" style="background: transparent;">
      <v-row dense>
        <v-col
          v-for="(icon, index) in paginatedIcons"
          :key="`${icon}-${index}`"
          cols="4" md="2"
          class="d-flex flex-column align-center">
          <div class="icon-container mt-8">
            <i :class="icon" style="font-size: 44px;"></i>
          </div>
        </v-col>
      </v-row>
      <!-- Pagination Controls -->
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(filteredIcons.length / pageSize)"
        class="mt-4 py-4"
      ></v-pagination>
    </v-card>
  </v-container>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";

export default {
  name: "IconsList",
  setup() {
    const icons = ref([]);
    const searchQuery = ref(""); // Search query for filtering
    const currentPage = ref(1); // Current page for pagination
    const pageSize = 24; // Number of icons per page

    // Computed property to filter icons based on search query
    const filteredIcons = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return icons.value.filter((icon) =>
        icon.toLowerCase().includes(query)
      );
    });

    // Computed property to calculate paginated icons
    const paginatedIcons = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return filteredIcons.value.slice(start, end);
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
      searchQuery, 
      currentPage, 
      pageSize, 
      filteredIcons,
      paginatedIcons 
    };
  },
};
</script>

<style scoped>
.icon-container {
  height: 60px;
  width: 60px;
}
</style>
