<template>
    <patient-form-update :id="id"></patient-form-update>
</template>

<script setup lang="ts">
import PatientFormUpdate from 'src/components/PatientFormUpdate.vue';

interface Props {
    id: string
}

defineProps<Props>()


</script>