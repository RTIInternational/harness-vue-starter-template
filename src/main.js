// vue, pinia, router imports
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

// harness-vue imports
// import { harnessPlugin } from "@rtidatascience/harness-vue";

// import { harnessVueBootstrap } from "@rtidatascience/harness-vue-bootstrap";
import { harnessPlugin } from "../dev-packages/harness-vue/src/harness";
import { harnessVueBootstrap } from "../dev-packages/harness-vue-bootstrap/src/harness-vue-bootstrap";
import pages from "./harness-pages/manifest";

// import style entrypoint
import "./styles/main.scss";
// import bootstrap's javascript
import "bootstrap";

// import main app component
import App from "./App.vue";

// create initial pinia instance
const pinia = createPinia();

// create initial vue instance
const app = createApp(App);

// install pinia
app.use(pinia);

// install harness-vue with router
app.use(harnessPlugin, { pinia, router, pages });

// install harness-vue-bootstrap
app.use(harnessVueBootstrap);

// install vue-router
app.use(router);

// mount the application to the dom
app.mount("#app");
