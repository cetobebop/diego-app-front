import type { IClinicCaseRaw } from "src/interfaces/IClinicCase.t";


export class ClinicCase {
    constructor (private clinicCase: IClinicCaseRaw){}

    getId(){
        return this.clinicCase.id
    }

    getTitle(){
        return this.clinicCase.title.split(' ').map(e=> e.charAt(0).toUpperCase() + e.slice(1)).join(' ')
    }

    getClinicCase(){
        return {
            id: this.clinicCase.id,
            title: this.getTitle(),
            beginningDate: this.clinicCase.beginningDate,
            url: this.clinicCase.url,
            caseNumber: this.clinicCase.caseNumber
        }
    }
}