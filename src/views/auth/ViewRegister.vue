<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="auth">
    <div class="container">
      <!--Skeleton-->
      <Skeleton @loading="loading" v-if="(!skeleton)" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15" class="m-auto">
          <!--Form---->
          <a-form class="title" layout="vertical" autocomplete="off" :rules="rules" :model="formState"
            @finish="onSubmit">
            <!--Title-->
            <h2 class="mb-5 text-center">Datos Personales</h2>

            <!--Row-->
            <a-row>
              <!--Name-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="name">
                  <a-input type="text" v-model:value="formState.name" placeholder="Nombre"
                    :disabled="this.$store.state.auth.loading" />
                </a-form-item>
              </a-col>
              <!--Lastname-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="lastname">
                  <a-input type="text" v-model:value="formState.lastname" placeholder="Apellido"
                    :disabled="this.$store.state.auth.loading" />
                </a-form-item>
              </a-col>
              <!--Phone-->
              <a-col v-if="validateEmail" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="contact">
                  <a-input type="tel" v-model:value="formState.contact" placeholder="Número de contacto"
                    :disabled="this.$store.state.auth.loading" :pattern="patternformat" :title="tittleformat"
                    v-mask="'(+503) ####-####'" />
                </a-form-item>
              </a-col>
              <!--Email-->
              <a-col v-if="!validateEmail" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="email">
                  <a-input type="text" v-model:value="formState.email" placeholder="Correo Electrónico"
                    :disabled="this.$store.state.auth.loading" />
                </a-form-item>
              </a-col>
              <!--Gender-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="optiongender" class="select">
                  <a-select placeholder="Genero" v-model:value="formState.optiongender" :options="
                  genderType.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))" :disabled="this.$store.state.auth.loading">
                  </a-select>
                </a-form-item>
              </a-col>
              <!--Password-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="password">
                  <a-input-password type="password" v-model:value="formState.password" placeholder="Contraseña"
                    :disabled="this.$store.state.auth.loading" autocomplete="off" />
                </a-form-item>
              </a-col>
              <!--Password Repeat-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="repeat">
                  <a-input-password type="password" v-model:value="formState.repeat" placeholder="Confirmar Contraseña"
                    :disabled="this.$store.state.auth.loading" autocomplete="off" />
                </a-form-item>
              </a-col>
            </a-row>
            <!--Error-->
            <div class="mt-2" v-if="errorStatus">
              <strong>{{ errorMessage }}</strong>
            </div>
            <!--Button-->
            <a-form-item class="text-center">
              <a-button key="submit" htmlType="submit" class="save">Guardar</a-button>
            </a-form-item>
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
import { genderType, genderName } from "@/utils/data"
import Navbar from "@/components/auth/ComponentNavbar.vue"
import Footer from "@/components/auth/ComponentFooter.vue"
import Skeleton from '@/components/auth/ComponentSkeleton.vue'

export default {
  components: {
    Navbar,
    Footer,
    Skeleton
  },

  data() {
    return {
      //Error
      errorStatus: false,
      errorMessage: null,

      //Dynamic
      validateEmail: null,

      //Skeleton
      skeleton: false
    }
  },

  mounted() {
    try {
      this.validateEmail = this.$store.state.auth.temporaryData.email;
    } catch (error) {
      this.validateEmail = false;
    }
  },

  setup() {
    const formState = reactive({
      //Form
      name: null,
      sexo: null,
      email: null,
      repeat: null,
      contact: null,
      password: null,
      lastname: null,
      document: null
    })

    const rules = {
      name: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },
        {
          min: 3,
          message: "Minimo 3 caracteres",
          trigger: "blur",
        },
      ],

      lastname: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },
        {
          min: 3,
          message: "Minimo 3 caracteres",
          trigger: "blur",
        },
      ],

      email: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Formato invalido",
          trigger: "blur",
        },
      ],

      contact: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },
      ],

      optiongender: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },

      ],

      password: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },
        {
          min: 6,
          message: "Minimo 6 caracteres",
          trigger: "blur",
        },
      ],

      repeat: [
        {
          required: true,
          message: "Campo Requerido",
          trigger: "blur",
        },
        {
          validator: async (_, value) => {
            const { password, repeat } = formState;
            if (password !== repeat) {
              console.log(value);
              return Promise.reject(
                new Error("los campos no coincidencia")
              );
            }
          },
          trigger: "blur",
        },
        {
          min: 6,
          message: "Minimo 6 caracteres",
          trigger: "blur",
        },
      ],
    }

    return {
      rules,
      formState,
      genderType,
      genderName,
    }
  },

  methods: {
    onSubmit(values) {
      try {
        if (this.validateEmail) {
          this.email = this.$store.state.auth.temporaryData.email;
          this.contact = values.contact;
        } else {
          this.email = values.email;
          this.contact = this.$store.state.auth.temporaryData.phone;
        }
      } catch (error) {
        console.log(error);
      }

      const data = {
        name: values.name,
        lastName: values.lastname,
        sex: values.optiongender,
        documentType: this.$store.state.auth.temporaryData.documentType,
        document: this.$store.state.auth.temporaryData.document,
        email: this.email,
        phone: this.contact,
        password: values.password,
      }

      this.$store.dispatch("RegisterData", data);

      this.errorStatus = this.$store.state.auth.error;

      if (this.errorStatus) {
        try {
          this.errorMessage = this.$store.state.auth.errorRegisterData;
        } catch (error) {
          this.errorMessage = "Error Interno de Servidor";
        }
      }
    },

    loading(item) {
      this.skeleton = item
    }
  },
};
</script>

