
export function authInputRules() {
    return {
        username: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => (val.length >= 5) || 'Mínimo 5 caracteres',
            (val: string) => (val.length <= 12) || 'Máximo 12 caracteres',
            (val: string) => !/\s/g.test(val) || 'Sin espacios',
            (val: string) => /^[a-zA-Z0-9]+$/.test(val) || 'Solo letras y números',
        ],
        password: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => val.length > 6 || 'Mínimo 6 caracteres',
            (val: string) => val.length <= 100 || 'Máximo 100 caracteres',
            (val: string) => !/\s/g.test(val) || 'Sin espacios',
        ]
    };
}

export function patientCreateInputRules() {
    return {
        name: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => (val?.length >= 3) || 'Mínimo 3 caracteres',
            (val: string) => (val?.length <= 50) || 'Máximo 50 caracteres',
            (val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Solo letras',
        ],
        ci: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => val?.length > 5 || 'Mínimo 6 caracteres',
            (val: string) => val?.length <= 8 || 'Máximo 8 caracteres',
            (val: string) => !/\s/g.test(val) || 'Sin espacios',
            (val: string) => /^[0-9]+$/.test(val) || 'Solo números',
        ],
        tlf: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => !/\s/g.test(val) || 'Sin espacios',
            (val: string) => /^[0-9]{4}-[0-9]{7}$/.test(val) || 'Formato inválido',
        ],
        beginningDate: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => new Date(val) < new Date() || 'Fecha inválida',
        ],
        birthdate: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => new Date(val) < new Date() || 'Fecha inválida',
        ],
        address: [
            (val: string) => val.length < 149 || 'Máximo 149 caracteres',

        ],
        sex: [
            (val: string) => !!val || 'Obligatorio',
        ],
        pdfFile: [
            (val: string) => !!val || 'Obligatorio',
        ]
        
    };
}

export function clinicCaseCreateInputRules() {
    return {
        title: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => (val?.length >= 5) || 'Mínimo 5 caracteres',
            (val: string) => (val?.length <= 50) || 'Máximo 50 caracteres',
            (val: string) => /^[a-zA-Z\s]+$/.test(val) || 'Solo letras',
        ],
        caseNumber: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => val?.length >= 1 || 'Mínimo 1 caracter',
            (val: string) => val?.length <= 30 || 'Máximo 8 caracteres',
            (val: string) => !/\s/g.test(val) || 'Sin espacios',
            (val: string) => /^[0-9]+$/.test(val) || 'Solo números',
        ],
        beginningDate: [
            (val: string) => !!val || 'Obligatorio',
            (val: string) => new Date(val) < new Date() || 'Fecha inválida',
        ],
        pdfFile: [
            (val: string) => !!val || 'Obligatorio',
        ]
        
    };
}

