<template>
  <v-container fluid class="fill-height">
    <BackButton />
    <v-row class="fill-height">
      <v-col class="d-flex flex-column align-center justify-center" :style="{ backgroundColor: bgColor }" cols="12" md="6">
        <h1 :style="{ color: textColor}" class="text-h3 text-md-h1 text-center font-weight-bold my-2">HEADING TEXT</h1>
        <p :style="{ color: textColor}" class="text-h6 text-md-h5 my-2">Description text</p>
      </v-col>
  
      <!-- Color Pickers -->
      <v-col class="d-flex flex-column align-center justify-center" cols="12" md="6">
        <v-card class="pa-6 text-center bg-white lighten-3 elevation-10 rounded-lg">
          <v-row class="mb-2">
            <v-col cols="6" class="d-flex flex-column align-center">
              <label for="bgColor">Background Color</label>
              <input type="color" id="bgColor" v-model="bgColor" class="color-picker" />
            </v-col>
            <v-col cols="6" class="d-flex flex-column align-center">
              <label for="textColor">Text Color</label>
              <input type="color" id="textColor" v-model="textColor" class="color-picker" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const defaultColors = {
        bgColor: '#6a11cb',
        textColor: '#f457ff',
      };
  
      const bgColor = ref(defaultColors.bgColor);
      const textColor = ref(defaultColors.textColor);
  
      // Apply the colors when the component initializes
      onMounted(() => {
        document.body.style.background = bgColor.value;
      });
  
      // Reset the background when the component is removed
      onUnmounted(() => {
        document.body.style.background = '';
      });
  
      // Track changes in color values
      watch([bgColor, textColor], () => {
        document.body.style.background = bgColor.value;
      }, { immediate: true });
  
      return {
        bgColor,
        textColor,
      };
    }
  };
</script>
  
<style scoped>
  .color-picker {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
  }
  
</style>
  