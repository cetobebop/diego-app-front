<template>
    <div id="patient-form-create" tabindex="-1">
        <div id="title">
            <q-icon size="md" name="person_add"/>
            Actualizar Paciente
        </div>
        
        <q-form @submit.prevent="onSubmit" @reset="onReset">
            <div class="row">
                <div class="col-xs-12 col-sm">
                    <q-input outlined color="dark" :rules="rules.name" v-model="name" label="Nombre del Paciente:"></q-input>
                    <q-input class="mt" outlined color="dark" :rules="rules.tlf" v-model="phoneNumber" @update:model-value="onInputPhone" label="Teléfono:" type="tel">
                        <template v-slot:prepend>
                            <q-icon name="phone" />
                        </template>
                    </q-input>
                    <q-select class="mt" disable outlined :rules="rules.sex" color="dark" v-model="sex" :options="sexOpt" label="Genero:"></q-select>   
                    
                </div>
                
                <div id="col-der" class="col-xs-12 col-sm ">
                    <q-input outlined color="dark" :rules="rules.ci" v-model="ci" label="Cedula de identidad:" type="number"></q-input>
                    <q-input class="mt" outlined color="dark" :rules="rules.birthdate" v-model="birthdate" label="Nacimiento:" @update:model-value="onInputBirthdate" type="date">
                        <template v-slot:prepend>
                            <q-icon name="cake" />
                        </template>
                    </q-input>
                    <q-input class="mt" disable outlined :rules="rules.beginningDate" v-model="beginningDate" label="Inicio:" type="date"></q-input>
                </div>
            </div>

            <div class="mt">
                <q-input outlined color="dark" :rules="rules.address" autogrow v-model="address" label="Dirección:" type="text">
                    <template v-slot:prepend>
                        <q-icon name="house" />
                    </template>
                </q-input>
            </div>
            <div class="container-btn q-mt-md" >
                <q-btn unelevated color="dark" :loading="loading" type="submit" icon="add" class="q-py-lg q-px-sm text-weight-bold" style="min-width: 250px; max-width: 250px;" label="Actualizar"></q-btn>
                <div>
                    <q-btn unelevated color="white" icon="clear" type="reset" class="q-py-lg q-px-sm text-weight-bold" text-color="dark" outline style="min-width: 250px; max-width: 250px;" label="Descartar"></q-btn>
                </div>
               
            </div>

        </q-form>
    </div>
</template>


<script setup lang="ts">


import { onMounted, ref } from 'vue';
import { patientCreateInputRules } from 'src/utils/inputRules';
import { showErrorSimplyNotify, showErrorSimplyNotifyMessage } from 'src/utils/showNotifyError';
import { PatientDto } from 'src/Dto/PatientDto';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiPatientsRepository } from 'src/repository/Patients';
import { showSuccessNotify } from 'src/utils/showNotifySuccess';
import { calculateDateFromX } from 'src/utils/caculateDateFromX';
import { useRouter } from 'vue-router';
import { convertDomainServerDateToNormalDate } from 'src/utils/convertDomainServerDateToNormalDate';
import { Patient } from 'src/Domain/Patient';


const rules = patientCreateInputRules()


type SelectSex = { label: 'Masculino' | 'Femenino', sex: Sex}

type Sex = 'femenino' | 'masculino'

interface Props {
    id: string
}

const router = useRouter();
const props = defineProps<Props>()

const patientRepository = new ApiPatientsRepository(ApiV1)


const name = ref<string>('')
const ci = ref<string>('')
const phoneNumber = ref<string>('')
const address = ref<string>('') 
const birthdate = ref<string>('')
const age = ref<number>(0)
const sex = ref<SelectSex | null>(null)
const beginningDate = ref<string>('')
const loading = ref(false)




const sexOpt =  [
    {
        label: 'Masculino',
        sex: 'masculino',
    },
    {
        label: 'Femenino',
        sex: 'femenino',
    }
]

onMounted(()=>{
    asingDefaultPatientValue().then(()=>{}).catch(()=>{
        showErrorSimplyNotifyMessage('Error al cargar los datos del paciente')
        router.push({
            name: 'home'
        }).then(()=>{}).catch(()=>{})
    })
})

let phonePrev = ''
function onInputPhone(){
    if(phoneNumber.value){
        if(phoneNumber.value.length > 12) phoneNumber.value = phonePrev + phoneNumber.value[phoneNumber.value.length - 1]
        if(!/^([0-9]*-?[0-9]*)$/.test(phoneNumber.value)) phoneNumber.value = phonePrev
        if(!(/-/g).test(phoneNumber.value) && phoneNumber.value.length === 4 && phonePrev.length < 4) phoneNumber.value += '-'
        if(phoneNumber.value.length < 12) phonePrev = phoneNumber.value
    }
}

async function asingDefaultPatientValue(){
    const { patient } = await patientRepository.getPatientById(props.id)
    const patientFound = new Patient(patient)
    if(!patientFound) {
        showErrorSimplyNotifyMessage('Paciente no encontrado')
        await router.push({
            name: 'home'
        })
        return
    }
    name.value = patientFound.getName()
    ci.value = patientFound.getCi()
    phoneNumber.value = patientFound.getPhoneNumber()
    address.value = patientFound.getAddress()
    birthdate.value = convertDomainServerDateToNormalDate(patientFound.getBirthdate())
    beginningDate.value = convertDomainServerDateToNormalDate(patientFound.getBeginningDate())
    age.value = calculateDateFromX(birthdate.value, new Date().toString())
    sex.value = {
        label: patientFound.getSex() as "Masculino" | "Femenino",
        sex: patientFound.getSex().toLowerCase() as Sex
    }
}

function onReset(){
    asingDefaultPatientValue().then(()=>{}).catch(()=>{})
}



function onInputBirthdate(){
   try {
        const calculatedAge = calculateDateFromX(birthdate.value, new Date().toString())
        age.value = calculatedAge
   } catch {
        console.log('')
   }
}



function updatePatient(){
    if(!sex.value) return showErrorSimplyNotifyMessage('Sexo sin definir')
    const patient = new PatientDto({
            address: address.value,
            age: age.value,
            beginningDate: beginningDate.value,
            birthdate: birthdate.value,
            ci: ci.value,
            name: name.value,
            phoneNumber: phoneNumber.value,
            sex: sex.value.sex,
        }
    )

    loading.value = true
            
    patientRepository.updatePatient(props.id, patient.getPatientToServer()).then(async ()=>{
        showSuccessNotify('Paciente actualizado satisfactoriamente')
        await router.push({
            name: 'one_patient',
            params:{
                id: props.id
            }
        })
    }).catch(error=>{
        showErrorSimplyNotify(error)
    }).finally(()=>{
        loading.value = false
    })


  

    
}

function onSubmit(){
   
    updatePatient()
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

#patient-form-create{
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