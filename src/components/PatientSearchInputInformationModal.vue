<template>
     <q-dialog v-model="show" persistent @hide="onHide">
      <q-card>
        <q-card-section>
          <div class="title">El Buscador de Pacientes</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            El buscador de pacientes te permite encontrar rápidamente a un paciente existente en la base de datos. Criterios de busqueda:
            <ul>
              <li><strong>Nombre parcial o completo</strong></li>
              <li><strong>Cédula de identidad parcial o completo</strong></li>
              <li><strong>Edad</strong></li>
              <li><strong>Sexo (masculino o femenino)</strong></li>
              <li><strong>Fecha de inicio (formato DD-MM-AAAA o !MES)</strong></li>
            </ul>
            Ejemplos:
            <ul>
              <li><strong>Nombre:</strong> "Juan", "María", "Ana Góm" (nombre parcial)</li>
              <li><strong>Cédula:</strong> "12345678", "87321" (cédula parcial)</li>
              <li><strong>Edad:</strong> "30", "45"</li>
              <li><strong>Sexo:</strong> "masculino", "femenino"</li>
              <li><strong>Fecha de inicio:</strong> "15-08-2023", "!MARZO", "!diciembre"</li>
              <li><strong>Combinación:</strong> "Ana 30458 femenino", "Juan 15-08-2023"</li>              
            </ul>
            Al ingresar los términos de búsqueda, el sistema mostrará una lista de resultados coincidentes.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Entendido" @click="onHide" color="dark" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    modal: boolean
}
interface Emits{
    (e: 'update:hide'): void,
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const show = computed(()=> props.modal)

function onHide(){
    emits('update:hide')
}
</script>

<style scoped>
.title{
    font-size: 0.8em;
    font-weight: 700;
    
}
</style>