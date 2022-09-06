<template>
  <div class="container">
    <div class="card filter-card">
      <h5 class="card-header">Filters</h5>
      <div class="card-body">
        <FilterGrid :columns="2" />
      </div>
    </div>
    <br />

    <chartGrid />
  </div>
</template>

<script>
export default {
  name: "ExamplePage",
};
</script>
<style scoped>
.card {
  margin-top: 1rem;
}
</style>
