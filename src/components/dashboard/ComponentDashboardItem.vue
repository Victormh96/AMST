<template>
  <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" class="centered">
      <a href="" target="_blank" class="item-menu ">
        <div class="rounded-item centered">
          <img :src="src" />
        </div>
        <p>{{text}}</p>
      </a>
  </a-col>
</template>

<script>
export default {
  props: {
    index: String,
  },
  data() {
    return {
      src: null,
      text: null,
    };
  },
  methods: {
    SetData(index) {
      switch (index) {
        case 1:
          this.text = "Pago En Linea";
          this.src = require("../../../public/img/assets/dahsboard/01.png");
          break;
        case 2:
          this.text = "Emisión EstadoDe Cuenta";
          this.src = require("../../../public/img/assets/dahsboard/02.png");
          break;
        case 3:
          this.text = "Solvencias";
          this.src = require("../../../public/img/assets/dahsboard/03.png");
          break;
        case 4:
          this.text = "Calificación";
          this.src = require("../../../public/img/assets/dahsboard/04.png");
          break;
        case 5:
          this.text = "Licencias";
          this.src = require("../../../public/img/assets/dahsboard/05.png");
          break;
        case 6:
          this.text = "Constancia Contribuyente  De Inmueble";
          this.src = require("../../../public/img/assets/dahsboard/06.png");
          break;
        case 7:
          this.text = "Traspaso Inmueble";
          this.src = require("../../../public/img/assets/dahsboard/07.png");
          break;
        case 8:
          this.text = "Reserva Espacios Publicos";
          this.src = require("../../../public/img/assets/dahsboard/08.png");
          break;
      }
    },
  },
  mounted() {
    this.SetData(this.index);
  },
};
</script>

<style></style>
