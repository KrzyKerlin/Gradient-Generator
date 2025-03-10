import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import BackButton from "@/components/backLogo.vue";
import Footer from "@/components/footer.vue";

const app = createApp(App);

app.component('BackButton', BackButton);
app.component('Footer', Footer);

app.use(router);
app.use(vuetify);
app.mount('#app');
