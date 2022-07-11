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
          <a-form class="title" layout="vertical" autocomplete="off" :rules="rules" :model="formState"
            @finish="onSubmit">
            <!--Main-->
            <h2>Datos Personales</h2>

            <a-row class="mb">
              <!--Datos-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="name">
                  <a-input type="text" v-model:value="formState.name" placeholder="Nombre" />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="lastname">
                  <a-input type="text" v-model:value="formState.lastname" placeholder="Apellido" />
                </a-form-item>
              </a-col>

              <a-col v-if="validateEmail" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="contact">
                  <a-input type="tel" v-model:value="formState.contact" placeholder="Número de contacto" />
                </a-form-item>
              </a-col>

              <a-col v-if="!validateEmail" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="email">
                  <a-input type="email" v-model:value="formState.email" placeholder="Correo Electrónico" />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <!--Option-->
                <a-form-item name="optiongender" class="mb-4 select">
                  <a-select placeholder="Sexo" v-model:value="formState.optiongender" :options="
                    genderType.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))
                  " :disabled="this.$store.state.auth.loadingRegister">
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="password">
                  <a-input-password type="password" v-model:value="formState.password" placeholder="Contraseña" />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
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

    const rules = {};

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
      console.log(data);

      console.log(values);
      this.$store.dispatch("RegisterData", data);
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
};
</script>

