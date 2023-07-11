<template>
  <div class="my-cases">
    <!-- Data present for this.$attrs.cases -->
    <ul class="my-cases__list" v-if="this.$attrs.cases['location']">
      <li class="my-cases__list-item">
        <span class="selected-label">Seeking care for:</span>
        <div v-for="(text) in userSeekingArray">
          <span v-if="text.value === $attrs.cases['seeking_for'] " class="selected-option">{{ text.text }}</span>
        </div>
      </li>
      <li class="my-cases__list-item">
        <span class="selected-label">Urgency:</span>
        <div v-for="(text) in userUrgencyArray">
          <span v-if="text.value === $attrs.cases['urgency'] " class="selected-option">{{ text.text }}</span>
        </div>
      </li>
      <li class="my-cases__list-item">
        <span class="selected-label">Help with:</span>
        <template v-if="this.user.interestedVertical === 0">
          <div v-for="(text) in userVertical0Array">
            <span v-if="text.value === $attrs.cases['help_with']" class="selected-option">{{ text.text }}</span>
          </div>
        </template>
        <template v-if="this.user.interestedVertical === 7">
          <div v-for="(text) in userVertical7Array">
            <span v-if="text.value === $attrs.cases['help_with']" class="selected-option">{{ text.text }}</span>
          </div>
        </template>
          <template v-if="this.user.interestedVertical === 8">
            <div v-for="(text) in userVertical8Array">
              <span v-if="text.value === $attrs.cases['help_with']" class="selected-option">{{ text.text }}</span>
            </div>
          </template>
      </li>
      <li class="my-cases__list-item">
        <span class="selected-label">Payment choice:</span>
        <div v-for="(text) in userPaymentArray">
          <span v-if="text.value === $attrs.cases['payment_choice'] " class="selected-option">{{ text.text }}</span>
        </div>
      </li>
      <li class="my-cases__list-item">
        <span class="selected-label">Location:</span>
        <span class="selected-option">{{ this.$attrs.cases['location'] }}</span>
      </li>
    </ul>

    <!-- No data for this.$attr.cases -->
    <form action="/users/update"
          class="my-cases__form"
          method="POST"
          v-else>
      <div class="my-cases__form-row">
        <DropdownField
            label="Seeking care for:"
            name="seeking-for"
            :options=userSeekingArray
        />
      </div>
      <div class="my-cases__form-row">
        <DropdownField
            label="Urgency:"
            name="urgency"
            :options=userUrgencyArray
        />
      </div>
      <div class="my-cases__form-row">
        <DropdownField
            label="Help with:"
            name="help-with"
            :options=helpWithDropdown()
        />
      </div>
      <div class="my-cases__form-row">
        <DropdownField
            label="Payment Choice:"
            name="payment-choice"
            :options=userPaymentArray
        />
      </div>
      <div class="my-cases__form-row">
        <InputField
            label="Location:"
            type="text"
            name="location"
            placeholder="Ex: 90210"
            :isRequired=true
            :maxLength="5" />
      </div>
      <div class="my-cases__form-row">
        <button type="submit"
                class="my-cases__form-submit btn btn--secondary"
                title="See what your plan options are">Update my plan</button>
      </div>
    </form>
  </div>
</template>

<script>
import DropdownField from "../elements/DropdownField";
import InputField from "../elements/InputField";

export default {
  data() {
    return {
      user: {
        interestedVertical: '',   // Populated by Symphony/Twig.
      },
      userSeekingArray: [{'text':'Myself', 'value':'myself'},{'text':'Loved one', 'value':'a_loved_one'}],
      userUrgencyArray: [{'text':'Right now', 'value':'right_now'},{'text':'A few days', 'value':'a_few_days'},{'text':'Within a week', 'value':'within_a_week'},{'text':'Within a month', 'value':'within_a_month'}],
      userVertical0Array: [{'text':'Alcohol', 'value':'alcohol'},{'text':'Drugs', 'value':'drugs'},{'text':'Dual diagnosis', 'value':'dual_diagnosis'},{'text':'Other', 'value':'other'}],
      userVertical7Array: [{'text':'Orthopedic', 'value':'orthopedic'},{'text':'Sports Medicine', 'value':'sports_medicine'},{'text':'Other', 'value':'other'}],
      userVertical8Array: [{'text':'Anxiety', 'value':'anxiety'},{'text':'Depression', 'value':'depression'},{'text':'Mental Illness', 'value':'mental_illness'},{'text':'Other', 'value':'other'}],
      userPaymentArray: [{'text':'Insurance', 'value':'insurance'},{'text':'Medicaid', 'value':'medicaid'},{'text':'Medicare', 'value':'medicare'},{'text':'Self-pay', 'value':'self_pay'}],
    }
  },
  created() {
    var self;
    self = this;
  },
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cMyCases.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
    this.getUserData();
  },
  components: {
    InputField,
    DropdownField,
  },
  methods:{
    getUserData: function() {
      let userData = document.getElementById('userData');
      this.user.interestedVertical = parseInt(userData.getAttribute('data-usr-vertical'));
    },
    helpWithDropdown: function() {
      let helpWithOptions = [{'':''}];

      switch (this.user.interestedVertical) {
        case 0:
          helpWithOptions = this.userVertical0Array;
          break;
        case 7:
          helpWithOptions = this.userVertical7Array;
          break;
        case 8:
          helpWithOptions = this.userVertical8Array;
          break;
      }

      return helpWithOptions;
    }
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    seeking_for: {
      type: String,
      required: false,
      default: ''
    },
    urgency: {
      type: String,
      required: false,
      default: ''
    },
    help_with: {
      type: String,
      required: false,
      default: ''
    },
    payment_choice: {
      type: String,
      required: false,
      default: ''
    },
    location: {
      type: Number,
      required: false,
      default: 0
    },
  },
}
</script>