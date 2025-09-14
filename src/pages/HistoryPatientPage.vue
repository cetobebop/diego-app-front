<template>
    <history-patient-cards :patient_id="patient_id"></history-patient-cards>
</template>


<script setup lang="ts">
import HistoryPatientCards from 'src/components/HistoryPatientCards.vue';

defineProps<{
    patient_id: string
}>();
</script>