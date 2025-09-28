<template>
    <h1 class="text-center q-ma-md" style="line-height: 1.5em; font-size: 1.5em; font-weight: 700;">Historial de Cambios</h1>
    <span  style="line-height: 1.5em; padding: 0 20px ; display: block; text-indent: 0; font-size: 1em; font-weight: 400;">Aqui se muestran todos los cambios realizados en el paciente, los puntos verdes representan los campos que se diferencian de la versión actual del paciente.</span>

    <div class="q-px-md justify-center q-mt-sm q-gutter-sm row">
        <template v-for="hispat in historyPatients" :key="hispat.value.id">
            
            <q-card class="col-8" v-if="hispat.changes !== null " style="min-width: 280px;" bordered flat>
                
                <q-card-section>
                    <div class="">
                        <div class="title row items-center content-center">
                            {{ hispat.value.name }} <q-badge v-if="hispat.changes?.propModified.includes('name')" style="max-height: 10px; margin-left: 5px;" rounded color="green" />
                        </div>
                    </div>
                </q-card-section>
                <q-separator inset></q-separator>
                <q-card-section>

                    <div class="row items-center content-center">
                        <q-chip  square  color="dark" class="text-weight-medium" text-color="white" size="sm" >
                            Actualizado <span class="text-weight-bold">:</span>
                        </q-chip> {{ hispat.value.updatedAt }} 
                    </div>
                  
                    <div class="row items-center content-center">
                        <q-chip  square  color="dark" class="text-weight-medium" text-color="white" size="sm" >
                            Cedula <span class="text-weight-bold">:</span>
                        </q-chip> {{ hispat.value.ci }} <q-badge v-if="hispat.changes?.propModified.includes('ci')" style="max-height: 10px; margin-left: 5px;" rounded color="green" />
                    </div>
                        
                    <div class="row items-center content-center">
                        <q-chip square color="dark" text-color="white" size="sm" >
                            Tlf <span class="text-weight-bold">:</span>
                        </q-chip> {{ hispat.value.phoneNumber }} <q-badge v-if="hispat.changes?.propModified.includes('phoneNumber')" style="max-height: 10px; margin-left: 5px;" rounded color="green" />
                    </div>
                    <div class="row items-center content-center">
                        <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                            Nacimiento <span class="text-weight-bold">:</span>
                        </q-chip> {{ hispat.value.birthdate }} <q-badge v-if="hispat.changes?.propModified.includes('birthdate')" style="max-height: 10px; margin-left: 5px;" rounded color="green" />
                    </div>
                    
                    <div class="row items-center content-center">
                        <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                            Dirección <span class="text-weight-bold">:</span>
                        </q-chip>
                        {{ hispat.value.address }} <q-badge v-if="hispat.changes?.propModified.includes('address')" style="max-height: 10px; margin-left: 5px;" rounded color="green" />
                    </div>
                    <div class="q-mt-sm">
                        <q-btn label="Restablecer Paciente" @click="onUpdate(hispat.value)" icon="add" unelevated color="dark" style="padding: 10px;  font-weight: 700;"></q-btn>
                    </div>
                </q-card-section>
            
            </q-card>
        </template>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiHistoryPatientsRepository } from 'src/repository/HistoryPatients';
import { useRouter } from 'vue-router';
import { PatientSnapshotAdapter } from 'src/adapters/PatientSnapshotAdapter';
import { ApiPatientsRepository } from 'src/repository/Patients';
import { PatientDto } from 'src/Dto/PatientDto';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';

interface PatientSnapshot{
    id: string | undefined;
    name: string | undefined;
    ci: string | undefined;
    birthdate: string;
    address: string | undefined;
    phoneNumber: string | undefined;
    updatedAt: string;

} 

interface Changes  {
    changes: {
        [k: string]: string | number;
    };
    propModified: string[];
}

interface PatientSnapshotAndChanges{
    value: PatientSnapshot;
    changes: Changes | null
}




const historyPatientRepository = new ApiHistoryPatientsRepository(ApiV1)
const patientRepository = new ApiPatientsRepository(ApiV1) 
const router = useRouter()

const props = defineProps<{
    patient_id: string
}>();

const historyPatients = ref<PatientSnapshotAndChanges[]>([])

async function mergeObjects(hispat: PatientSnapshot){
    const {patient} = await patientRepository.getPatientById(props.patient_id)
    const newPat = Object.assign(patient, hispat)
    return new PatientDto(newPat).getPatientToServerHistoryPatient()
}

async function onUpdate(hispatData: PatientSnapshot){
    
    const updatePatient = await mergeObjects(hispatData)
    try {

        await patientRepository.updatePatient(props.patient_id, updatePatient)
        showSuccessNotify('Actualizado correctamente')
    } catch {
        showErrorSimplyNotifyMessage('Hubo un error al actualizar')
    }finally{
        router.push({
            name: 'one_patient',
            params: {
                id: props.patient_id
            }
        }).then(()=>{}).catch(()=>{})
    }
}

onMounted(async ()=>{
    try {
        const response = await historyPatientRepository.getHistoriesPatientsByPatientId(props.patient_id)
        const {patient} = await patientRepository.getPatientById(props.patient_id)
        if(!patient) return 
        response.histPat.changes.pop()
        historyPatients.value = response.histPat.changes.map(change => {
            const p = new PatientSnapshotAdapter(change)
            const changes = p.getChanges(patient)

            return {
                value: p.getPatientSnapshot(),
                changes
            }

        }).reverse()

    } catch  {
        router.push({
            name: 'home'
        }).then(() => {}).catch(() => {}).finally(() => {
            historyPatients.value = []
        })
    }
})

</script>

<style scoped>
.title{
    font-size: 1em;
    font-weight: 700;
    
}

</style>