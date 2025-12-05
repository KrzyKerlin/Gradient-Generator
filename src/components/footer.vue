<template>
  <v-footer class="footer d-flex flex-column">
    <div class="text-center w-100">
      {{ new Date().getFullYear() }} — <strong>by KrzychuK</strong>
      <div class="d-flex w-100 align-center">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="icon mx-4"
          size="small"
          variant="plain"
        >
        </v-btn>
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-codepen", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  background: transparent;
  color: #ffffffcc;
}
</style>
