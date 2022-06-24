<template>
    <!--Main-->
    <h1>Inicio de sesión</h1>
    <!--Formulario-->
    <a-form layout="vertical" autocomplete="off" :model="formState" @finish="post">
        <!--Email-->
        <a-form-item name="email" :rules="[{ type: 'email', required: true, message: '' }]" class="mb-4">
            <a-input type="text" v-model:value="formState.email" placeholder="Email" />
        </a-form-item>
        <!--Password-->
        <a-form-item name="password" :rules="[{ required: true, message: '' }]" class="mb-4">
            <a-input type="password" v-model:value="formState.password" placeholder="Contraseña" />
            <a href="#" class="component">¿Olvidaste tu
                contraseña?</a>
        </a-form-item>
        <!--Button-->
        <a-button key="submit" htmlType="submit">Entrar</a-button>
    </a-form>
    <hr>
    <!--Others-->
    <div class="footer">
        <h3>¿No tienes cuenta?</h3>
        <a-button v-on:click="$emit('finished', 1)">Crear Cuenta</a-button>
    </div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;

export default {
    setup() {
        const formState = reactive({
            email: null,
            password: null
        });

        const { resetFields } = useForm(formState, reactive({}));

        return {
            formState,
            resetFields
        };
    },

    methods: {
        post(values) {
            console.log(values)
        },
    },
}
</script>
