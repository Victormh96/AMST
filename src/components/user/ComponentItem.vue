<template>
  <!--Colletions-->
  <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="text-center">
    <a href="">
      <img :src="src" />
    </a>
    <strong :class="style" class="mt-3">{{ text }}</strong>
  </a-col>
</template>

<!--========Script========-->
<script>
export default {
  data() {
    return {
      src: null,
      text: null,
      style: null
    }
  },

  mounted() {
    this.SetData(this.index)
  },

  methods: {
    SetData(index) {
      switch (index) {
        case "1":
          this.text = "Pago En Linea"
          this.src = require("../../../public/img/dashboard/shape.png")
          this.style = "w-1 mb-6"
          break
        case "2":
          this.text = "Emisión EstadoDe Cuenta"
          this.src = require("../../../public/img/dashboard/shapex2.png")
          this.style = "w-2 mb-6"
          break
        case "3":
          this.text = "Solvencias"
          this.src = require("../../../public/img/dashboard/shapex3.png")
          this.style = "w-1 mb-6"
          break
        case "4":
          this.text = "Calificación"
          this.src = require("../../../public/img/dashboard/shapex4.png")
          this.style = "w-1 mb-6"
          break
        case "5":
          this.text = "Licencias"
          this.src = require("../../../public/img/dashboard/shapex5.png")
          this.style = "w-1 mb-6"
          break
        case "6":
          this.text = "Constancia Contribuyente  De Inmueble"
          this.src = require("../../../public/img/dashboard/shapex6.png")
          this.style = "w-3 mb-6"
          break
        case "7":
          this.text = "Traspaso Inmueble"
          this.src = require("../../../public/img/dashboard/shapex7.png")
          this.style = "w-1 mb-6 mb-xs-0"
          break
        case "8":
          this.text = "Reserva Espacios Publicos"
          this.src = require("../../../public/img/dashboard/shapex8.png")
          this.style = "w-2"
          break
      }
    },
  },

  props: ['index'],
};
</script>