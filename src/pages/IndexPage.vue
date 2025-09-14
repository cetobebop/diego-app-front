<template>
  <q-page class="">

    <div style="min-height: 300px;">
      <patient-search-input></patient-search-input>
      <patient-options-buttons></patient-options-buttons>
      <patient-cards></patient-cards>
      <patient-pagination></patient-pagination>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import { test } from 'src/test/main';
import PatientSearchInput from 'src/components/PatientSearchInput.vue';
import PatientOptionsButtons from 'src/components/PatientOptionsButtons.vue';
import PatientPagination from 'src/components/PatientPagination.vue';
import PatientCards from 'src/components/PatientCards.vue';
test();




</script>


