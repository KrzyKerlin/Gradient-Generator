<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <BackButton />
    <v-card class="mx-auto pa-6 text-center" max-width="500" elevation="10">
      <!-- Gradient Text -->
      <v-sheet class="mb-2">
        <p ref="gradientText" class="text-h2 font-weight-bold text-gradient">
          GRADIENT
        </p>
      </v-sheet>

      <v-row class="m-2">
        <v-col cols="4" class="d-flex flex-column align-center">
          <label for="color1">Color 1</label>
          <input type="color" id="color1" v-model="color1" class="color-picker" />
        </v-col>
        <v-col cols="4" class="d-flex flex-column align-center">
          <label for="color2">Color 2</label>
          <input type="color" id="color2" v-model="color2" class="color-picker" />
        </v-col>
        <v-col v-if="showThirdColor" cols="4" class="d-flex flex-column align-center">
          <label for="color3">Color 3</label>
          <input type="color" id="color3" v-model="color3" class="color-picker" />
        </v-col>
      </v-row>
  
      <!-- Button to toggle the third color -->
      <v-btn @click="toggleThirdColor" color="primary" class="my-4">
        {{ showThirdColor ? '-' : '+' }}3 Color
      </v-btn>

      <v-row dense>
        <v-col v-for="dir in directions" :key="dir.value" cols="3">
          <v-btn
            @click="setDirection(dir.value)"
            :class="{ 'btn-active': direction === dir.value }"
            block
            size="large"
            variant="outlined"
          >
            {{ dir.icon }}
          </v-btn>
        </v-col>
      </v-row>

      <v-sheet class="gradient-code relative bg-blue-grey-darken-4 text-white mt-6 pa-3 rounded-lg overflow-hidden">
        <pre class="text-wrap text-caption">{{ cssCode }}</pre>
        <v-btn
          id="copyCode"
          class="absolute top right mt-3"
          color="primary"
          @click="copyToClipboard"
        >
          <v-icon>mdi-content-copy</v-icon> Copy Code
        </v-btn>
      </v-sheet>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';

  const color1 = ref('#0000ff');
  const color2 = ref('#09cbfb');
  const color3 = ref('#0000ff');  // same like color 1
  const showThirdColor = ref(false);
  const direction = ref('to right');
  const cssCode = ref('');
  const gradientText = ref(null);

  const directions = [
    { value: 'to right', icon: '→' },
    { value: 'to left', icon: '←' },
    { value: 'to bottom', icon: '↓' },
    { value: 'to top', icon: '↑' },
    { value: 'to bottom right', icon: '↘' },
    { value: 'to bottom left', icon: '↙' },
    { value: 'to top right', icon: '↗' },
    { value: 'to top left', icon: '↖' },
  ];

  // Update the gradient
  const updateGradient = () => {
    let gradientCSS;
    if (showThirdColor.value) {
      gradientCSS = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value}, ${color3.value})`;
    } else {
      gradientCSS = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
    }

    // Apply the gradient to the entire background (only within this component)
    document.body.style.background = gradientCSS;

    // Apply gradient effect to the text
    if (gradientText.value) {
      gradientText.value.style.background = gradientCSS;
      gradientText.value.style.webkitBackgroundClip = 'text';
      gradientText.value.style.webkitTextFillColor = 'transparent';
      gradientText.value.style.backgroundClip = 'text';
      gradientText.value.style.color = 'transparent';
    }

    // Generate CSS code
    cssCode.value = `
      background: ${gradientCSS};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    `;
  };

  // Toggle the visibility of the third color picker
  const toggleThirdColor = () => {
    showThirdColor.value = !showThirdColor.value;
    updateGradient();
  };

  // Set the gradient when the component initializes
  onMounted(updateGradient);

  // Reset the background when the component is removed
  onUnmounted(() => {
    document.body.style.background = '';
  });

  // Track changes in color values and direction
  watch([color1, color2, color3, direction, showThirdColor], updateGradient, { immediate: true });

  // Set a new gradient direction
  const setDirection = (dir) => {
    direction.value = dir;
  };

  // Copy CSS code
  const copyToClipboard = () => {
    // Check if writeText is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cssCode.value).then(() => {
        const button = document.getElementById('copyCode');
        if (button) {
          button.textContent = 'Copied :)';
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
          }, 2000);
        }
      });
    } else {
      // Fallback method for browsers that do not support writeText
      const textArea = document.createElement('textarea');
      textArea.value = cssCode.value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      const button = document.getElementById('copyCode');
      if (button) {
        button.textContent = 'Copied :)';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
        }, 2000);
      }
    }
  };
</script>
  
<style scoped>
  .color-picker {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
  }

  .gradient-code {
    min-height: 120px;
  }
</style>
  