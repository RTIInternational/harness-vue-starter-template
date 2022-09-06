import { createApp } from "vue";
import { createPinia } from "pinia";

import {
  harnessPlugin,
  harnessMixin,
} from "../dev-packages/harness-vue/src/harness";
// } from "@rtidatascience/harness-vue";

// import { harnessVueBootstrap } from "../dev-packages/harness-vue-bootstrap/src/harness-vue-bootstrap";
import { harnessVueBootstrap } from "@rtidatascience/harness-vue-bootstrap";
import pages from "./harness-pages/manifest";

import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "./styles/main.scss";

const app = createApp(App);
const pinia = createPinia();
app.mixin(harnessMixin());
app.use(pinia);
// note: router has to come after harness ?
app.use(harnessPlugin, { pinia, router, pages });
app.use(harnessVueBootstrap);
app.use(router);

app.mount("#app");
