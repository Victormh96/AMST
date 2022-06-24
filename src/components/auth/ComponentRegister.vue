<template>
    <!--Main-->
    <h1>Únete hoy mismo</h1>
    <a-form layout="vertical" autocomplete="off" :model="formState" @finish="get">
        <!--Dui-->
        <a-form-item name="dui" class="mb-4"
            :rules="[{ required: true, message: '' }, { pattern: /^[0-9]\d{7}-\d{1}$/gm, message: '' }]">
            <a-input type="tel" v-model:value="formState.dui" placeholder="DUI" />
        </a-form-item>
        <!--Email-->
        <a-form-item name="email" :rules="[{ type: 'email', required: true, message: '' }]" class="mb-4"
            v-if="this.thing == 0">
            <a-input type="text" v-model:value="formState.email" placeholder="Email" />
            <a href="#" @click="hideSomethingwith(1)" class="component">Registrarse con
                Teléfono</a>
        </a-form-item>
        <!--Phone-->
        <a-form-item name="phone" :rules="[{ required: true, message: '' }]" class="mb-4" v-else>
            <a-input type="tel" v-model:value="formState.phone" placeholder="Teléfono" />
            <a href="#" @click="hideSomethingwith(0)" class="component">Registrarse con
                Email</a>
        </a-form-item>
        <!--Button-->
        <a-button key="submit" htmlType="submit">Crear cuenta</a-button>
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
            dui: null,
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

        get(values) {
            console.log(values)
        },
    },
}
</script>
