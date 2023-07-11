<template>
  <section class="grid-component">
    <div class="grid-component__header" :style="'background-color:' + bgColor">
      <img v-if="iconHref"
           :src="iconHref"
           class="grid-component__header-icon"
           alt="component icon" />
      <span class="grid-component__header-title">{{ title }}</span>
    </div>
    <div class="grid-component__window" :class="{ expand: stretchToFill }">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cGridComponent.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    bgColor: {
      type: String,
      required: false,
      default: '#d4ebfe'
    },
    iconHref: {
      type: String,
      required: true,
      default: ''
    },
    stretchToFill: Boolean,
    title: {
      type: String,
      required: true,
      default: ''
    },
  },
}
</script>