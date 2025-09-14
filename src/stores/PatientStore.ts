import type { IPatientRaw } from 'src/interfaces/IPatient.t';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { Patient } from 'src/Domain/Patient';
import { computed, ref } from 'vue';


export const usePatientStore = defineStore('patient', ()=>{
    
    const patients = ref<Patient[]>([]);
    const patientsTotal = ref(0);

    const getPatientsTotal = computed(() => patientsTotal.value);

    const getPatients = computed(() => patients.value.map(e => e.getPatient()));

    function clearPatients() {
        patients.value = [];
        patientsTotal.value = 0;
    }

    function setPatientsTotal(total: number) {
        patientsTotal.value = total;
    }

    function setPatients(newPatients: IPatientRaw[]) {
        patients.value = newPatients.map(e => new Patient(e));
    }

    function setOnePatient(newPatient: IPatientRaw) {
        const index = patients.value.findIndex(patient => patient.getId() === newPatient.id);
        if (index !== -1) {
            patients.value[index] = new Patient(newPatient);
        } else {
            patients.value.unshift(new Patient(newPatient));
        }
    }
    
    function getPatientById  (id: string) {
        return patients.value.find(patient => patient.getId() === id) || null;
    };

    function removePatientById  (id: string) {
        const newPatientList = patients.value.filter(patient => patient.getId() !== id)
        patients.value = newPatientList
    };

    function removeClinicCaseOfPatient(patient_id:string, clinic_case_id:string){
        const patient = getPatientById(patient_id)
        if(!patient) return null
        patient.removeClinicCase(clinic_case_id)
    }


    return {
        patients,
        getPatients,
        getPatientsTotal,
        setPatients,
        setOnePatient,
        getPatientById,
        removePatientById,
        removeClinicCaseOfPatient,
        setPatientsTotal,
        clearPatients
    };
});



if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePatientStore, import.meta.hot));
}