<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="register">
    <div class="container" >
      <!--Skeleton-->
      <a-skeleton active :paragraph="{ rows: 9 }" v-if="loading" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="m-auto">
          <!--Formulario---->
          <a-form class="title" layout="vertical" autocomplete="off" :rules="rules" :model="formState" @finish="onSubmit"
            @finishFailed="onFinishFailed">
            <!--Main-->
            <h2>Restablecer Contraseña</h2>

            <a-row class="mb">
              <!--Datos-->
              <a-col :xl="24" class="mb-5">
                <a-form-item name="password">
                  <a-input-password class="bordered" type="password" v-model:value="formState.password" placeholder="Contraseña" />
                </a-form-item>
              </a-col>

              <a-col :xl="24" class="mb-5">
                <a-form-item name="repeat">
                  <a-input-password type="password" v-model:value="formState.repeat"
                    placeholder="Confirmar Contraseña" />
                </a-form-item>
              </a-col>
            </a-row>

            <!--Button-->
            <div class="centered">
                <a-button key="submit" htmlType="submit">Guardar</a-button>
            </div>
              
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import { reactive } from "vue"
import { Form } from "ant-design-vue"
import Navbar from '@/components/public/ComponentNavbar.vue'
import Footer from '@/components/public/ComponentFooter.vue'

const useForm = Form.useForm;

export default {
  data() {
    return {
      loading: true
    }
  },

  components: {
    Navbar,
    Footer,
  },

  setup() {
    const formState = reactive({
      password: null,
      repeat: null,
    });

    const { resetFields } = useForm(formState, reactive({}));

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    }

    const rules = {
        password:[
            {
                required: true,
                message: "La Contraseña es requerida",
                trigger: "change",
            } 
        ],
        repeat:[
            {
                required: true,
                message: "La Contraseña es requerida",
                trigger: "change",
            },
            {
                validator: async (_, value) => {
                    const { password, repeat } = formState   
                    if (password !== repeat) {
                        console.log(value)
                    return Promise.reject(new Error('Las Contraseñas no son iguales'));
                }
                },
                trigger: "change",
            },             
        ]
    };

    const onSubmit = () => {
       console.log("")
      };


    return {
      formState,
      rules,
      resetFields,
      onSubmit,
      onFinishFailed
    };
  },



  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  },
};
</script>

