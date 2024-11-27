<script setup></script>
<template>
  <div class="grid-container">
    <div class="grid-row">
      <div class="grid-col">
        <div class="usa-card__container">
          <div class="usa-card__header">
            <h4 class="usa-card__heading">Filters</h4>
          </div>
          <div class="usa-card__body">
            <FilterGrid :columns="2" />
          </div>
          <div class="usa-card__footer">
            
          </div>
        </div>
      </div>
    </div>
    <div class="grid-row">
      <div class="grid-col">
        <chartGrid />
      </div>
    </div>
  </div>
</template>