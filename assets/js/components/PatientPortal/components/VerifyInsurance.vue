<template>
  <div class="insurance-verify">
    <form action="/users/update"
          class="finder__form"
          method="POST">
      <div class="insurance-verify__row">
        <input class="form-input__field"
               type="text"
               name="insurance-plan"
               placeholder="Plan and carrier"
               v-model="planValue" />
      </div>
      <div class="insurance-verify__row">
        <input class="form-input__field"
               type="text"
               name="insurance-id"
               placeholder="Member ID"
               v-model="memberIDValue" />
      </div>
      <div class="insurance-verify__column">
        <button type="submit"
                class="btn btn--primary"
                :disabled=isDisabled>Verify my insurance</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      planValue: '',
      memberIDValue: '',
    }
  },
  computed: {
    isDisabled: function() {
      let planInput = this.planValue.length > 0,
          memberInput = this.memberIDValue.length > 0;
      return !(planInput && memberInput);
    }
  },
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cVerifyInsurance.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
  },
  components: { },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: { }
}
</script>