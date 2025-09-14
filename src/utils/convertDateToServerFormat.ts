import dayjs from "dayjs";

export function convertDateToServerFormat(date: string){
    return dayjs(date).format('DD-MM-YYYY').toString()
}