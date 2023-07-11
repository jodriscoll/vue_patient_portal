<template>
  <div class="notification"
       id="notification"
       :data-dismissable="dismissible"
       v-if="isShown">
    <div :class="'notification__content notification__' + (hasError ? 'error' : 'success')"
         role="alert">
      <button type="button"
              class="notification__close"
              data-dismiss="alert"
              v-if="dismissible"
              @click="isShown=false">
        <span aria-hidden="true">×</span>
        <span class="sr-only">Close</span>
      </button>
      {{ hasError ? messageError : messageSuccess  }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
      messageError: 'Sorry, we were not able to verify your insurance details.',
      messageSuccess: 'Thank you for submitting your insurance information! It is currently being processed.',
    }
  },
  mounted() {
    this.showNotification();
  },
  methods: {
    showNotification: function() {
      let userData = document.getElementById('userData');
      let formSubmit = userData.getAttribute('data-ins-verified');

      // If notification is passed.
      (formSubmit === '1') ? this.isShown=true : this.isShown=false;
    }
  },
  components: { },
  props: {
    dismissible: {
      type: Boolean,
      required: false,
      default: true
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false
    },
  },
}
</script>