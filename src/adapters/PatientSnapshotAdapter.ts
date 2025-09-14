import type { IPatientSnapshot } from "src/interfaces/IHistoryPatient.t";
import type { IPatientRaw } from "src/interfaces/IPatient.t";



export class PatientSnapshotAdapter {

    constructor(private patSnap: Partial<IPatientSnapshot>){}

    getUpdatedAt(){
        if(!this.patSnap.updatedAt) return ""
        const date = new Date(this.patSnap.updatedAt)
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
        return `${day}-${month}-${date.getFullYear()}`
    }

    getAddress(){
        return this.patSnap.address
    }

    getBirthdate(){
        if(!this.patSnap.birthdate) return ""
        const date = new Date(this.patSnap.birthdate)
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = (date.getMonth()+1) < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
        return `${day}-${month}-${date.getFullYear()}`
    }

    getName(){  
        return this.patSnap?.name?.split(' ').map(e=> e.charAt(0).toUpperCase() + e.slice(1)).join(' ')
    }

    getCi(){
        return this.patSnap.ci
    }

    getPhoneNumber(){
        let phoneNumber = this.patSnap?.phoneNumber?.toString()
        if(!phoneNumber) return phoneNumber
        if(phoneNumber?.length < 11) phoneNumber = `0${phoneNumber}`
        const first = phoneNumber?.slice(0, 4)
        const second = phoneNumber?.slice(4)
        return first + "-" + second
    }

    getChanges( refObjt: IPatientRaw){

        if(!this.patSnap || !refObjt) return null
        const modifiedObjt = {...this.patSnap, birthdate: this.getBirthdate()}
        const changes = Object.entries(modifiedObjt).filter(([k,v]) => v !== refObjt[k as keyof IPatientRaw])
        if(!changes.length) return null
        return {
            changes: Object.fromEntries(changes), 
            propModified: changes.map(([k])=> k)
        }
}


    getPatientSnapshot(){
        return {
            id: this.patSnap.id,
            name: this.getName(),
            ci: this.getCi(),
            birthdate: this.getBirthdate(),
            address: this.getAddress(),
            phoneNumber: this.getPhoneNumber(),
            updatedAt: this.getUpdatedAt()
        }
    }

} 