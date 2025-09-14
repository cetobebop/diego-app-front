<template>

    <div class="container-cards">
        <patient-cards-loading-skeletons v-if="loading"></patient-cards-loading-skeletons>
        <div v-if="!loading">
            <patient-cards-not-found v-if="!patientStore.getPatients.length"></patient-cards-not-found>
            <TransitionGroup name="card" tag="div" class="q-px-md justify-center q-gutter-sm row wrap ">
                <template v-for="(patient, index) in patientStore.getPatients" :key="index">
                    <div class="col-xs-10 col-sm-4 col-md-3 cursor-pointer" style="min-width: 250px;">
                        <q-card @click="onClick(patient.id)" bordered flat>
                            <q-card-section>
                                <div class="title">
                                    {{ patient.name }}
                                </div>
                            </q-card-section>
                            <q-separator inset></q-separator>
                            <q-card-section>
                                    <div class="row no-wrap items-center">
                                        <div class="col ellipsis">
                                            <span>Tlf:</span> {{ patient.phoneNumber }}
                                        </div>
                                        <div class="col-auto  text-grey text-caption row no-wrap items-center">
                                            {{ patient.status }}
                                        </div>
                                    </div>
                                    <div>
                                        <span>Edad:</span> {{ patient.age }}
                                    </div>
                                    <div>
                                        <span>Inicio:</span> {{ patient.beginningDate }}
                                    </div>
                                    <div>
                                    <span>Nacimiento:</span> {{ patient.birthdate }}
                                    </div>
                                    <div>
                                        <span>Cedula:</span> {{ patient.ci }}
                                    </div>
                                    <div>
                                        <span>Genero:</span> {{ patient.sex }}
                                    </div>
                                    <div id="direccion">
                                        <span>Dirección:</span> {{ patient.address }}
                                    </div>
                                    
                            </q-card-section>
                        
                            <q-card-section>     
                                <q-btn color="dark" text-color="white"  
                                :disable="!patient.clinicCasesCount"  
                                unelevated :icon="patient.clinicCasesCount ? `visibility` : `visibility_off`" 
                                :label="patient.clinicCasesEnumeration" class="q-py-md full-width"/>   
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
            </TransitionGroup>
        </div>
    </div>

</template>


<script setup lang="ts">
import PatientCardsLoadingSkeletons from './PatientCardsLoadingSkeletons.vue';
import PatientCardsNotFound from './PatientCardsNotFound.vue';

import { ApiPatientsRepository } from 'src/repository/Patients';
import { usePatientStore } from 'src/stores/PatientStore';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import {  onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const patientStore = usePatientStore() 
const api = ApiV1
const apiPatients = new ApiPatientsRepository(api)
const router = useRouter()
const loading = ref<boolean>(false)
onMounted(()=>{
    loading.value = true
    apiPatients.getPatients({}).then(res=>{
        patientStore.setPatients(res.patients)
        patientStore.setPatientsTotal(res.total)
    }).catch(error=>{ 
        console.log('hubo un error en patientCards:', error)
    }).finally(()=>{
        loading.value = false
    })
})


async function onClick(id: string){
    await router.push({
        name: 'one_patient',
        params: {
            id
        }
    })
}

</script>

<style scoped>

span{
    font-weight: 700;
    font-size: 1em;

}

#direccion{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.title{
    font-size: 1em;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}


.container-cards{
    
    min-height: 50dvh;
}

.card-move, /* apply transition to moving elements */
.card-enter-active,
.card-leave-active {
  transition: all 0.2s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.card-leave-active {
  position: absolute;
}
</style>