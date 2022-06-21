//Year Now
const getYear = () => {
    const dateData = new Date()
    const year = dateData.getFullYear()
    return year
}

//Theme
const getheme = () => {
    if (localStorage.data === 'true') {
        document.querySelector('html').setAttribute('data-theme', 'dark')
    } else {
        document.querySelector('html').setAttribute('data-theme', '')
    }
}

//Exports 
export {
    getYear,
    getheme
}