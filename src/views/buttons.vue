<template>
  <v-container>
    <BackButton />
      <h1 class="my-4 text-center text-primary">Buttons</h1>
    <v-row>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="simple-button">SIMPLE</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="gradient-button">GRADIENT</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="shadow-button">SHADOW</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="scale-button">SCALE</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="slow-hover-button">SLOW</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="glow-button">GLOW</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="button-3d">3D</v-btn>
      </v-col>
      <v-col cols="6" md="3" class="d-flex flex-column align-center my-2">
        <v-btn class="outline-button">OUTLINE</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    // Set the background on component mount
    onMounted(() => {
      document.body.style.background = 'linear-gradient(to right, #80def4, #5db9d0, #0b88a8)';
    });

    // Reset the background when the component is removed
    onUnmounted(() => {
      document.body.style.background = '';
    }); 
  }
}

</script>

<style scoped>
.simple-button {
  background-color: #007BFF;
  color: white;
}
.simple-button:hover {
  background-color: #0056b3;
}

.gradient-button {
    background: linear-gradient(to right, #0000ff, #09cbfb);
    color: black;
    transition: 1.3s ease-in-out;
}
.gradient-button:hover {
    background: linear-gradient(to left, #0000ff, #09cbfb);
}

.shadow-button {
    background-color: #333;
    color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}
.shadow-button:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
}

.scale-button {
    background-color: #28a745;
    color: white;
    transition: transform 0.3s ease;
}
.scale-button:hover {
    transform: scale(1.1);
}

.slow-hover-button {
    background-color: #17a2b8;
    color: white;
    transition: background-color 1s ease;
}
.slow-hover-button:hover {
    background-color: #138496;
}

.glow-button {
    background-color: #6610f2;
    color: white;
    box-shadow: 0 0 5px #6610f2, 0 0 15px #6610f2, 0 0 30px #6610f2, 0 0 50px #6610f2;
    transition: box-shadow 0.3s ease;
}
.glow-button:hover {
    box-shadow: 0 0 20px #6610f2, 0 0 40px #6610f2, 0 0 60px #6610f2, 0 0 100px #6610f2;;
}

.button-3d {
    background-color: #17a2b8;
    color: white;
    box-shadow: 0 5px #138496, 0 10px #117a8b;
    transition: box-shadow 0.3s ease;
}
.button-3d:hover {
    box-shadow: 0 2px #138496, 0 5px #117a8b;
}

.outline-button {
    background-color: transparent;
    border: 2px solid #007BFF;
    color: #007BFF;
    transition: background-color 0.3s ease;
}
.outline-button:hover {
    background-color: #007BFF;
    color: white;
}
</style>
