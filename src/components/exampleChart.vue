<template>
  <div class="row">
    <div class="col">
      <h5>Chart Data</h5>
      <pre>
        <code>
          {{ harness.getChartData(chart.key) }}
        </code>
      </pre>
    </div>
    <div class="col">
      <h5>Filters:</h5>
      <ul>
        <li v-for="(filter, idx) in harness.filters" :key="idx">
          <strong>{{ filter.label }}</strong
          >:
          {{
            harness.getLabelForSelectedOption(filter.key) ||
            harness.getFilter(filter.key)
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useHarnessComposable } from "@rtidatascience/harness-vue";
defineProps({
  chart: {
    type: Object,
    required: true,
  },
});
const harness = useHarnessComposable();
</script>
