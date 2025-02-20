<template>
    <v-container class="d-flex flex-column align-center">
      <BackButton />
      <h1 class="my-4 text-center text-primary">Color Palette</h1>
  
      <v-btn @click="generatePalettes" color="primary" size="large" class="btn">
        Generate 
      </v-btn>
  
      <div id="results" class="d-flex flex-wrap justify-center mt-10">
        <v-row justify="center">
          <v-col 
          v-for="(palette, index) in palettes" 
          :key="index">
            <v-sheet class="palette d-flex justify-center pa-2 rounded-lg">
              <v-sheet
                v-for="(color, i) in palette"
                :key="i" 
                :width="isMobile ? 70 : 100"
                :height="isMobile ? 100 : 120"
                class="d-flex align-center justify-center text-white text-bold rounded-lg mb-6"
                :style="{backgroundColor: color, border: '2px solid black', fontSize:'12px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',}"
                >{{ color }}
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      
    </v-container>
</template>
  
<script>
  import { ref, onMounted, onUnmounted } from "vue";
  
  export default {
    name: 'ColorPalette',
    setup() {
      const palettes = ref([]);
      const isMobile = ref(window.innerWidth < 480);

      const handleResize = () => {
        isMobile.value = window.innerWidth < 480;
      };

      window.addEventListener('resize', handleResize);

      // Cleanup listener on component unmount
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
      });
  
      // Generates a random hex color
      const getRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      };
  
      // Generates 50 palettes with 5 colors
      const generatePalettes = () => {
      palettes.value = [];

      for (let i = 0; i < 50; i++) {
        const palette = [];
        for (let j = 0; j < 5; j++) {
          palette.push(getRandomColor());
        }
        palettes.value.push(palette);
      }
    };

      // Set the background on component mount
      onMounted(() => {
        document.body.style.background = 'linear-gradient(to right, #f5feff, #94d5e6)';
      });

      // Reset the background when the component is removed
      onUnmounted(() => {
        document.body.style.background = ''
      });
  
      return {
        palettes,
        generatePalettes,
        isMobile
      };
    }
  };
</script>
  
<style scoped>
.v-sheet {
  background: transparent;
}
</style>
  