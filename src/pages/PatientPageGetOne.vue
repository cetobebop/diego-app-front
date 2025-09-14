<template>

<patient-get-one :id="props.id"></patient-get-one>

</template>



<script setup lang="ts">
import PatientGetOne from 'src/components/PatientGetOne.vue';

interface Props {
    id: string
}
const props = defineProps<Props>()

</script>