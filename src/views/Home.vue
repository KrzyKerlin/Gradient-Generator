<template>
    <v-container class="container d-flex flex-column justify-center align-center w-100">
      <BackButton />
      <div class="container-tool text-center d-flex flex-column align-center">
        <h1 class="text-white">My Tools App</h1>
        <v-row class="tools pb-8 d-none d-md-flex"> <!-- Desktop layout -->
          <v-col cols="12" md="4">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center text-center ma-2 pa-4 rounded-lg">
              <v-icon start size="30">mdi-gradient-horizontal</v-icon> 
              <h3 class="font-weight-medium mb-2">GRADIENT Generator</h3>
              <v-btn :to="'/GradientGenerator'" class="btn text-white py-2 px-4" size="medium" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="4">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center text-center ma-2 pa-4 rounded-lg">
              <v-icon start size="30">mdi-palette</v-icon>
              <h3 class="font-weight-medium mb-2">Color PALETTE</h3>
              <v-btn :to="'/ColorPalette'" class="btn text-white py-2 px-4" size="medium" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="4">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center text-center ma-2 pa-4 rounded-lg">
              <v-icon start size="30">mdi-format-font</v-icon>
              <h3 class="font-weight-medium mb-2">FONTS List</h3>
              <v-btn :to='"/FontsList"' class="btn text-white py-2 px-4" size="medium" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center text-center ma-2 pa-4 rounded-lg">
              <v-icon start size="30">mdi-image</v-icon>
              <h3 class="font-weight-medium mb-2">WEBP Converter</h3>
              <v-btn :to='"/WebpConverter"' class="btn text-white py-2 px-4" size="medium" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center text-center ma-2 pa-4 rounded-lg">
              <v-icon start size="30">mdi-text-box-edit</v-icon>
              <h3 class="font-weight-medium mb-2">Colors DESIGN</h3>
              <v-btn :to='"/ColorsDesign"' class="btn text-white py-2 px-4" size="medium" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-col>
        </v-row>

        <v-carousel class="d-md-none" :show-arrows="false"> <!-- Slider only on mobile -->
          <v-carousel-item v-for="(tool, i) in tools" :key="i" class="tools my-5">
            <v-sheet class="tool-box d-flex flex-column justify-space-around align-center text-center ma-2 pa-4 rounded-lg">
              <v-icon :start="tool.icon.start" size="40">{{ tool.icon.name }}</v-icon>
              <h3 class="font-weight-medium mb-2">{{ tool.title }}</h3>
              <v-btn :to="tool.route" class="btn text-white bg-primary py-2 px-4" size="large" variant="elevated">Go</v-btn>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>

      <v-responsive class="bg-space w-100 h-100">
        <ul class="squares w-100 h-100">
          <li class="d-block"></li>
          <li class="d-block"></li>
          <li class="d-block"></li>
          <li class="d-block"></li>
          <li class="d-block"></li>
          <li class="d-block"></li>
          <li class="d-block"></li>
          <li class="d-block"></li>
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
        { icon: { name: 'mdi-text-box-edit', start: true }, title: 'Colors DESIGN', route: '/ColorsDesign' },
      ],
    };
  },
};
</script>

<style scoped>
@import '/src/assets/style.css';
</style>