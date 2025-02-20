<template>
    <v-container class="d-flex flex-column align-center">
      <BackButton />
      <h1 class="mb-4 text-center text-indigo-darken-4">WebP Converter</h1>
    
      <v-btn color="primary" @click="triggerFileInput" class="my-4">
      Upload Images
      </v-btn>
      <input type="file" multiple @change="loadImages" ref="fileInput" class="d-none" id="fileInput" />
    
      <v-card v-if="files.length" class="d-flex flex-column align-center pa-4" elevation="2">
        <div class="file-list w-100 h-100">
          <h3>Uploaded Files:</h3>
          <v-list dense>
            <v-list-item v-for="(file, index) in files" :key="index">
              <v-list-item-icon>
                <v-icon>mdi-file-image</v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{ file.name }}</v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn color="success" class="d-flex justify-center align-center mt-3 mx-auto" @click="downloadImages">
            Download WebP
          </v-btn>
        </div>
      </v-card>
    </v-container>
</template>
  
<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const files = ref([]);

    // Load the images into the files array
    const loadImages = (event) => {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length > 10) {
        alert("You can upload a maximum of 10 images.");
        return;
      }
      files.value = selectedFiles;
    };

    // Trigger file input click
    const triggerFileInput = () => {
      document.getElementById("fileInput").click();
    };

    // Download images as WebP
    const downloadImages = () => {
      files.value.forEach((file) => {
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
            }, "image/webp");
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    };

    // Set the background on component mount
    onMounted(() => {
      document.body.style.background = 'linear-gradient(to right, #614385, #516395)';
    });

    // Reset the background when the component is removed
    onUnmounted(() => {
      document.body.style.background = '';
    });

    return {
      files,
      triggerFileInput,
      loadImages,
      downloadImages
    };
  },
};
</script>

<style scoped>
.file-list {
  overflow-y: auto;
}
</style>
