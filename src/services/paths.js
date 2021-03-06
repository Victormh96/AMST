//Env
const url_base = process.env.VUE_APP_URL_BASE;

//Prefix
const auth = 'api/cuenta';

//Routes Auth
export const LogInSesion = () => `${url_base}/${auth}/iniciar-sesion`;

export const recoveyPassword = () => `${url_base}/${auth}/recuperar-password`;

export const changePassword = () => `${url_base}/${auth}/cambiar-password`;

export const createAccount = () => `${url_base}/${auth}/crear-cuenta`;

export const validateAccount = () => `${url_base}/${auth}/validar-cuenta`;

export const registerDataAccount = () => `${url_base}/${auth}/registrar-datos-cuenta`;

export const validateAccountPhone = () => `${url_base}/${auth}/cuenta-existente`;