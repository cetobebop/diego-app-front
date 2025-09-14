
export function convertDomainServerDateToNormalDate(date: string){
    return date.split('-').reverse().join('-') 
}