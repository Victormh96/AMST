<template>
    <!--Main-->
    <h2>Inicio de sesión</h2>

    <!--Formulario-->
    <a-form layout="vertical" :model="formState" :rules="rules" @finish="onSubmit">
    
        <!--Option-->
        <a-form-item name="optionDocument" class="mb-4 select" >
            <a-select @change="doDocumentsWith" placeholder="Seleccione documento" 
            v-model:value="formState.optionDocument" :options="documentsType.map(item => ({ value: item.id, label: item.name }))">
            </a-select>
        </a-form-item>

        <!--Documents-->
        <a-form-item name="document" class="mb-4">
            <a-input type="tel" :placeholder="placeholder || 'Documento'" 
            :disabled="!formState.optionDocument" autocomplete="off" />
        </a-form-item>
        <!--Password-->
        <a-form-item name="password">
            <a-input type="password" v-model:value="formState.password" placeholder="Contraseña" :disabled="!formState.optionDocument"
                autocomplete="off" />
        </a-form-item>
        <!--Reset-->
        <a-form-item>
            <p @click="$emit('exchange', 2)" class="link-style">¿Olvidaste tu contraseña?</p>
        </a-form-item>
        <!--Button-->
        <a-form-item>
            <a-button key="submit" htmlType="submit">Entrar</a-button>
        </a-form-item>
    </a-form>
    <hr>
    <!--Others-->
    <div class="footer">
        <a-form-item>
            <h5>¿No tienes cuenta?</h5>
            <a-button v-on:click="$emit('exchange', 1)">Crear cuenta</a-button>
        </a-form-item>
    </div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue"
import { Form } from "ant-design-vue"
import { documentsType, documentName } from '@/utils/data'

const useForm = Form.useForm

export default {

    data() {
        return {
            placeholder: null,
        }
    },
    setup() {
        const formState = reactive({
            document: undefined,
            password: undefined,
        })

        const rules = {
            password: [
                {
                    required: true,
                    message: "Campo requerido",
                    trigger: 'blur',
                },
            ],
        }

        const { resetFields } = useForm(formState, reactive({}))

        return {
            formState,
            rules,
            resetFields,
            documentsType,
        }
    },
    methods: {
        doDocumentsWith(item) {
            console.log(this.formState.optionDocument);
            this.placeholder = documentName(item)
            //Others
            this.resetFields()
        },

        onSubmit(values) {
            console.log(values)
        },
    },
    emits: ['exchange'],
};
</script>
