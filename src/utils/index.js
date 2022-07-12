//Year Now
const getYear = () => {
    const dateData = new Date();
    const year = dateData.getFullYear();
    return year;
};

//Reset localStorage
const resetData = () => {
    localStorage.removeItem('document');
    localStorage.removeItem('type');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('_grecaptcha');
};

//Exports
export { getYear, resetData };
