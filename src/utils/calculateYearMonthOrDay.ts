import { convertDomainServerDateToNormalDate } from "./convertDomainServerDateToNormalDate";



export function calculateYearMonthOrDay(date: string){
    const nDate =  convertDomainServerDateToNormalDate(date)
    const dateNow = Date.now()
    const otherDate = Date.parse(nDate)
    const UN_DIA_EN_MS = 86400000;
    const UN_MES_EN_MS = 2629746000; 
    const UN_ANIO_EN_MS = 31556952000; 
    const rest = Math.abs(dateNow - otherDate)
   
    if(rest >= UN_ANIO_EN_MS) return 'años'
    else if(rest >= UN_MES_EN_MS) return 'meses'
    else if(rest >= UN_DIA_EN_MS) return 'dias'
    return 'wow'
    
} 