<template>
  <v-container class="d-flex flex-column align-center">
    <BackButton />
    <h1 class="my-4 text-center text-indigo-darken-4">
      WebP <br />
      Converter
    </h1>
    <v-btn color="primary" @click="triggerFileInput" class="my-4" size="large">
      <v-icon start>mdi-upload</v-icon>
      Upload Images
    </v-btn>
    <input
      type="file"
      multiple
      @change="loadImages"
      ref="fileInput"
      class="d-none"
      id="fileInput"
      accept="image/*"
    />

    <v-card
      v-if="files.length"
      class="image-container pa-4 mb-4"
      elevation="3"
      width="100%"
      max-width="600px"
    >
      <h3 class="text-center mb-4">Uploaded Files ({{ files.length }}/10)</h3>

      <v-list>
        <v-list-item v-for="(file, index) in files" :key="index" class="mb-2">
          <v-card width="100%" class="file-card">
            <div class="d-flex align-center px-3 py-2">
              <div
                class="d-flex align-center justify-center bg-grey-lighten-3 rounded overflow-hidden"
                style="width: 40px; height: 40px"
              >
                <img
                  v-if="previews[index]"
                  :src="previews[index]"
                  alt="Preview"
                  class="preview-img"
                />
                <v-icon v-else size="36">mdi-file-image</v-icon>
              </div>

              <div class="text-truncate flex-grow-1 text-body-2">
                {{ file.name }}
              </div>

              <v-btn
                color="success"
                class="convert-btn"
                variant="outlined"
                @click="downloadSingleImage(file, index)"
                density="comfortable"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-list-item>
      </v-list>

      <v-card-actions v-if="files.length > 1" class="justify-center mt-3">
        <v-btn
          color="green"
          size="large"
          @click="downloadImages"
          variant="elevated"
        >
          <v-icon start>mdi-download-multiple</v-icon>
          Download All
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const files = ref([]);
const previews = ref([]);
const fileInput = ref(null);
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

// Generate image previews when files change
watch(
  files,
  (newFiles) => {
    previews.value = Array(newFiles.length).fill("");
    newFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.value[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },
  { deep: true },
);

// Load the images into the files array
const loadImages = (event) => {
  const selectedFiles = Array.from(event.target.files);
  if (selectedFiles.length > 10) {
    snackbar.value = {
      show: true,
      text: "You can upload a maximum of 10 images",
      color: "error",
    };
    return;
  }
  files.value = selectedFiles;
};

// Trigger file input click
const triggerFileInput = () => {
  document.getElementById("fileInput").click();
};

// Download a single image as WebP
const downloadSingleImage = (file, index) => {
  convertToWebP(file, index);
};

// Download all images as WebP
const downloadImages = () => {
  files.value.forEach((file, index) => {
    convertToWebP(file, index);
  });
  snackbar.value = {
    show: true,
    text: "Converting all images to WebP",
    color: "info",
  };
};

// Convert image to WebP and download
const convertToWebP = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name.replace(/\.[^/.]+$/, "") + ".webp";
        link.click();

        // Clean up
        setTimeout(() => {
          URL.revokeObjectURL(link.href);
        }, 100);
      }, "image/webp");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Set the background on component mount
onMounted(() => {
  document.body.style.background =
    "linear-gradient(to right, #614385, #516395)";
});

// Reset the background when the component is removed
onUnmounted(() => {
  document.body.style.background = "";
});
</script>

<style scoped>
.image-container {
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.9);
}

.file-card {
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.convert-btn {
  min-width: 36px !important;
}
</style>
