//Year Now
const getYear = () => {
    const dateData = new Date();
    const year = dateData.getFullYear();
    return year;
};

//localStorage
const geTheme = () => {
    if (localStorage.theme === "true") {
        document.querySelector("html").setAttribute("data-theme", "dark")
    } else {
        document.querySelector("html").setAttribute("data-theme", "")
    }
};

const resetData = () => {
    localStorage.removeItem('document');
    localStorage.removeItem('type');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('_grecaptcha');
};


//Exports
export { getYear, geTheme, resetData };
