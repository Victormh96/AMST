<template>
    <h2>Se ha enviado un código</h2>
    <!--Formulario-->
    <a-form layout="vertical" :model="formState" :rules="rules" @finish="VerifyCode">

        <div :style="{ display: 'flex' }">
            <div :style="{ background: 'rgb(64, 126, 201)', width: '450px', height: '40px', borderRadius: '10px' }">
                <p :style="{ fontSize: '14px', paddingTop: '10px' }">Introdúcelo abajo para verificar el número
                    ('{tel}')
                    &nbsp;<i class="fa-solid fa-pencil" /></p>
            </div>
        </div>&nbsp;

        <a-form-item name="code" class="mb-1">
            <a-input type="text" v-model:value="formState.code" placeholder="Código de verificación" />
            <!--Dropdown List-->
            <a-dropdown :trigger="['click']">
                <a class="component link-style" @click.prevent>
                    ¿No recibiste un SMS? &nbsp;
                    {{ timerCount }} <i class="fa-regular fa-clock" />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="0">
                            <a href="http://localhost:8080/">Volver a enviar SMS</a>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a href="#">Usar correo</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </a-form-item>
        <!--Button-->
        <a-button key="submit" htmlType="submit">Siguiente</a-button>
    </a-form>
    <hr>
    <!--Others-->
    <div class="footer">
        <h5>¿Ya tienes cuenta?</h5>
        <a-button v-on:click="$emit('exchange', 0)">Iniciar sesión</a-button>
    </div>

    <div id="recaptcha-container"></div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue"
import { Form } from "ant-design-vue"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const auth = getAuth()
const useForm = Form.useForm

export default {
    data() {
        return {
            thing: 0,
            timerCount: 30
        }
    },

    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
            },
            immediate: true
        }
    },

    setup() {
        const formState = reactive({
            code: null,
        })

        const rules = {
            code: [
                {
                    required: true,
                    message: "Campo requerido",
                    trigger: 'blur',
                }
            ],
        }

        const { resetFields } = useForm(formState, reactive({}))

        return {
            formState,
            rules,
            resetFields,
        }
    },

    mounted() {
        this.Recaptcha()
        this.sendCode()
    },

    methods: {
        sendCode() {
            const phoneNumber = localStorage.phone
            const appVerifier = window.recaptchaVerifier

            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult
                }).catch((error) => {
                    this.RecaptchaReset()
                    console.log('codigo no enviado', error)
                })
        },

        VerifyCode(values) {

            const code = values.code

            window.confirmationResult.confirm(code).then((result) => {
                console.log('codigo exitoso', result)
                this.$router.replace({ name: "Register" })
            }).catch((error) => {
                console.log('codigo no valido', error)
            });
        },

        Recaptcha() {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log('codigo enviado', response)
                }
            }, auth)
        },

        RecaptchaReset() {
            window.recaptchaVerifier.render().then(function (widgetId) {
                window.grecaptcha.reset(widgetId)
            })
        }
    },
};
</script>
