<template>
  <article class="plan-options__row"
           :data-listing-id="id">
    <div class="plan-options__option">
      <div class="plan-options__introduction">
        <div class="plan-options__thumbnail">
          <img :src="(thumbnail === false ? '/assets/images/facility/profile_default.svg' : thumbnail)"
               class="plan-options__image"
               :alt="name + ' location photograph'" />
        </div>
        <div class="plan-options__details">
          <h3 class="plan-options__name">{{ name }}</h3>
          <span class="plan-options__location" :data-verified="verified">{{ location }}</span>
        </div>
      </div>
      <div class="plan-options__content">
        <p class="plan-options__description">{{ description }}</p>
      </div>
      <div class="plan-options__ctas">
        <a :href="helpLinkHref"
           class="plan-options__cta btn btn--primary"
           target="_blank"
           :title="'Explore options at ' + name">{{ helpLinkText }}</a>
        <!-- @TODO: will be a function, that when clicked, will generate HubSpot chat -->
        <a :href="tourLinkHref"
           class="plan-options__cta btn btn--secondary"
           target="_blank"
           :title="'Request a tour from ' + name">{{ tourLinkText }}</a>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cPlanOptions.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
    // this.checkForThumbnail(this.thumbnail);
  },
  methods: {
    /**
     * TODO: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
     *       Instead, use a data or computed property based on the prop's value.
     *
     *       Prop being mutated: "thumbnail"
     * @param thumbnail
     */
    checkForThumbnail: function(thumbnail) {
      if (thumbnail === false) {
        this.thumbnail = '/assets/images/facility/profile_default.svg';
      }
    },
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: Number,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    location: {
      type: String,
      required: true,
      default: ''
    },
    verified: Boolean,
    description: {
      type: String,
      required: true,
      default: 'No description available for this location.'
    },
    thumbnail: {
      type: [String, Boolean],
      required: false,
      default: ''
    },
    helpLinkHref: {
      type: String,
      required: false,
      default: ''
    },
    helpLinkText: {
      type: String,
      required: false,
      default: 'Get Help'
    },
    tourLinkHref: {
      type: String,
      required: false,
      default: ''
    },
    tourLinkText: {
      type: String,
      required: false,
      default: 'Request a tour'
    },
  },
}
</script>