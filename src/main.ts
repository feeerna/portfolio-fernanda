//-- Project --//
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

//-- Vuetify --//
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./style.css";

import "sweetalert2/dist/sweetalert2.min.css";

import LayoutOne from "./Layout/LayoutOne.vue";
//@ts-ignore
import { VDateInput } from "vuetify/labs/VDateInput";
import { es } from "vuetify/locale";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
  },
  components: {
    VDateInput,
    ...components,
  },
  locale: {
    locale: "es",
    fallback: "es",
    messages: { es },
  },
  // components,
  directives,
});

const pinia = createPinia();
const app = createApp(App);

app.component("LayoutOne", LayoutOne);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
