type IArrMonths = 'Ene' | 'Feb' | 'Mar' | 'Abr' | 'May' | 'Jun' | 'Jul' | 'Ago' | 'Sep' | 'Oct' | 'Nov' | 'Dic';
const arrMonths: IArrMonths[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const dictDaysPerMonth = {
  'Ene': 31,
  'Feb': 28,
  'Mar': 31,
  'Abr': 30,
  'May': 31,
  'Jun': 30,
  'Jul': 31,
  'Ago': 31,
  'Sep': 30,
  'Oct': 31,
  'Nov': 30,
  'Dic': 31
};

export function calculateBirthdayAge(birthday: string, reference: string){
    const bdate = new Date(birthday)
    const refDate = new Date(reference)
    if(bdate.toString() === 'Invalid Date' || refDate.toString() === 'Invalid Date') throw Error('Fecha invalida')
    
    const by = bdate.getFullYear()
    const ry = refDate.getFullYear()
    const bm = bdate.getMonth()
    const rm = refDate.getMonth()
    const bd = bdate.getDate()
    const rd = refDate.getDate()
   
    let age = ry - by

    if(bdate > refDate) throw Error('No aceptamos viajeros del tiempo...')

    if(bm > rm) age --
    else if(bm == rm) {
      if(bd > rd) age --
    }
  
    if(!age && bm != rm) {
      age = Math.abs(bm - rm)
      if(rd > bd) return 12 - age
      if(age > 1 && rd < bd) return age - 1 
    
      if(ry == by && age == 1 && rd != bd) return rd + Math.abs(dictDaysPerMonth[arrMonths[bm] as IArrMonths] - bd)
    }

      
 
    if(!age && bm == rm) return  Math.abs(rd - bd)
    return age
}