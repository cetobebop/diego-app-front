
<template>

    <div class="q-px-md justify-center q-mt-sm q-gutter-sm row wrap">
        <patient-get-one-skeleton v-if="!patient"></patient-get-one-skeleton>
        <q-card class="col-sm-8 col-xs-11"  v-if="patient" style="min-width: 280px;" bordered flat>
            <q-card-section>
                <div class="row">
                    <div class="title col-8 row content-center">
                        {{ patient.name }}
                    </div>
                    <div class="col row justify-end no-wrap row">
                        <q-btn :disable="patient.status !== 'Actualizado'" icon="history" style="padding: 0 3px;" @click="onGetHistory" unelevated></q-btn>
                        <patient-get-one-menu class="q-ml-sm row content-center  " :id="id"></patient-get-one-menu>
                    </div>
                </div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
                <div class="row no-wrap items-center">
                    <div class="col ellipsis content-center">
                        <q-chip  square  color="dark" class="text-weight-medium" text-color="white" size="sm" >
                            Cedula <span class="text-weight-bold">:</span>
                        </q-chip> {{ patient.ci }}
                    </div>
                    <div class="col-auto  text-grey text-caption row no-wrap items-center">
                        {{ patient.status }}
                    </div>
                </div>
                <div >
                    <q-chip square  color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Edad <span class="text-weight-bold">:</span>
                    </q-chip> {{ patient.age }}
                </div>
                <div class="row items-center content-center">
                    <q-chip square color="dark" text-color="white" size="sm" >
                        Tlf <span class="text-weight-bold">:</span>
                    </q-chip> {{ patient.phoneNumber }}
                </div>
                <div class="row items-centercontent-center">
                    <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Inicio <span class="text-weight-bold">:</span>
                    </q-chip> {{ patient.beginningDate }}
                </div>
                <div class="row items-center content-center">
                    <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Nacimiento <span class="text-weight-bold">:</span>
                    </q-chip> {{ patient.birthdate }}
                </div>
                <div class="row items-center content-center">
                    <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Sexo <span class="text-weight-bold">:</span>
                    </q-chip> {{ patient.sex }}
                </div>
                <div class="row items-center content-center">
                    <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Dirección <span class="text-weight-bold">:</span>
                    </q-chip>
                    {{ patient.address }}
                </div>
                <div class="q-mt-sm">
                    <clinic-cases-card :id="id"></clinic-cases-card>
                </div>
                <div class="q-mt-sm">
                    <q-btn label="Crear Historia" @click="onCreateClinicCase" icon="add" unelevated color="dark" style="padding: 10px;  font-weight: 700;"></q-btn>
                </div>
            </q-card-section>
            
        </q-card>
        
    </div>

</template>


<script setup lang="ts">
import PatientGetOneMenu from './PatientGetOneMenu.vue';
import PatientGetOneSkeleton from './PatientGetOneSkeleton.vue';
import ClinicCasesCard from './ClinicCasesCard.vue';
import { onMounted, ref, provide } from 'vue';
import { useRouter } from 'vue-router';
import { Patient, type IPatientDomain } from 'src/Domain/Patient';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiPatientsRepository } from 'src/repository/Patients';
import { showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';
import { usePatientStore } from 'src/stores/PatientStore';


interface Props {
    id: string
}


const props = defineProps<Props>()

provide('patient_id', props.id)

const router = useRouter()
const patient = ref<IPatientDomain | undefined>(undefined)
const patientStore = usePatientStore()

const patientRepository = new ApiPatientsRepository(ApiV1)

onMounted(()=> {
    patientRepository.getPatientById(props.id).then(res=>{
        const patientFound = new Patient(res.patient)
        patientStore.setOnePatient(res.patient)
        patient.value = patientFound.getPatient()
    }).catch(()=>{
        showErrorSimplyNotifyMessage('Hubo un error al buscar al paciente')
        router.push({
            name:'home'
        }).then(()=>{}).catch(()=>{})
    })

    
})

function onCreateClinicCase(){
    router.push({
        name: 'create_clinic_case',
        params: {
            patient_id: props.id
        }
    }).then(()=>{}).catch(()=>{})
}

function onGetHistory(){
    router.push({
        name: 'patient_history',
        params: {
            patient_id: props.id
        }
    }).then(()=>{}).catch(()=>{})
}
</script> 

<style scoped>

span{
    font-weight: 700;
    font-size: 1em;

}

#direccion{
   
    background: #eee;
    border-radius: 5px;
    padding: 5px;

}

.title{
    font-size: 1em;
    font-weight: 700;
    
}





</style>