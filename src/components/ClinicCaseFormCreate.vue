<template>
    <div id="clinic-case-form-create">
        <div id="title">
            <q-icon size="md" name="person_add"/>
            Crear Historia Clinica
        </div>
        
        <q-form @submit.prevent="onSubmit" @reset="onReset">
            <div class="column">
                <q-input outlined color="dark"  :rules="rules.title" v-model="title" label="Titulo:"></q-input>
                <q-input class="mt" outlined color="dark" :rules="rules.caseNumber" v-model="caseNumber" label="Nro de Historia:" type="number"></q-input>
                <q-input class="mt" outlined color="dark" :rules="rules.beginningDate" v-model="beginningDate" label="Inicio:" type="date"></q-input>
                <q-file class="mt" color="dark" label="Historial (PDF)" :rules="rules.pdfFile" label-color="dark" outlined accept=".pdf" max-file-size="1000000" @rejected="onRejected" v-model="pdf">
                    <template v-slot:prepend>
                    <q-icon name="attach_file" />
                    </template>
                </q-file>
            </div>

          
            <div class="container-btn q-mt-md" >
                <q-btn unelevated color="dark" type="submit" :loading="loading" icon="add" class="q-py-lg q-px-sm text-weight-bold" style="min-width: 250px; max-width: 250px;" label="Crear"></q-btn>
                <div>
                    <q-btn unelevated color="white" icon="clear" type="reset" class="q-py-lg q-px-sm text-weight-bold" text-color="dark" outline style="min-width: 250px; max-width: 250px;" label="Descartar"></q-btn>
                </div>
                <button type="submit" style="display: none;" ref="submitHiddenBtn"></button>
            </div>

        </q-form>
    </div>
</template>

<script setup lang="ts">
import { clinicCaseCreateInputRules } from 'src/utils/inputRules';
import { showErrorSimplyNotify, showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';
import { ApiClinicCasesRepository } from 'src/repository/ClinicCases';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ref } from 'vue';
import { convertDateToServerFormat } from 'src/utils/convertDateToServerFormat';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { usePatientStore } from 'src/stores/PatientStore';
import { useRouter } from 'vue-router';

interface Props {
    patient_id: string
}

const clinicCasesRepository = new ApiClinicCasesRepository(ApiV1)
const patientStore = usePatientStore()
const router = useRouter()

const props = defineProps<Props>()
const beginningDate = ref<string>('')
const title = ref<string>('')
const pdf = ref<File | null>(null)
const caseNumber = ref<number | null>(null)
const rules = clinicCaseCreateInputRules()
const loading = ref(false)


function onReset(){
    beginningDate.value = ''
    title.value = ''
    caseNumber.value = null
    pdf.value = null
}

function onSubmit(){

    loading.value = true
    if(!caseNumber.value || !pdf.value){
        loading.value = false

        showErrorSimplyNotifyMessage('El pdf no paso los requisitos')
        return
    }
    
    clinicCasesRepository.createClinicCase({
        beginningDate: convertDateToServerFormat(beginningDate.value),
        caseNumber: caseNumber.value.toString(),
        patientId: props.patient_id,
        pdf: pdf.value,
        title: title.value
    }).then((res)=>{
        const patientFound = patientStore.getPatientById(props.patient_id)
        if(patientFound) patientFound.setClinicCaseId(res.clinicCase.id)
        showSuccessNotify('Historia Clinica Creada Exitosamente')
        router.push({
            name: 'one_patient',
            params:{
                id: props.patient_id
            }
        }).then(()=>{}).catch(()=>{})
    }).catch(err =>{
        showErrorSimplyNotify(err)
    }).finally(()=>{
        loading.value = false
    })
}

function onRejected(){
    showErrorSimplyNotifyMessage('El pdf no paso los requisitos')
}



</script>



<style scoped>

#title{
    font-size: 1.6em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    margin-bottom: 15px;
    margin-top: 15px;
    height: min-content;
}

#clinic-case-form-create{
    min-width: 290px;
    margin: 30px 20px 0 20px;
    border: solid rgba(0, 0, 0, 0.2) 1px;
    padding: 0 5px 20px 5px;
    border-radius: 5px;
}

.mt{
    margin-top: 10px;
}

#col-der{
    margin-left: 5px;
}

#patient-form-create:focus{
   outline: none;
}

.container-btn {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.container-btn .q-btn:last-child {
  margin-left: 5px;
}

@media (600px > width) {
    #col-der{
        margin-top: 20px;
        margin-left: 0px;   
    }
    .container-btn .q-btn:last-child {
        margin-left: 0px;
        margin-top: 5px;

    }
   
}

</style>