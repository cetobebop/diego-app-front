<template>
    <clinic-case-form-update :patient_id="patient_id" :clinic_case_id="clinic_case_id"></clinic-case-form-update>
</template>

<script setup lang="ts">
import ClinicCaseFormUpdate from 'src/components/ClinicCaseFormUpdate.vue';

interface Props {
    patient_id: string,
    clinic_case_id: string
}

defineProps<Props>()




</script>