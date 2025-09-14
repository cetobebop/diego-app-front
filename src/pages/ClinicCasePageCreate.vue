<template>
<clinic-case-form-create :patient_id="patient_id"></clinic-case-form-create>
</template>

<script setup lang="ts">
import ClinicCaseFormCreate from 'src/components/ClinicCaseFormCreate.vue';

interface Props {
    patient_id: string
}
defineProps<Props>()
</script>