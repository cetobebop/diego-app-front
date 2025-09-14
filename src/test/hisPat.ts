
import { ApiHistoryPatientsRepository } from "src/repository/HistoryPatients";
import { ApiV1 } from "src/utils/SingletonApiInstances";

const apiHistoryPatientsRepository = new ApiHistoryPatientsRepository(ApiV1);


export function findHisPatById(id: string) {
    apiHistoryPatientsRepository.getHistoryPatientById(id).then(response => {
        console.log('Find history patient by ID successful:', response);
    }).catch(error => {
        console.error('Find history patient by ID failed:', error);
    });
}

export function findHisPatsByPatientId(patientId: string) {
    apiHistoryPatientsRepository.getHistoriesPatientsByPatientId(patientId).then(response => {
        console.log('Find history patients by patient ID successful:', response);
    }).catch(error => {
        console.error('Find history patients by patient ID failed:', error);
    });
}