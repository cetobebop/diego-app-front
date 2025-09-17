<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      @update:model-value="onUpdate"
      :disable="!patientData.exist"
      v-model="current"
      color="dark"
      :max="patientData.count"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePatientStore } from 'src/stores/PatientStore';
import { ApiV1 } from 'src/utils/SingletonApiInstances';
import { ApiPatientsRepository } from 'src/repository/Patients';


const patientStore = usePatientStore()
const apiPatients = new ApiPatientsRepository(ApiV1)
const patientData = ref({
  exist: false,
  count: 1
}) 
const current = ref(1);
const before = ref(0)


watch(() => patientStore.getPatientsTotal, (newTotal) => {
 
  if (newTotal) {
    patientData.value.exist = true;
    patientData.value.count = Math.ceil(newTotal / 30);
  } else {
   
    patientData.value.exist = false;
    patientData.value.count = 1;
  }
}, { immediate: true });

function onUpdate(e: number){


    

   const current = e;
   const desc = !(current - 1) ? 0 : current - 1


    const skip = current > before.value ? (current - 1) * 30 : (desc) * 30
  
    apiPatients.getPatients({ skip }).then(res=>{
        patientStore.setPatients(res.patients)
        patientData.value.exist = true
        patientData.value.count = Math.ceil(res.total / 30)
    }).catch(()=>{
        patientData.value.exist = false
        patientData.value.count = 0
        patientStore.setPatients([])
  
    })

    before.value = current - 1
    // console.log('before 2: ', before.value)
}

</script>