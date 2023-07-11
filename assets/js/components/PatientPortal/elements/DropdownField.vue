<template>
  <div  :class="'form-select' + show_icon">
    <div class="form-select__wrapper">
      <img v-if="iconHref"
           :src="iconHref"
           class="form-select__icon"
           alt="Icon for the dropdown" />
      <label class="form-select__label" v-if="!hideLabel">{{ label }}</label>
      <select type="text"
              class="form-select__field"
              :name="name">
        <option
            v-for="option in this.$attrs.options"
            :value="option.value">{{ option.text }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      consoleLogging: true,
      options: '',
      selected: '',
    }
  },
  mounted: function() {
    // this.consoleLogging ? console.log('My cases component loaded.') : false;
    // console.log(this.$attrs.options)
  },
  computed: {
    filled() {
      if ( !this.show && this.value ) {
        return ' has-entry';
      }
      return '';
    },
    show_icon() {
      if ( this.iconHref ) {
        return ' has-icon';
      }
      return '';
    },
  },
  props: {
    hideLabel: {
      type: Boolean,
      default: false
    },
    iconHref: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    value : {
      type: String,
      required: false,
      default: ''
    },
  },
}
</script>