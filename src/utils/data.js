const documentsType = [
    {
        id: "DUI",
        name: 'DUI',
    },
    {
        id: "PST",
        name: 'Pasaporte'
    },
    {
        id: "CDR",
        name: 'Carné de residencia'
    },
]

const documentName = (item) => {
    let name = null
    switch (item) {
        case "DUI":
            name = "DUI"
            break;
        case "PST":
            name = "pasaporte"
            break;
        case "CDR":
            name = "documento"
            break;
    }
    return name
}

const genderName = (item) => {
    let name = null
    switch (item) {
        case 1:
            name = "Masculino"
            break;
        case 2:
            name = "Femenino"
            break;

    }

    return name
}

const genderType = [
    {
        id: "M",
        name: 'Masculino',
    },
    {
        id: "F",
        name: 'Femenino'
    },
]

const gender = (type) => {
    return type === 'M' ? 'o' : 'a'
}

const getParameterUrl= (url) =>{
    console.log(url)
    return url
}

const agregarCaracter = (cadena, caracter, pasos) => {
    let cadenaConCaracteres = "";
    const longitudCadena = cadena.length;
    for (let i = 0; i < longitudCadena; i += pasos) {
        if (i + pasos < longitudCadena) {
            cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
        } else {
            cadenaConCaracteres += cadena.substring(i, longitudCadena);
        }
    }
    return cadenaConCaracteres;
}

export {
    documentsType,
    gender,
    documentName,
    getParameterUrl,
    agregarCaracter,
    genderName,
    genderType
}