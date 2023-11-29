# Harness-Vue Starter Template

This repository contains the official starter template for building new Vue 3 applications using RTI Center for Data Science's [Harness-Vue](https://harnessjs.org) and [Harness-Vue-Bootstrap](https://bootstrap.harnessjs.org) libraries. 

## Dev Setup
Run `npm install` to install dependencies.
Run `npm run dev` to start the hot-reload dev server.

## What's Included
This starter template includes the following:
* A Vue 3 application created with [create-vue]((https://github.com/vuejs/create-vue)) using [vite]((https://vitejs.dev/guide/))
* Preconfigured with [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
    * `npm run lint` to run linting and fix issues
    * eslint configuration located at `.eslintrc.cjs`
    * prettier configuration located at `.prettierrc.json`
* Preconfigured testing with [vitest](https://vitest.dev/)
    * `npm run test` for a single run, `npm run test:watch` to rerun tests on code change
    * an example test is located at `tests/test.spec.js`
* Sass support with a preconfigured style entry point located at `src/styles/main.scss`
* [Harness-Vue](https://www.harnessjs.org) preinstalled, including the [options API global mixin](https://harnessjs.org/introduction/getting-started.html#options-api-mixin)
* [Harness-Vue-Bootstrap](https://bootstrap.harnessjs.org) preinstalled including the [component library plugin](https://bootstrap.harnessjs.org/introduction/#plugin-installation) to globally register all components
* An example Harness-Vue page definition located at `src/harness-pages/examplePage` using Harness-Vue-Bootstrap form controls
* An example page component using Harness-Vue-Bootstrap layouts at `src/components/examplePage.vue`
* An example chart component using the composition API and the [Harness-Vue composable](https://harnessjs.org/introduction/getting-started.html#composable)
* Documentation on CI/CD best practices and examples located under `ci-examples`
* Documentation on and examples of dockerized and/or static site deployment located under `deployment`


## Removing Vue Router
If you'd like to run this application without vue-router (for apps that only require a single harness page and want easier integration), do the following:
* `npm remove vue-router` to remove the dependency
* in `main.js`, remove `vue-router` from the app and from harness
    * remove the line that reads `import router from "./router";`
    * remove the line that reads `app.use(router);`
    * change the line that reads `app.use(harnessPlugin, { pinia, router, pages });` to `app.use(harnessPlugin, { pinia, pages });`
* change the contents of `App.vue` to the following:

```vue
<script setup>
import { useHarnessComposable } from "@rtidatascience/harness-vue";
import { onBeforeMount } from "vue";
const harness = useHarnessComposable();
onBeforeMount(() => {
  harness.loadData();
});
</script>
<template>
  <div id="app">
    <component :is="harness.getPageDefinition.pageComponent" />
  </div>
</template>
```

This uses the page component specified by your harness-vue page definition, and runs `loadData` before mount similar to how it is run in a router navigation guard in apps that use vue-router.