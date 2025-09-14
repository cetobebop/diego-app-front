import type { CreatePatientData } from "src/interfaces/IPatient.t";
import type { QueryParams } from "src/interfaces/QueryParams";
import { ApiPatientsRepository } from "src/repository/Patients";
import { ApiV1 } from "src/utils/SingletonApiInstances";

const patientRepository = new ApiPatientsRepository(ApiV1)

export function createPatient(patientData: CreatePatientData) {
   patientRepository.createPatient(patientData).then(response => {
        console.log('Patient created successfully:', response);
   }).catch(error => {
       console.error('Error creating patient:', error);
   });
}

export function getPatients(query: QueryParams) {
    patientRepository.getPatients(query).then(response => {
        console.log('Patients retrieved successfully:', response);
    }).catch(error => {
        console.error('Error retrieving patients:', error);
    });
}

export function getPatientById(id: string) {
    patientRepository.getPatientById(id).then(response => {
        console.log('Patient retrieved successfully:', response);
    }).catch(error => {
        console.error('Error retrieving patient:', error);
    });
}

export function updatePatient(id: string, partialPatient: CreatePatientData) {
    patientRepository.updatePatient(id, partialPatient).then(response => {
        console.log('Patient updated successfully:', response);
    }).catch(error => {
        console.error('Error updating patient:', error);
    });
}

export function deletePatient(id: string) {
    patientRepository.deletePatient(id).then(response => {
        console.log('Patient deleted successfully:', response);
    }).catch(error => {
        console.error('Error deleting patient:', error);
    });
}

export function searchPatients(input: string, query: QueryParams) {
    patientRepository.searchPatients(input, query).then(response => {
        console.log('Patients searched successfully:', response);
    }).catch(error => {
        console.error('Error searching patients:', error);
    });
}