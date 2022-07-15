<template>
  <!--Colletions-->
  <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="text-center">
    <a href="" target="_blank">
      <img :src="src" :class="style"/>
    </a>
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

  methods: {
    SetData(index) {
      switch (index) {
        case "1":
          this.text = "Pago En Linea"
          this.src = require("../../../public/img/dahsboard/shape.png")
          this.style = "mb-5"
          break
        case "2":
          this.text = "Emisión EstadoDe Cuenta"
          this.src = require("../../../public/img/dahsboard/shapex2.png")
          this.style = "mb-5"
          break
        case "3":
          this.text = "Solvencias"
          this.src = require("../../../public/img/dahsboard/shapex3.png")
          this.style = "mb-5"
          break
        case "4":
          this.text = "Calificación"
          this.src = require("../../../public/img/dahsboard/shapex4.png")
          this.style = "mb-5"
          break
        case "5":
          this.text = "Licencias"
          this.src = require("../../../public/img/dahsboard/shapex5.png")
          this.style = "mb-5"
          break
        case "6":
          this.text = "Constancia Contribuyente  De Inmueble"
          this.src = require("../../../public/img/dahsboard/shapex6.png")
          this.style = "mb-5"
          break
        case "7":
          this.text = "Traspaso Inmueble"
          this.src = require("../../../public/img/dahsboard/shapex7.png")
          this.style = "mb-5"
          break
        case "8":
          this.text = "Reserva Espacios Publicos"
          this.src = require("../../../public/img/dahsboard/shapex8.png")
          this.style = "mb-0"
          break
      }
    },
  },

  mounted() {
    this.SetData(this.index)
  },

  props: ['index'],
};
</script>