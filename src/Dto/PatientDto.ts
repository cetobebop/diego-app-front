import type { CreatePatientData } from "src/interfaces/IPatient.t"
import type { ISex } from "src/types/ISelectSex.t"
import { convertDateToServerFormat } from "src/utils/convertDateToServerFormat"

interface PatientDtoFormOutput {
    name: string,
    birthdate: string,
    ci: string,
    phoneNumber: string,
    address: string | null,
    age: number,
    sex: ISex,
    beginningDate: string
}



export class PatientDto {
    constructor(private patient: PatientDtoFormOutput){}

    getCi(){
        return this.patient.ci
    }

    getPhoneNumber(){
        return Number(this.patient.phoneNumber.replace('-',''))
    }

    getAddress(){
        return this.patient?.address || 'Sin definir'
    }

    getBirthdate(dateFormat: (date: string) => string){
        return dateFormat(this.patient.birthdate)
    }

    getBeginningDate(dateFormat: (date: string) => string){
        return dateFormat(this.patient.beginningDate)
    }

    getPatientToServer(): CreatePatientData {
        return {
            name: this.patient.name,
            birthdate: this.getBirthdate(convertDateToServerFormat),
            address: this.getAddress(),
            age: this.patient.age,
            beginningDate: this.getBeginningDate(convertDateToServerFormat),
            ci: this.getCi(),
            phoneNumber: this.getPhoneNumber(),
            sex: this.patient.sex
        }
    }

    getPatientToServerHistoryPatient(): CreatePatientData {
        return {
            name: this.patient.name,
            birthdate: this.patient.birthdate,
            address: this.getAddress(),
            age: this.patient.age,
            beginningDate: this.patient.beginningDate,
            ci: this.getCi(),
            phoneNumber: this.getPhoneNumber(),
            sex: this.patient.sex
        }
    }

}