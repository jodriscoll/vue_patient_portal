<template>
  <div :class="'form-input' + showIcon">
    <div :class="'form-input__wrapper' + hasTextEntry">
      <img v-if="iconHref"
           :src="iconHref"
           class="form-input__icon"
           alt="Icon for the text input" />
      <input :type="type"
             :name="name"
             :class="'form-input__field' + showIcon"
             :placeholder="placeholder"
             :value="modelValue"
             :required="isRequired"
             @input="$emit('update:modelValue', $event.target.value)" />
      <label class="form-input__label" v-if="label">{{ label }}</label>
    </div>
    <div class="form-input__hint" v-if="showHints">
      <span>{{ placeholder }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHints: false,
    }
  },
  mounted: function() {
    // console.log('Input Field component loaded.');
  },
  computed: {
    hasTextEntry() {
      if (!this.showHints && this.value) {
        return ' has-entry';
      }
      return '';
    },
    showIcon() {
      if (this.iconHref) {
        return ' has-icon';
      }
      return '';
    },
  },
  emits: ['update:modelValue'],
  props: {
    hint: {
      type: String,
      required: false,
      default: ''
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
    maxLength: {
      type: Number,
      required: false,
      default: 99
    },
    modelValue: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    value: {
      type: [Number, String],
      required: false,
      default: ''
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
  },
}
</script>