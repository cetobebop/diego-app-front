<template>
    
  <q-dialog v-model="active" @hide="$emit('hide')">
    <q-card class="q-pa-md">
      <q-card-section class="row items-center">
        <q-avatar icon="person_remove" color="dark" text-color="white" />
        <span class="q-ml-sm">Esta seguro de eliminar a este paciente?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" unelevated color="dark" v-close-popup />
        <q-btn label="Eliminar" @click="$emit('delete')" unelevated  color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
    
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';


interface Props {
    confirm: boolean
}

const props = defineProps<Props>()

const active = ref<boolean>(false)

watchEffect(()=>{

  active.value = props.confirm
})

// const active = computed(()=> props.confirm)





</script>