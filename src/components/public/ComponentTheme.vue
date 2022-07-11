<template>
    <!--Theme-->
<div class="prueba">		
	<input type="checkbox" id="toggle"/>
	<label for="toggle"></label>
</div>

</template>

<!--========Script========-->
<script>
export default {
    data() {
        return {
            theme: localStorage.theme
        }
    },

    methods: {
        doChangeTheme(checked) {
            if (checked) {
                document.querySelector("html").setAttribute("data-theme", "dark")

            } else {
                document.querySelector("html").setAttribute("data-theme", "")
            }
            localStorage.setItem('theme', checked)
        }
    },
};
</script>


<style>
.prueba {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  position: relative;
  display: block;
  width: 180px;
  height: 100px;
  border-radius: 100px;
  background-color: #000839;
  overflow: hidden;
  cursor: pointer;
}
label:before, label:after {
  display: block;
  position: absolute;
  content: "";
  width: 72px;
  height: 72px;
  border-radius: 50%;
  top: 14px;
  left: 14px;
  transition: 0.5s ease;
}
label:before {
  background-color: #ffa41b;
}
label:after {
  background-color: #000839;
  left: -58px;
  transform: scale(0.00001);
}

input[type=checkbox] {
  display: none;
}
input[type=checkbox]:checked + label:before {
  background-color: #FFF;
  transform: translateX(80px);
}
input[type=checkbox]:checked + label:after {
  transform: translateX(120px) scale(1);
}
</style>

