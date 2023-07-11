<template>
  <div class="portal-finder__wrapper">
    <h1 class="portal-finder__title">{{ firstName + textHeading }}</h1>
    <p class="portal-finder__paragraph">{{ textParagraph }}</p>
    <form :action="'/maps?vertical=' + verticalQueryString(verticalId) + '&query=' + urlFriendly(zipCityValue)"
          class="portal-finder__form"
          method="post"
          target="_blank">
      <div class="portal-finder__column type">
        <div class="form-select has-icon">
          <div class="form-select__wrapper">
            <img src="/assets/images/patient-portal/magnify-glass--black.svg"
                 class="form-select__icon"
                 alt="Icon for the dropdown" />
            <select type="text"
                    class="form-select__field"
                    name="portal-finder"
                    v-model="verticalId">
              <option value="0" :selected="verticalId==='0'">Addiction Treatment</option>
              <option value="7" :selected="verticalId==='7'">Physical Therapy</option>
              <option value="8" :selected="verticalId==='8'">Mental Health</option>
            </select>
          </div>
        </div>
      </div>
      <div class="portal-finder__column location">
        <div class="form-input has-icon">
          <div class="form-input__wrapper">
            <img src="/assets/images/patient-portal/pinpoint.svg"
                 class="form-input__icon"
                 alt="Icon for the text input" />
            <input type="text"
                   name="zip_code"
                   class="form-input__field has-icon"
                   placeholder="Zip code or city"
                   v-model="zipCityValue" />
          </div>
        </div>
      </div>
      <div class="portal-finder__column insurance">
        <div class="form-input has-icon">
          <div class="form-input__wrapper">
            <img src="/assets/images/patient-portal/member-card.svg"
                 class="form-input__icon"
                 alt="Icon for the text input" />
            <input type="text"
                   name="insurance-plan"
                   class="form-input__field has-icon"
                   placeholder="Insurance carrier and plan"
                   v-model="insurancePlan" />
          </div>
        </div>
      </div>
      <div class="portal-finder__column submit">
        <button type="submit"
                class="portal-finder__button btn btn--primary"
                :disabled=isDisabled
                @click="saveFinderFields">
          <img src="/assets/images/patient-portal/magnify-glass--white.svg"
               class="portal-finder__button-icon"
               alt="component icon" />
          <span class="sr-only">Search</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InputField from "../elements/InputField";
import DropdownField from "../elements/DropdownField";

export default {
  data () {
    return {
      verticalId: '',
      verticalSelectedValue: '',
      zipCityValue: '',
      insurancePlan: '',
    }
  },
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cPortalFinder.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
    this.getVertical();
  },
  components: {
    InputField,
    DropdownField
  },
  computed: {
    isDisabled() {
      let vertical = this.$parent.$data.user.interestedVertical.length>0,
          location = this.zipCityValue.length>0;
      return !vertical;
    },
  },
  methods: {
    saveFinderFields() {
      let vertical_type = this.verticalId,
          zip_or_city = this.zipCityValue,
          insurance_plan = this.insurancePlan;
      let values_to_send = [ vertical_type , zip_or_city , insurance_plan ];
    },
    getVertical: function() {
      const dataId = document.getElementById('userData').getAttribute('data-usr-vertical');
      this.verticalId = dataId;

      switch (dataId) {
        case '0':
          this.verticalSelectedValue = 'Addiction Treatment';
          break;
        case '7':
          this.verticalSelectedValue = 'Physical Therapy';
          break;
        case '8':
          this.verticalSelectedValue = 'Mental Health';
          break;
      }
    },
    urlFriendly: function(str) {
      str = (str+'').toString();
      return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
      replace(/\)/g, '%29').replace(/\*/g, '%2A');
    },
    verticalQueryString: function($verticalId) {
      switch ($verticalId) {
        case '0':
          this.verticalSelectedValue = 'Drug Rehabs';
          break;
        case '7':
          this.verticalSelectedValue = 'Physical Therapy Clinics';
          break;
        case '8':
          this.verticalSelectedValue = 'Mental Health Services';
          break;
      }
      return this.verticalSelectedValue;
    },
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
      default: ''
    },
    textHeading: {
      type: String,
      required: true,
      default: ''
    },
    textParagraph: {
      type: String,
      required: true,
      default: ''
    },
  },
}
</script>