const url_base = 'http://localhost:5001'
const auth = 'api/cuenta';

export const LogInSesion = () => `${url_base}/${auth}/iniciar-sesion`;

export const recoveyPassword = () => `${url_base}/${auth}/recuperar-password`;

export const changePassword = () => `${url_base}/${auth}/cambiar-password`;

export const createAccount = () => `${url_base}/${auth}/crear-cuenta`;

export const validateAccount = () => `${url_base}/${auth}/validar-cuenta`;

export const userAccount = () => `${url_base}/${auth}/registrar-datos-adicionales`;

