import { createApp } from "vue";
import { createPinia } from "pinia";

// import { harnessPlugin, harnessMixin } from "@rtidatascience/harness-vue";
import {
  harnessPlugin,
  harnessMixin,
} from "../dev-packages/harness-vue/src/harness";

// import { harnessVueBootstrap } from "@rtidatascience/harness-vue-bootstrap";
import { harnessVueBootstrap } from "../dev-packages/harness-vue-bootstrap/src/harness-vue-bootstrap";

import pages from "./harness-pages/manifest";

import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "./styles/main.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(harnessPlugin, { pinia, router, pages });
app.mixin(harnessMixin(pinia));
app.use(harnessVueBootstrap);
app.use(router);
app.mount("#app");
