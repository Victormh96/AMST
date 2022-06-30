const documentsType = [
        {
            id: 1,
            name: 'DUI',
        },
        {
            id: 2,
            name: 'Pasaporte'
        },
        {
            id: 3,
            name: 'Carné de residencia'
        },
    ]

const documentName = (item) => {
    return documentsType[item-1]?.name
}

export {
    documentsType,
    documentName
}