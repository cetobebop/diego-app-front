<template>
    <div>
        <q-btn-dropdown style="padding: 0;" flat color="dark" dropdown-icon="more_vert">
            <q-list>
                <q-item clickable v-close-popup @click="confirm = true">
                    <q-item-section>
                        <q-item-label>Eliminar</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon color="red" name="delete" />
                    </q-item-section>
                </q-item>

                <q-item clickable v-close-popup  @click="onUpdate">
                    <q-item-section>
                        <q-item-label>Actualizar</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                        <q-icon color="dark" name="edit" />
                    </q-item-section>
                </q-item>
                
            </q-list>
        </q-btn-dropdown>
        <patient-get-one-menu-confirm :confirm="confirm" @hide="confirm = false" @delete="onDelete" ></patient-get-one-menu-confirm>
    </div>
</template>

<script setup lang="ts">
import PatientGetOneMenuConfirm from './PatientGetOneMenuConfirm.vue';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiPatientsRepository } from 'src/repository/Patients';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePatientStore } from 'src/stores/PatientStore';

interface Props {
    id: string
}

const props = defineProps<Props>()
const confirm = ref<boolean>(false)
const patientRepository = new ApiPatientsRepository(ApiV1)
const patientStore = usePatientStore()
const router = useRouter()

function onDelete(){
    patientRepository.deletePatient(props.id).then(()=>{
        showSuccessNotify('Paciente Eliminado Exitosamente')
        patientStore.removePatientById(props.id)
    }).catch(()=>{
        showErrorSimplyNotifyMessage('Ha ocurrido un error al eliminar al paciente')
    }).finally(()=>{
        confirm.value = false
        
        router.push({
            name: 'home'
        })
        .then(()=>{})
        .catch(()=>{})
        
        
    })
}

async function onUpdate(){
    await router.push({
        name: 'update_patient',
        params:{
            id: props.id
        }
    })
}

</script>