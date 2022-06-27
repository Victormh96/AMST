<template>
    <!--Main-->
    <h1>Inicio de sesión</h1>

    <!--Formulario-->
    <a-form layout="vertical" autocomplete="off" :rules="rules" :model="formState" @finish="post">
        <!--Option-->
        <a-form-item name="option" class="mb-4 select" v-model:value="formState.option">
            <a-select ref="select" v-model:value="formState.option" @change="doDocumentsWith"
                placeholder="Tipo Documento">
                <a-select-option value="0">DUI</a-select-option>
                <a-select-option value="1">Pasaporte</a-select-option>
                <a-select-option value="2">Carné de residencia</a-select-option>
            </a-select>
        </a-form-item>
        <!--Documents-->
        <a-form-item name="document" class="mb-4">
            <a-input type="tel" v-model:value="formState.document" :placeholder="placeholder" :disabled="disabled" />
        </a-form-item>
        <!--Password-->
        <a-form-item name="password" :disabled="disabled">
            <a-input type="password" v-model:value="formState.password" placeholder="Contraseña" :disabled="disabled" />
        </a-form-item>
        <!--Reset-->
        <a href="#" class="component">¿Olvidaste tu
            contraseña?</a>
        <!--Button-->
        <a-button key="submit" htmlType="submit">Entrar</a-button>
    </a-form>
    <hr>
    <!--Others-->
    <div class="footer">
        <h3>¿No tienes cuenta?</h3>
        <a-button v-on:click="$emit('exchange', 1)">Crear Cuenta</a-button>
    </div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;

export default {
    data() {
        return {
            placeholder: null,
            disabled: true
        }
    },

    setup() {
        const formState = reactive({
            document: null,
            password: null,

        })

        const rules = {
            document: [
                {
                    required: true,
                    message: "Campo requerido",
                    trigger: 'blur',
                },
            ],

            password: [
                {
                    required: true,
                    message: "Campo requerido",
                    trigger: 'blur',
                },
            ],
        }

        const { resetFields } = useForm(formState, reactive({}));

        return {
            formState,
            rules,
            resetFields
        }
    },

    methods: {
        doDocumentsWith(item) {
            this.disabled = false

            if (item == 0) {
                this.placeholder = "DUI"

            } else if (item == 1) {
                this.placeholder = "Pasaporte"

            } else if (item == 2) {
                this.placeholder = "Carné de residencia"
            }
            this.resetFields();
        },

        post(values) {
            console.log(values)
        },
    },
}
</script>
