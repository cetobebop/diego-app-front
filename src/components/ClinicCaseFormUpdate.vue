
<template>

    <div id="clinic-case-form-create">
        <div id="title" class="row justify-center items-center content-center">
            <q-icon size="md" name="person_add" class="q-mr-xs"/>
            Actualizar Historia Clinica
        </div>
        
        <q-form @submit.prevent="onSubmit" @reset="onReset">
            <div class="column">
                <q-input outlined color="dark" ca :rules="rules.title" v-model="title" label="Titulo:"></q-input>
                <q-input class="mt" outlined color="dark" :rules="rules.caseNumber" v-model="caseNumber" label="Nro de Historia:" type="number"></q-input>
                <q-input class="mt" outlined :rules="rules.beginningDate" v-model="beginningDate" label="Inicio:" type="date"></q-input>
                <q-file class="mt" label="Historial (PDF)" label-color="dark" outlined accept=".pdf" max-file-size="1000000" @rejected="onRejected" v-model="pdf">
                    <template v-slot:prepend>
                    <q-icon name="attach_file" />
                    </template>
                </q-file>
            </div>

          
            <div class="container-btn q-mt-md" >
                <q-btn unelevated color="dark" type="submit" icon="add" class="q-py-lg q-px-sm text-weight-bold" style="min-width: 250px; max-width: 250px;" label="Actualizar"></q-btn>
                <div>
                    <q-btn unelevated color="white" icon="clear" type="reset" class="q-py-lg q-px-sm text-weight-bold" text-color="dark" outline style="min-width: 250px; max-width: 250px;" label="Descartar"></q-btn>
                </div>
                <button type="submit" style="display: none;" ref="submitHiddenBtn"></button>
            </div>

        </q-form>
    </div>

</template>

<script setup lang="ts">
import { showErrorSimplyNotify, showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';
import { onMounted, ref } from 'vue';
import { useRouter} from 'vue-router'
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiClinicCasesRepository } from 'src/repository/ClinicCases';
import { ClinicCase } from 'src/Domain/ClinicCase';
import { clinicCaseCreateInputRules } from 'src/utils/inputRules';
import { convertDateToServerFormat } from 'src/utils/convertDateToServerFormat';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { convertDomainServerDateToNormalDate } from 'src/utils/convertDomainServerDateToNormalDate';
import type { UpdateClinicCase } from 'src/interfaces/IClinicCase.t';

interface Props {
    patient_id: string,
    clinic_case_id: string
}

const props = defineProps<Props>()
const router = useRouter()

const beginningDate = ref<string>('')
const title = ref<string>('')
const pdf = ref<File | null>(null)
const caseNumber = ref<string>('')
const rules = clinicCaseCreateInputRules()


const clinicCaseRepository = new ApiClinicCasesRepository(ApiV1)

onMounted(()=> {
    defaultValues()
})

function defaultValues(){
    clinicCaseRepository.getClinicCaseById(props.clinic_case_id).then(res=>{
        const clinicCase = new ClinicCase(res.clinicCase).getClinicCase()
        beginningDate.value = convertDomainServerDateToNormalDate(clinicCase.beginningDate)
        title.value = clinicCase.title
        caseNumber.value = clinicCase.caseNumber.toString()
        pdf.value = null
    }).catch(()=>{
        showErrorSimplyNotifyMessage('Hubo un error al buscar el caso clínico')
        router.push({
            name:'home'
        }).then(()=>{}).catch(()=>{})
    })
}

function onReset(){
   defaultValues()
}

function onSubmit(){
    if(!caseNumber.value){
        showErrorSimplyNotifyMessage('El número de historia es obligatorio')
        return
    }
    const toUpdate: UpdateClinicCase = {
        beginningDate: convertDateToServerFormat(beginningDate.value),
        caseNumber: caseNumber.value.toString(),
        title: title.value,
    }

    if(pdf.value) {
        toUpdate.pdf = pdf.value
    }
    
    clinicCaseRepository.updateClinicCase(props.clinic_case_id, toUpdate).then(()=>{
        showSuccessNotify('Historia Clinica Actualizada Exitosamente')
        router.push({
            name: 'one_patient',
            params:{
                id: props.patient_id
            }
        }).then(()=>{}).catch(()=>{})
    }).catch(err =>{
        showErrorSimplyNotify(err)
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