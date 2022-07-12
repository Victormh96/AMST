<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="register">
    <div class="container">
      <!--Skeleton-->
      <a-skeleton active :paragraph="{ rows: 9 }" v-if="loading" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="15" class="m-auto">
          <!--Formulario---->
          <a-form
            class="title"
            layout="vertical"
            autocomplete="off"
            :rules="rules"
            :model="formState"
            @finish="onSubmit"
          >
            <!--Main-->
            <h2>Datos Personales</h2>

            <a-row class="mb">
              <!--Datos-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="name">
                  <a-input
                    type="text"
                    v-model:value="formState.name"
                    placeholder="Nombre"
                    :disabled="this.$store.state.auth.loading"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="lastname">
                  <a-input
                    type="text"
                    v-model:value="formState.lastname"
                    placeholder="Apellido"
                    :disabled="this.$store.state.auth.loading"
                  />
                </a-form-item>
              </a-col>

              <a-col v-if="validateEmail" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="contact">
                  <a-input
                    :type="valueformat"
                    v-model:value="formState.contact"
                    placeholder="Número de contacto"
                    :disabled="this.$store.state.auth.loading"
                    :pattern="patternformat"
                    :title="tittleformat"
                    @focus="togglePicker()"
                  />
                </a-form-item>
              </a-col>

              <a-col
                v-if="!validateEmail"
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
                class="mb-5"
              >
                <a-form-item name="email">
                  <a-input
                    type="email"
                    v-model:value="formState.email"
                    placeholder="Correo Electrónico"
                    :disabled="this.$store.state.auth.loading"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <!--Option-->
                <a-form-item name="optiongender" class="select">
                  <a-select
                    placeholder="Genero"
                    v-model:value="formState.optiongender"
                    :options="
                      genderType.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))
                    "
                    :disabled="this.$store.state.auth.loading"
                  >
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="password">
                  <a-input-password
                    type="password"
                    v-model:value="formState.password"
                    placeholder="Contraseña"
                    :disabled="this.$store.state.auth.loading"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="repeat">
                  <a-input-password
                    type="password"
                    v-model:value="formState.repeat"
                    placeholder="Confirmar Contraseña"
                    :disabled="this.$store.state.auth.loading"
                  />
                </a-form-item>
              </a-col>

              <a-col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24"
                class="mb-5 centered"
              >
                <span v-if="this.$store.state.auth.loadingLogin">
                  <img src="@/../public/img/assets/LoadingCircle.svg" />
                </span>
                <p class="error-login" v-if="errorStatus">{{ errorMessage }}</p>
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
import { reactive } from "vue";
import { Form } from "ant-design-vue";
import Navbar from "@/components/public/ComponentNavbar.vue";
import Footer from "@/components/public/ComponentFooter.vue";
import { genderType, genderName } from "@/utils/data";

const useForm = Form.useForm;

export default {
  data() {
    return {
      loading: true,
      validateEmail: null,
      errorStatus: false,
      errorMessage: null,
    };
  },

  components: {
    Navbar,
    Footer,
  },

  setup() {
    const formState = reactive({
      name: null,
      contact: null,
      password: null,
      lastname: null,
      email: null,
      repeat: null,
      sexo: null,
      document: null,
    });

    const { resetFields } = useForm(formState, reactive({}));

    const rules = {
      name: [
        {
          required: true,
          message: "El nombre es requerido",
          trigger: "blur",
        },
        {
          min: 3,
          message: "Escribe un nombre real",
          trigger: "blur",
        },
      ],
      lastname: [
        {
          required: true,
          message: "El apellido es requerido",
          trigger: "blur",
        },
        {
          min: 3,
          message: "Escribe un nombre real",
          trigger: "blur",
        },
      ],

      email: [
        {
          required: true,
          message: "El correo es requerido",
          trigger: "blur",
        },
        {
          type: "email",
          message: "El formato no es valido",
          trigger: "blur",
        },
      ],
      contact: [
        {
          required: true,
          message: "El Telefono es requerido",
          trigger: "change",
        },
      ],
      optiongender: [
        {
          required: true,
          message: "El genero es requerido",
          trigger: "change",
        },

      ],
      password: [
        {
          required: true,
          message: "La Contraseña es requerida",
          trigger: "change",
        },
        {
          min: 6,
          message: "La Contraseña debe contener al menos 6 caracteres",
          trigger: "blur",
        },
      ],
      repeat: [
        {
          required: true,
          message: "La Contraseña es requerida",
          trigger: "change",
        },
        {
          validator: async (_, value) => {
            const { password, repeat } = formState;
            if (password !== repeat) {
              console.log(value);
              return Promise.reject(
                new Error("Las Contraseñas no son iguales")
              );
            }
          },
          trigger: "change",
        },
        {
          min: 6,
          message: "La Contraseña debe contener al menos 6 caracteres",
          trigger: "blur",
        },
      ],
    };

    return {
      formState,
      rules,
      resetFields,
      genderType,
      genderName,
    };
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
        console.log("error");
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
      };

      this.$store.dispatch("RegisterData", data);

      this.errorStatus = this.$store.state.auth.error;

      if (this.errorStatus) {
        try {
          this.errorMessage = this.$store.state.auth.errorRegisterData;
        } catch (error) {
          this.errorMessage = "Error Interno de Servidor";
        }
      } else {
        //
      }
    },
  },
  mounted() {
    try {
      this.validateEmail = this.$store.state.auth.temporaryData.email;
      console.log(this.validateEmail);
    } catch (error) {
      this.validateEmail = false;
    }

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  togglePicker() {
    if (this.valueformat == "tel") {
      var telefono = document.querySelector('input[type="tel"]');
      telefono.addEventListener("click", (event) => {
        event.target.value = "+503";
      });
      telefono.addEventListener("focus", (event) => {
        event.target.value = "+503";
      });
      telefono.addEventListener("onfocus", (event) => {
        event.target.value = "+503";
      });
      telefono.addEventListener("blur", (event) => {
        event.target.style.background = "";
      });
    }
  },
};
</script>

