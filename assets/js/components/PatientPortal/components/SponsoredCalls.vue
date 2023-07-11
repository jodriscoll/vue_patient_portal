<template>
  <div class="sponsored-calls">
    <div class="plan-options__option">
      <div class="plan-options__introduction">
        <div class="plan-options__thumbnail">
          <img :src="sponsorThumbnail"
               :alt="sponsorTitle"
               class="plan-options__image" />
        </div>
        <div class="plan-options__details">
          <h3 class="plan-options__name">{{ sponsorTitle }}</h3>
          <span class="plan-options__location">{{ sponsorLocation }}</span>
        </div>
      </div>
      <div class="plan-options__content">
        <p class="plan-options__description">{{ sponsorDescription }}</p>
      </div>
      <div class="sponsored-calls__ctas">
        <a :href="primaryButtonHref"
           class="sponsored-calls__cta btn btn--primary"
           :title="primaryButtonTitle">{{ primaryButtonText }}</a>
        <a :href="secondaryButtonHref"
           class="sponsored-calls__cta btn btn--secondary"
           :title="secondaryButtonTitle">{{ secondaryButtonText }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function() { },
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cSponsoredCalls.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    sponsorThumbnail: {
      type: String,
      required: false,
      default: '/assets/images/patient-portal/sponsor-03.jpg'
    },
    sponsorTitle: {
      type: String,
      required: false,
      default: 'Paramount Recovery Center'
    },
    sponsorLocation: {
      type: String,
      required: false,
      default: 'Southborough, MA'
    },
    sponsorDescription: {
      type: String,
      required: false,
      default: 'Paramount Recovery Centers is a leading drug and alcohol treatment center in Massachusetts that combines environmental enrichment with respectful, compassionate care.'
    },
    primaryButtonHref: {
      type: String,
      required: false,
      default: 'tel:8885510446'
    },
    primaryButtonTitle: {
      type: String,
      required: false,
      default: 'Get Help'
    },
    primaryButtonText: {
      type: String,
      required: false,
      default: 'Get Help'
    },
    secondaryButtonHref: {
      type: String,
      required: false,
      default: 'tel:8885510446'
    },
    secondaryButtonTitle: {
      type: String,
      required: false,
      default: 'Call Now'
    },
    secondaryButtonText: {
      type: String,
      required: false,
      default: 'Call Now'
    },
  },
}
</script>