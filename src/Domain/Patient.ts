import type { IPatientRaw } from "src/interfaces/IPatient.t";
import type { ICalculateYearMonthOrDay } from "src/types/ICalculateYearMonthOrDay.t";
import { calculateYearMonthOrDay } from "src/utils/calculateYearMonthOrDay";

const statusDict: {[k:string]: string} = {
    'SIN_MODIFICAR': 'Sin modificar',
    'MODIFICADO': 'Actualizado',
}

export class Patient {
    
    constructor(private patient: IPatientRaw){}
    
   

    setClinicCaseId(id: string){
        const clinicCaseId = this.patient.clinicCasesId
        
        clinicCaseId.push(id)
        
    }

    getId(){
        return this.patient.id
    }

    getBirthdate(){
        return this.patient.birthdate
    }

    getBeginningDate(){
        return this.patient.beginningDate
    }

    getName(){  
        return this.patient.name.split(' ').map(e=> e.charAt(0).toUpperCase() + e.slice(1)).join(' ')
    }

    getCi(){
        return this.patient.ci
    }

    getPhoneNumber(){
        const phoneNumber = this.patient.phoneNumber.toString().length < 11 ? `0${this.patient.phoneNumber}` : this.patient.phoneNumber.toString()
        const first = phoneNumber.slice(0, 4)
        const second = phoneNumber.slice(4)
        return first + "-" + second
    }

    getNumberOfClinicCases(){
        return this.patient.clinicCasesId?.length
    }

    removeClinicCase(clinic_case_id: string){
        const clinicCases = this.patient.clinicCasesId
        console.log(clinicCases, ' casos clinicos antes de eliminar')
        this.patient.clinicCasesId = this.patient.clinicCasesId.filter(id => id !== clinic_case_id)
        console.log(this.patient.clinicCasesId, ' casos clinicos despues de eliminar')

    }


    getClinicCasesMsg(){
        if(!this.getNumberOfClinicCases()) return 'Sin Historias'
        else if(this.getNumberOfClinicCases() === 1) return '1 historia'
        else return `${this.getNumberOfClinicCases()} historias`
    }

    getSex(){
        return this.patient.sex.charAt(0).toUpperCase() + this.patient.sex.slice(1)
    }

    getStatus(){
        return statusDict[`${this.patient.status}`]
    }

    getAge(calculateTime: ICalculateYearMonthOrDay){
         
        return `${this.patient.age} ${calculateTime(this.patient.birthdate)}`
    }

    getAddress(){
        return this.patient?.address;
    }

    getPatientRaw(){
        return this.patient
    }

    getPatient(){
        return {
            id: this.patient.id,
            birthdate: this.patient.birthdate,
            ci: this.patient.ci,
            address: this.getAddress(),
            beginningDate: this.patient.beginningDate,
            name: this.getName(),
            phoneNumber: this.getPhoneNumber(),
            age: this.getAge(calculateYearMonthOrDay),
            clinicCasesCount: this.getNumberOfClinicCases(),
            clinicCasesEnumeration: this.getClinicCasesMsg(),
            sex: this.getSex(),
            status: this.getStatus(),
        }
    }

}

export interface IPatientDomain {
    id: string;
    birthdate: string;
    ci: string;
    address: string;
    beginningDate: string;
    name: string;
    phoneNumber: string;
    age: string;
    clinicCasesCount: number;
    clinicCasesEnumeration: string;
    sex: string;
    status: string | undefined;
}
