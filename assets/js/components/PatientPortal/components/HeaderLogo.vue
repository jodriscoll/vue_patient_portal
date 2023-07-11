<template>
  <div>
    <!-- @TODO: need to rebuild the burger menu into a component -->
    <div class="burger-menu" v-if="showBurgerMenu">
      <button class="burger-menu__button">+</button>
    </div>

    <a href="https://www.rehab.com/"
       class="header-logo"
       title="Visit Rehab.com">
      <img :src="srcLogo"
           class="logo"
           alt="Rehab.com logo"
           height="32"
           width="185" />
    </a>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cHeaderLogo.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    showBurgerMenu: {
      type: Boolean,
      required: false,
      default: false,
    },
    srcLogo: {
      type: String,
      required: true,
      default: ''
    },
  },
}
</script>