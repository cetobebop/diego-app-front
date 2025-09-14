import dayjs from "dayjs";

export function calculateDateFromX(date: string, reference: string){
    const days = dayjs(reference).diff(date, 'day')
    const months = dayjs(reference).diff(date, 'month')
    const years = dayjs(reference).diff(date, 'year')
    

    if(years) return years
    else if(months) return months
    else if(days) return days

    return 666
}