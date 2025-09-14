export function verifyChanges<T extends Record<string, string | number>, U extends Record<string, string | number | undefined>>(changedObjt: T, refObjt: U){
    
    if(!changedObjt || !refObjt) return false
  
    const changes = Object.entries(changedObjt).filter(([k,v]) => v !== refObjt[k])
    if(!changes.length) return false
    return {
        changes: Object.fromEntries(changes), 
        propModified: changes.map(([k])=> k)
    }
}