<template>
  <div class="row">
    <div class="col">
      <h5>Chart Data</h5>
      <pre>
        <code>
          {{ getChartData(chart.key) }}
        </code>
      </pre>
    </div>
    <div class="col">
      <h5>Filters:</h5>
      <ul>
        <li v-for="(filter, idx) in filters" :key="idx">
          <strong>{{ filter.label }}</strong
          >:
          {{ getLabelForSelectedOption(filter.key) || getFilter(filter.key) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExampleChart",
  props: {
    chart: {
      required: true,
      type: Object,
    },
  },
};
</script>
