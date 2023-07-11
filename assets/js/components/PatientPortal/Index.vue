<template>
  <div class="main" id="main-content">
    <AlertNotice />
    <header class="header">
      <div class="header__wrapper">
        <div class="header__column">
          <HeaderLogo srcLogo="/assets/images/v2/us/homepage/logo_home.svg" />
        </div>
        <div class="header__column">
          <HeaderNavbar :firstName="user.firstName" />
        </div>
      </div>
    </header>
    <section class="portal-finder">
      <PortalFinder
          :firstName="user.firstName"
          textHeading=", welcome to your Patient Portal"
          textParagraph="Find care that's right for you." />
    </section>
    <section class="grid-container">
      <GridComponent
          id="insurance-verify"
          iconHref="/assets/images/patient-portal/checkmark-shield.svg"
          title="Verify my insurance"
          :key="'verify-insurance'">
        <VerifyInsurance />
      </GridComponent>
      <GridComponent
          id="my-cases"
          iconHref="/assets/images/patient-portal/circled-silhouette.svg"
          title="My case"
          :key="'my-case'">
        <MyCases :cases="cases" />
      </GridComponent>
      <GridComponent
          id="advisor"
          iconHref="/assets/images/patient-portal/smiley-face.svg"
          bgColor="#ffeb6e"
          title="Meet your rehab advisor"
          :key="'advisor'"
          :stretchToFill=true>
        <MeetAdvisor
            fullName="Helena Georgiou"
            firstName="Helena"
            thumbnail="/assets/images/patient-portal/advisor-thumbnail.jpg"
            scheduleAppointmentHref="https://meetings.hubspot.com/patient-portal"
            chatHubspotID="hs-pp-chat"
        />
      </GridComponent>
      <div class="grid-wrapper" id="stackable">
        <GridComponent
            v-if="user.showSponsor"
            id="sponsored-calls"
            iconHref="/assets/images/patient-portal/checkmark-shield.svg"
            bgColor="#f17878"
            title="Featured sponsor"
            :key="'sponsor'">
          <SponsoredCalls />
        </GridComponent>
        <GridComponent
            id="plan-options"
            iconHref="/assets/images/patient-portal/circled-stacked-lines.svg"
            title="My plan"
            :key="'plan-options'">
          <PlanOptions
              v-for="(listing, index) in listings"
              :key="+ index + '-' + listing.id"
              :id="listing.id"
              :name="listing.name"
              :location="listing.location"
              :verified="listing.verified"
              :description="listing.description"
              :thumbnail="listing.thumbnail"
              :helpLinkHref="listing.helpLinkHref"
              :tourLinkHref="listing.tourLinkHref"
          />
        </GridComponent>
      </div>
    </section>
  </div>
</template>

<script>
const axios = require('axios').default;

import HeaderLogo from './components/HeaderLogo.vue';
import HeaderNavbar from './components/HeaderNavbar.vue';
import PortalFinder from './components/PortalFinder.vue';
import GridComponent from './components/GridComponent.vue';
import VerifyInsurance from './components/VerifyInsurance.vue';
import MeetAdvisor from './components/MeetAdvisor.vue';
import PlanOptions from './components/PlanOptions.vue';
import MyCases from './components/MyCases.vue';
import AlertNotice from './elements/AlertNotice.vue';
import SponsoredCalls from './components/SponsoredCalls.vue';

export default {
  data() {
    return {
      user: {
        firstName: '',            // Populated by Symphony/Twig.
        lastName: '',             // Populated by Symphony/Twig.
        insuranceVerified: false, // Populated by Symphony/Twig.
        interestedVertical: '',   // Populated by Symphony/Twig.
        showSponsor: true,
      },
      cases: [],                  // Populated by Symphony/Twig.
      listings: [],               // Populated by Axios/API Endpoint.
    }
  },
  created() {
    var self;
    self = this;
  },
  mounted() {
    this.bodyCssClass();
    this.getUserData();
    this.getCases();
    this.getPlanOptions();
    this.getUserData(() => {
      this.mobileGradient()
    })
  },
  components: {
    HeaderLogo,
    HeaderNavbar,
    PortalFinder,
    GridComponent,
    VerifyInsurance,
    PlanOptions,
    MeetAdvisor,
    MyCases,
    AlertNotice,
    SponsoredCalls,
  },
  methods: {
    bodyCssClass: function() {
      document.body.classList.add("patient-portal");
    },
    mobileGradient: function() {
      document.addEventListener('DOMContentLoaded', function (e) {
        let header = document.getElementsByClassName("header")[0];
        let portal_finder = document.getElementsByClassName("portal-finder")[0];
        let advisor_header = document.getElementById("advisor").getElementsByClassName("grid-component__header")[0];

        let dynamic_height = header.clientHeight + portal_finder.clientHeight + advisor_header.clientHeight + 'px';
        document.body.style.setProperty("--mobile-gradient-height", dynamic_height);
      });
    },
    getUserData: function() {
      let userData = document.getElementById('userData');
      this.user.firstName = userData.getAttribute('data-usr-first-name');
      this.user.insuranceVerified = userData.getAttribute('data-ins-verified');
      this.user.interestedVertical = userData.getAttribute('data-usr-vertical');
      this.user.showSponsor = parseInt(userData.getAttribute('data-usr-facility')) !== 7;
    },
    getCases: function() {
      const self = this;

      let userData = document.getElementById('userData');

      this.cases.seeking_for = userData.getAttribute('data-case-care-for');
      this.cases.urgency = userData.getAttribute('data-case-urgency');
      this.cases.help_with = userData.getAttribute('data-case-help-with');
      this.cases.payment_choice = userData.getAttribute('data-case-payment');
      this.cases.location = userData.getAttribute('data-case-location');
    },
    getPlanOptions: function() {
      const self = this;

      let userData = document.getElementById('userData');
      let verticalType = userData.getAttribute('data-usr-facility');
      let zipCode = userData.getAttribute('data-case-location');

      // Check for a zip-code being present.
      if (!zipCode) {
        var endPointUrl = '/api/v1/matched-listings/' + verticalType;
      } else {
        var endPointUrl = '/api/v1/matched-listings/' + verticalType + '/' + ( zipCode ? zipCode : '' );
      }

      axios.get(endPointUrl)
          .then(function (response) {
            self.listings = response.data.listings;
          })
          .catch(function (error) { // handle error
            console.error(error);
          })
          .then(function () {
            // always executed
          });
    },
  },
}
</script>