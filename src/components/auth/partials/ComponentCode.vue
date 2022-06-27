<template>
    <h1>Se ha enviado un código</h1>
    <!--Formulario-->
    <a-form layout="vertical" autocomplete="off" :model="formState" @finish="post">
        <a-form-item name="code" class="mb-1"
            :rules="[{ required: true, message: '' }, { pattern: /^[0-9]\d{7}-\d{1}$/gm, message: '' }]">
            <a-input type="text" v-model:value="formState.code" placeholder="Código de verificación " />
        </a-form-item>
        <!--Check-->
        <a-form-item name="email" :rules="[{ type: 'email', required: true, message: '' }]" class="mb-2"
            v-if="this.thing == 0">
            <!--<a href="#" @click="hideSomethingwith(1)" class="component">¿No recibiste un SMS?</a>-->
            <a href="#" class="component">¿No recibiste un SMS?</a>
        </a-form-item>

        <!--Button-->
        <a-button key="submit" htmlType="submit">Siguiente</a-button>
    </a-form>
    <hr>
    <!--Others-->
    <div class="footer">
        <h3>¿Ya tienes cuenta?</h3>
        <a-button v-on:click="$emit('finished', 0)">Iniciar sesión</a-button>
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
            thing: 0
        }
    },

    setup() {
        const formState = reactive({
            email: null,
            phone: null,
        });

        const { resetFields } = useForm(formState, reactive({}));

        return {
            formState,
            resetFields
        };
    },

    methods: {
        hideSomethingwith(item) {
            this.thing = item
        },

        post(values) {
            console.log(values)
        },
    },
}
</script>
