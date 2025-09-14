<template>
    <q-btn-dropdown flat color="dark" style="padding: 0;" dropdown-icon="more_vert">
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
    <clinic-cases-get-one-menu-confirm :confirm="confirm" @hide="confirm = false" @delete="onDelete" ></clinic-cases-get-one-menu-confirm>
</template>

<script setup lang="ts">
import ClinicCasesGetOneMenuConfirm from './ClinicCasesGetOneMenuConfirm.vue';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ApiClinicCasesRepository } from 'src/repository/ClinicCases';
import { useClinicStore } from 'src/stores/ClinicCaseStore';
import { usePatientStore } from 'src/stores/PatientStore';

interface Props {
    id: string
}

const patient_id = inject('patient_id') as string

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'deleted'):void
}>()
const confirm = ref<boolean>(false)
const clinicCaseRepository = new ApiClinicCasesRepository(ApiV1)
const clinicStore = useClinicStore()
const patientStore = usePatientStore()
const router = useRouter()

function onDelete(){
    clinicCaseRepository.deleteClinicCase(props.id).then(()=>{
        showSuccessNotify('Caso clinico Eliminado Exitosamente')
        patientStore.removeClinicCaseOfPatient(patient_id || '', props.id)
        clinicStore.removeClinicCaseById(props.id)
    }).catch(()=>{
        showErrorSimplyNotifyMessage('Ha ocurrido un error al eliminar el caso clinico')
    }).finally(()=>{
        confirm.value = false
        emits('deleted')
    })
}

async function onUpdate(){
    await router.push({
        name: 'update_clinic_case',
        params:{
            patient_id: patient_id,
            clinic_case_id: props.id
        }
    })
}

</script>