<template>
  <v-btn class="back-button" @click="goBack">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
  </v-btn>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-button {
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 1000;
  padding: 0;
  background: none;
  box-shadow: none;
  border: none;
}

.logo {
  width: 3rem;
  height: 3rem;
}
</style>
