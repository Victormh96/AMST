<template>
    <!--Theme-->
    <label class="theme-checkbox" for="theme-checkbox" title="Change theme">
        <input type="checkbox" id="theme-checkbox" class="sr-only" @click="doChangeTheme((exchange = !exchange))" />


        <svg class="theme-checkbox__icon" viewBox="0 0 100 100">


            <mask id="mask--inner">
                <circle class="mask--inner" cx="50" cy="50" r="25" fill="white" stroke-width="5" stroke="white">
                </circle>
            </mask>


            <mask id="mask--outer">
                <rect width="100" height="100" fill="white"></rect>
                <circle class="mask--outer" cx="67.67" cy="32.33" fill="black" r="25"></circle>
            </mask>



            <circle class="circle--inner" cx="50" cy="50" r="25" mask="url(#mask--outer)"></circle>

            <circle class="circle--outer" cx="67.67" cy="32.33" r="25" mask="url(#mask--inner)"></circle>

            <line class="line line--1" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--2" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--3" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--4" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--5" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--6" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--7" x1="50" y1="23" x2="50" y2="28" />
            <line class="line line--8" x1="50" y1="23" x2="50" y2="28" />
        </svg>
    </label>

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
:root {
    --theme: #A8A8A7
}

html[data-theme=dark] {
    --theme: #cc9900;
}


.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    white-space: nowrap;
}

.theme-checkbox__icon {
    width: 50px;
    cursor: pointer;
}

.circle--inner,
.circle--outer {
    fill: none;
    stroke: var(--theme);
    stroke-width: 5;
    transition: all 0.5s ease-in-out;
}

.mask--outer,
.mask--inner {
    transition: all 0.5s ease-in-out;
}

.line {
    stroke: var(--theme);
    stroke-width: 5;
    stroke-linecap: round;
    transform-origin: center;
    transition: all 0.5s ease-in-out;
    opacity: 0;
}



html[data-theme=dark] svg .circle--outer,

html[data-theme=dark] svg .mask--outer {
    r: 0%;
}

html[data-theme=dark] svg .circle--inner,
html[data-theme=dark] svg .mask--inner {
    r: 12.5%;
}

html[data-theme=dark] svg .line {
    opacity: 1;
}

html[data-theme=dark] svg .line--1 {
    transform: rotate(0deg) scaleY(1);
}

html[data-theme=dark] svg .line--2 {
    transform: rotate(45deg) scaleY(1);
}

html[data-theme=dark] svg .line--3 {
    transform: rotate(90deg) scaleY(1);
}

html[data-theme=dark] svg .line--4 {
    transform: rotate(135deg) scaleY(1);
}

html[data-theme=dark] svg .line--5 {
    transform: rotate(180deg) scaleY(1);
}

html[data-theme=dark] svg .line--6 {
    transform: rotate(225deg) scaleY(1);
}

html[data-theme=dark] svg .line--7 {
    transform: rotate(270deg) scaleY(1);
}

html[data-theme=dark] svg .line--8 {
    transform: rotate(315deg) scaleY(1);
}
</style>

