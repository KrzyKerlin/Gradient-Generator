import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import GradientGenerator from "../views/gradientGenerator.vue";
import ColorPalette from "../views/colorPalette.vue";
import FontsList from "../views/fontsList.vue";
import WebpConverter from "../views/webpConverter.vue";
import ColorsDesign from "../views/colorsDesign.vue";
import Buttons from "../views/buttons.vue";
import CodeNotes from "../views/codeNotes.vue";
import IconsList from "../views/iconsList.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/gradientGenerator", component: GradientGenerator },
  { path: "/colorPalette", component: ColorPalette },
  { path: "/fontsList", component: FontsList },
  { path: "/webpConverter", component: WebpConverter },
  { path: "/colorsDesign", component: ColorsDesign },
  { path: "/buttons", component: Buttons },
  { path: "/codeNotes", component: CodeNotes },
  { path: "/iconsList", component: IconsList },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
