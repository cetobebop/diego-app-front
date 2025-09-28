<template>
 
    <div>
       <span style="font-weight: 700; margin: 0 3px;"> {{countOfClinicCases}} </span> Historias Clinicas <span class="text-weight-bold">:</span>
    </div>    
   
    <q-scroll-area visible class="scroll-area">
        <div class="">
            
            <div class="row clinic-cases" >
                <clinic-cases-card-skeleton v-if="loading" ></clinic-cases-card-skeleton>
                <clinic-cases-card-not-found class="col-12" v-if="!loading && countOfClinicCases === 0"></clinic-cases-card-not-found>
                <template v-if="!loading">
                    <template v-for="(clinicCase, index) in clinicCasesStore.getClinicCases" :key="index">
                        <div class="my-card col-xs-12 col-sm-11  q-mb-sm   cursor-pointer" style="min-width: 130px;">
                            <q-card  bordered flat>
                                <q-card-section class="row" @click="onClick(clinicCase.id)">
                                    <div class="col-xs-12 col-sm-10">
                                        <div class="title  text-weight-bold content-center q-pr-xs ">{{ clinicCase.title }}</div>
                                        
                                        <div class="text-subtitle2 content-center  "><span>Nro:</span> {{ clinicCase.caseNumber}}</div>
                                    
                                        <div class="text-subtitle2 content-center"><span>Inicio:</span> {{ clinicCase.beginningDate}}</div>
                                        
                                    </div>
                                    <div class="col-xs-12 col-sm-2 btn-file">
                                        <q-btn unelevated icon="description" @click.stop="()=>{}" @click="onSeePDF(clinicCase.url)" style="height: 100%; width: 100%;" color="dark"></q-btn>
                                    </div>                            
                                </q-card-section>
                            </q-card>
                        </div>
                    </template> 
                </template>
            </div>
        </div>
    </q-scroll-area>
    <ClinicCasesGetOneDialog @update:hide="onHide" :show="showDialog" :id="selectedClinicCaseId" />
</template>

<script setup lang="ts">
import ClinicCasesGetOneDialog from './ClinicCasesGetOneDialog.vue';
import ClinicCasesCardSkeleton from './ClinicCasesCardSkeleton.vue';
import ClinicCasesCardNotFound from './ClinicCasesCardNotFound.vue';

import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiClinicCasesRepository } from 'src/repository/ClinicCases';
import { useClinicStore } from 'src/stores/ClinicCaseStore';
import { onMounted, computed, ref } from 'vue';
// import { showErrorSimplyNotify } from 'src/utils/showNotifyError';
import { usePatientStore } from 'src/stores/PatientStore';
// import { useRouter } from 'vue-router';


interface Props {
    id: string
}

const props = defineProps<Props>()

const clinicCasesRepository = new ApiClinicCasesRepository(ApiV1)
const clinicCasesStore = useClinicStore()
const patientStore = usePatientStore()
const countOfClinicCases = computed(()=>{
    return patientStore.getPatientById(props.id)?.getNumberOfClinicCases()
})
// const router = useRouter()
const showDialog = ref(false)
const selectedClinicCaseId = ref<string>('')
const loading = ref(false)

onMounted(()=>{
    loading.value = true
    clinicCasesRepository.getClinicCases(props.id, {}).then(res => {
        clinicCasesStore.setClinicCases(res.clinicCases)
    }).catch(()=>{
        clinicCasesStore.setClinicCases([])
        // showErrorSimplyNotify(error)
    }).finally(()=>{
        loading.value = false
    })
})

function onClick(clinic_case_id: string){
    // router.push({ name: 'one_clinic_case', params: { patient_id: props.id, clinic_case_id } }).then(()=>{}).catch(()=>{})
    selectedClinicCaseId.value = clinic_case_id
    showDialog.value = true
}

function onSeePDF(url: string){
    open(url, '_blank')
}

function onHide() {
    showDialog.value = false
    selectedClinicCaseId.value = ''
}


</script>


<style scoped>

.title{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

span{
    font-weight: 600;
}

.mx{
    margin: 0 5px;
}

.ml{
    margin-left: 5px;
}

.scroll-area{
    height: 110px;
    width: 100%;
}




@media (600px < width) {
    
    .my-card{
        margin-right: 5px;
    }

    
}

@media (600px > width) {
    
    .scroll-area{
        height: 150px;
    }
    
    .btn-file{
        margin-top: 10px;
    }
}

</style>