import { defineStore, acceptHMRUpdate } from 'pinia';
import { ClinicCase } from 'src/Domain/ClinicCase';
import type { IClinicCaseRaw } from 'src/interfaces/IClinicCase.t';

import { computed, ref } from 'vue';


export const useClinicStore = defineStore('clinic_case', ()=>{
    
    const clinicCase = ref<ClinicCase[]>([]);

    const getClinicCases = computed(() => clinicCase.value.map(e => e.getClinicCase()));

    function clearClinicCases() {
        clinicCase.value = [];
    }

    function setClinicCases(newPatients: IClinicCaseRaw[]) {
        clinicCase.value = newPatients.map(e => new ClinicCase(e));
    }

    function setOneClinicCase(newClinicCase: IClinicCaseRaw) {
        const index = clinicCase.value.findIndex(cliCase => cliCase.getId() === newClinicCase.id);
        if (index !== -1) {
            clinicCase.value[index] = new ClinicCase(newClinicCase);
        } else {
            clinicCase.value.unshift(new ClinicCase(newClinicCase));
        }
    }
    
    function getClinicCaseById(id: string) {
        return clinicCase.value.find(cliCase => cliCase.getId() === id) || null;
    };

    function removeClinicCaseById  (id: string) {
        const newClinicCaseList = clinicCase.value.filter(cliCase => cliCase.getId() !== id)
        clinicCase.value = newClinicCaseList
    };


    return {
        clinicCase,
        getClinicCases,
        setClinicCases,
        setOneClinicCase,
        getClinicCaseById,
        removeClinicCaseById,
        clearClinicCases
    };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClinicStore, import.meta.hot));
}