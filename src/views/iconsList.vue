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
          class="d-flex flex-column align-center"
          @click="openPopup(icon)">
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
    <!-- Icon Popup -->
    <v-dialog v-model="isPopupOpen" max-width="350">
      <v-card>
        <v-card-text>
          <div class="text-center my-4">
            <i :class="selectedIcon" style="font-size: 80px;"></i>
          </div>
          <div class="d-flex flex-column align-center">
            <h4 class="clickable-text text-center my-4" @click="copyToClipboard(selectedIcon)"> {{ selectedIcon }} </h4>
            <small v-if="isCopied" class="text-green bold mt-2"> Icon copied! </small>
          </div>
          <v-card-actions>
            <v-btn color="primary" text block @click="closePopup"> Close </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from "vue";

  const icons = ref([]);
  const searchQuery = ref(""); // Search query for filtering
  const currentPage = ref(1); // Current page for pagination
  const pageSize = 24; // Number of icons per page
  const selectedIcon = ref("");
  const isPopupOpen = ref(false);
  const isCopied = ref(false); 

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

  // Reset page to 1 when search query changes
  watch(searchQuery, () => {
    currentPage.value = 1;
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

  // Open popup
  const openPopup = (icon) => {
    selectedIcon.value = icon;
    isPopupOpen.value = true;
  };

  // Close popup
  const closePopup = () => {
    isPopupOpen.value = false;
  };

  // Copy icon
  const copyToClipboard = (iconName) => {
    if (!iconName) {
      console.error("No icon name provided for copying!");
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(iconName).then(() => {
      isCopied.value = true; 
      setTimeout(() => {
        isCopied.value = false; // Close info after 2 seconds
      }, 2000);
    });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = iconName;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        console.log("Fallback: Copied to clipboard:", iconName);
        isCopied.value = true;
        setTimeout(() => {
          isCopied.value = false;
        }, 2000);
      } catch (error) {
          console.error("Fallback: Error copying to clipboard:", error);
        }
      document.body.removeChild(textArea);
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
</script>

<style scoped>
  .icon-container {
    height: 60px;
    width: 60px;
    cursor: pointer; 
  }

  .icon-container:hover {
    transform: scale(1.2); 
    transition: transform 0.5s ease-in-out; 
  }

  .clickable-text {
    cursor: pointer; 
    transition: color 0.2s;
  }

  .clickable-text:hover {
    color: #2575fc;
  }
</style>
