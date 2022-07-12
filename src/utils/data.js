import cryptoJS from "crypto-js"

//Document Type
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

//Gender Type
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
    {
        id: "U",
        name: 'Prefiero no decirlo'
    },
]

const gender = (type) => {
    return type === 'M' ? 'o' : 'a'
}

const decryptPass =(encrypted)=>{
    const key_crypto = process.env.VUE_APP_AUTH_KEY_CRYPTO.toString();
    const bytes = cryptoJS.AES.decrypt(encrypted, key_crypto);
    return bytes.toString(cryptoJS.enc.Utf8);
}

//Exports
export {
    genderType,
    documentName,
    genderName,
    decryptPass,
    gender,
    documentsType
}