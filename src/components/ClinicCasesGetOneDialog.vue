<template>
     <q-dialog v-model="showModal" @show="onShow" persistent @hide="onHide">
        <clinic-cases-get-one-dialog-skeleton v-if="!clinicCase.id" />
        <q-card style="min-width: 280px; max-width: 600px" v-if="clinicCase.id">
            <q-card-section class="row items-center content-center  q-pb-none">
                <div class="title col-10">{{ clinicCase.title }}</div>
                <div class="col row justify-end">
                    <clinic-cases-get-one-menu @deleted="onDelete" :id="clinicCase.id"></clinic-cases-get-one-menu>
                </div>
            </q-card-section>

            <q-card-section>
                <div>
                    <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Nro de Historia <span class="text-weight-bold">:</span>
                    </q-chip> {{ clinicCase.caseNumber }}
                </div>
                <div>
                    <q-chip square color="dark" class="text-weight-medium" text-color="white" size="sm" >
                        Inicio <span class="text-weight-bold">:</span>
                    </q-chip> {{ clinicCase.beginningDate }}
                </div>
                <div class="row q-mt-sm">
                    <q-btn icon="description" class="col-12" unelevated color="dark" :href="clinicCase.url"></q-btn>
                    <q-btn label="Cerrar" @click="onHide" class="col-12 q-mt-xs" outline color="dark"></q-btn>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import ClinicCasesGetOneMenu from './ClinicCasesGetOneMenu.vue';
import ClinicCasesGetOneDialogSkeleton from './ClinicCasesGetOneDialogSkeleton.vue';
import { useClinicStore } from 'src/stores/ClinicCaseStore';
import { computed, ref } from 'vue';

interface Props {
    show: boolean,
    id: string, 
}

interface ClinicCaseType {
    id: string,
    title: string,
    beginningDate: string,
    caseNumber: string,
    url: string
}

const clinicCaseStore = useClinicStore();

const showModal = computed(()=> props.show)

const emit = defineEmits<{
    (e: 'update:hide'): void,
}>()
const props = defineProps<Props>()
const clinicCase = ref<ClinicCaseType>({
    id: '',
    title: '',
    beginningDate: '',
    caseNumber: '',
    url: ''
})


function onShow(){
    const clinicCaseFound = clinicCaseStore.getClinicCaseById(props.id) 
    
    if(!clinicCaseFound) {
        emit('update:hide')
        return
    }
    clinicCase.value = clinicCaseFound.getClinicCase()

}

function onHide(){
    clinicCase.value = {
        id: '',
        title: '',
        beginningDate: '',
        caseNumber: '',
        url: ''
    }
    emit('update:hide')
}

function onDelete(){
    
    onHide()
}


</script>

<style scoped>
.title{
    font-size: 1em;
    font-weight: 700;
    
}
</style>