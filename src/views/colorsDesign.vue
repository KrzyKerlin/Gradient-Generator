<template>
  <v-container fluid class="fill-height">
    <BackButton />
    <v-row class="fill-height mx-2 md-mx-8">
      <v-col class="d-flex flex-column align-center justify-center" :style="{ backgroundColor: bgColor }" cols="12" md="8">
        <h1 :style="{ color: textColor}" class="text-h3 text-md-h1 text-center font-weight-bold my-2">HEADING TEXT</h1>
        <p :style="{ color: textColor}" class="text-h6 text-md-h5 text-center my-2">Text Description Lorem Ipsum </p>
        <v-btn :style="{ backgroundColor: buttonBgColor, color: buttonTextColor }" size="large">Button  
          <v-icon icon="mdi-arrow-right" end></v-icon>
        </v-btn>
        <v-icon :color="socialColor" size="40" class="mt-2">mdi-youtube</v-icon>
      </v-col>
  
      <!-- Color Pickers -->
      <v-col class="d-flex flex-column align-center justify-center" cols="12" md="4">
        <v-card class="pa-6 text-center bg-white lighten-3 elevation-10 rounded-lg">
          <v-row class="mb-2">
            <v-col cols="6" class="d-flex flex-column align-center">
              <label for="bgColor" style="white-space: nowrap;">Bg Color</label>
              <input type="color" id="bgColor" v-model="bgColor" class="color-picker" />
            </v-col>
            <v-col cols="6" class="d-flex flex-column align-center">
              <label for="textColor" style="white-space: nowrap;">Txt Color</label>
              <input type="color" id="textColor" v-model="textColor" class="color-picker" />
            </v-col>
            <!-- Button Color Picker --> 
            <v-col cols="6" class="d-flex flex-column align-center"> 
              <label for="buttonBgColor" style="white-space: nowrap;">Button Bg</label> 
              <input type="color" id="buttonBgColor" v-model="buttonBgColor" class="color-picker" /> 
            </v-col> 
            <v-col cols="6" class="d-flex flex-column align-center"> 
              <label for="buttonTextColor" style="white-space: nowrap;">Button Txt</label> 
              <input type="color" id="buttonTextColor" v-model="buttonTextColor" class="color-picker" /> 
            </v-col>
            <!-- Icons Color Picker -->
            <v-col cols="12" class="d-flex flex-column align-center">
              <label for="socialColor" style="white-space: nowrap;">Icon</label>
              <input type="color" id="socialColor" v-model="socialColor" class="color-picker" />
            </v-col>
          </v-row>
          <!-- Reset Button --> 
          <v-btn color="error" @click="resetColors">Reset Colors</v-btn>
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
        buttonBgColor: '#2575fc', 
        buttonTextColor: '#ffffff',
        socialColor: '#1877f2'
      };
  
      const bgColor = ref(defaultColors.bgColor);
      const textColor = ref(defaultColors.textColor);
      const buttonBgColor = ref(defaultColors.buttonBgColor); 
      const buttonTextColor = ref(defaultColors.buttonTextColor);
      const socialColor = ref(defaultColors.socialColor);
  
      // Apply the colors when the component initializes
      onMounted(() => {
        document.body.style.background = bgColor.value;
      });
  
      // Reset the background when the component is removed
      onUnmounted(() => {
        document.body.style.background = '';
      });
  
      // Track changes in color values
      watch([bgColor, textColor, buttonBgColor, buttonTextColor, socialColor], () => {
        document.body.style.background = bgColor.value;
      }, { immediate: true });

      const resetColors = () => {
        bgColor.value = defaultColors.bgColor;
        textColor.value = defaultColors.textColor;
        buttonBgColor.value = defaultColors.buttonBgColor;
        buttonTextColor.value = defaultColors.buttonTextColor;
        socialColor.value = defaultColors.socialColor;
      };
  
      return {
        bgColor,
        textColor,
        buttonBgColor, 
        buttonTextColor,
        socialColor,
        resetColors
      };
    }
  };
</script>
  
<style scoped>
  .color-picker {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }
  
</style>
  