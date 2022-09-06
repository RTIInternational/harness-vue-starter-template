<template>
  <div id="app">
    <router-view :key="$route.name" />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss"></style>
