<template>
    <v-container class="container">
      <BackButton />
      <div class="container-tool text-center">
        <h1>My Tools App</h1>
        <v-row class="tools pb-8 d-none d-md-flex"> <!-- Hide on desktop-->
          <v-col cols="12" md="6">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center ma-2 pa-2">
              <v-icon start size="40">mdi-gradient-horizontal</v-icon> 
              <h3>GRADIENT Generator</h3>
              <v-btn :to="'/GradientGenerator'" class="btn" size="large" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center ma-2 pa-2">
              <v-icon start size="40">mdi-palette</v-icon>
              <h3>Color PALETTE</h3>
              <v-btn :to="'/ColorPalette'" class="btn" size="large" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center ma-2 pa-2">
              <v-icon start size="40">mdi-format-font</v-icon>
              <h3>FONTS List</h3>
              <v-btn :to='"/FontsList"' class="btn" size="large" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center ma-2 pa-2">
              <v-icon start size="40">mdi-image</v-icon>
              <h3>WEBP Converter</h3>
              <v-btn :to='"/WebpConverter"' class="btn" size="large" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
        </v-row>

        <v-carousel class="d-md-none" :show-arrows="false"> <!-- Slider only on mobile -->
          <v-carousel-item v-for="(tool, i) in tools" :key="i" class="tools my-5">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center ma-2 pa-2">
              <v-icon :start="tool.icon.start" size="40">{{ tool.icon.name }}</v-icon>
              <h3>{{ tool.title }}</h3>
              <v-btn :to="tool.route" class="btn" size="large" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>

      <v-responsive class="bg-space">
        <ul class="squares">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </v-responsive>
      <Footer />
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        { icon: { name: 'mdi-gradient-horizontal', start: true }, title: 'GRADIENT Generator', route: '/GradientGenerator' },
        { icon: { name: 'mdi-palette', start: true }, title: 'Color PALETTE', route: '/ColorPalette' },
        { icon: { name: 'mdi-format-font', start: true }, title: 'FONTS List', route: '/FontsList' },
        { icon: { name: 'mdi-image', start: true }, title: 'WEBP Converter', route: '/WebpConverter' },
      ],
    };
  },
};
</script>

<style scoped>
@import '/src/assets/style.css';
</style>