<template>
  <v-container class="d-flex flex-column align-center">
    <BackButton />
    <h1 class="mb-8 text-center text-primary">Font <span class="second">Picker</span><span class="third"> App</span></h1>

    <div class="input-container align-center text-center">
      <v-text-field
          v-model="userText"
          label="Enter your text here..."
          outlined
          dense
          class="text-input text-black"
          color="primary"
          append-icon="mdi-pencil" 
        />
      <v-btn @click="loadFonts" color="primary" class="mb-8">Show</v-btn>
    </div>

    <!-- Fonts container -->
    <v-row class="my-4" v-if="fonts.length > 0" justify="center">
      <v-col
        v-for="font in fonts"
        :key="font.family"
        cols="12" sm="6" md="3"
        class="font-item d-flex flex-column align-center justify-center"
      >
        <v-card 
          :style="{ fontFamily: font.family}" 
          @mouseover="hoverFont = font.family" 
          @mouseleave="hoverFont = ''" 
          class="d-flex flex-column align-center justify-center">
          <v-card-text class="text-center d-flex align-center justify-center text-box my-2">{{ userText || 'Sample Text' }}
          </v-card-text>
          <div v-if="hoverFont === font.family" class="font-name text-primary font-weight-medium">{{ font.family }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "FontPicker",
  setup() {
    const userText = ref("");
    const fonts = ref([]);
    const hoverFont = ref("");

    // Load Json fonts 
    const loadFonts = async () => {
      try {
        const response = await fetch("/fonts.json");
        const fontsData = await response.json();

        fonts.value = fontsData;

        // Dynamically load fonts into <head>
        fontsData.forEach(font => loadFont(font.family));
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    const preloadFonts = async () => {
      try {
        const response = await fetch("/fonts.json");
        const fontsData = await response.json();
    
        fontsData.forEach(font => loadFont(font.family));
      } catch (error) {
        console.error("Error preloading fonts:", error);
      }
    };

    // Function to load a font from Google Fonts into <head>
    const loadFont = (fontFamily) => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    // Set the background on component mount
    onMounted(() => {
        preloadFonts();
        document.body.style.background = 'linear-gradient(to bottom, #8f0062, #b11adb)';
    });

    // Reset the background when the component is removed
    onUnmounted(() => {
        document.body.style.background = ''
    });

    return {
      userText,
      fonts,
      loadFonts,
      hoverFont
    };
  },
};
</script>

<style scoped>
h1 span {
  display: inline-block;
}

h1 span.second {
  font-family: 'Pacifico', cursive;
}

h1 span.third {
  font-family: 'Luckiest Guy', cursive;
}

.v-text-field {
  width: 350px; 
  font-size: 1.8rem;
}

.font-item .v-card {
  width: 250px;
  height: 125px;
}

.v-card-text {
  font-size: clamp(1.5rem, 2vw, 3rem);
  text-wrap: nowrap;
}

.font-name {
  font-family: Arial, sans-serif;
  font-size: 1rem;
}

</style>
