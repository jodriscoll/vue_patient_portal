<template>
  <div class="advisor">
    <div class="advisor__thumbnail">
      <img class="advisor__photograph"
           height="120"
           width="120"
           :src="thumbnail"
           :alt="'Photograph of ' + fullName" />
    </div>
    <h3 class="advisor__title">Ask {{ firstName }} about anything you might need help with</h3>
    <div class="advisor__content">
      <p class="advisor__description">{{ description }}</p>
      <div class="advisor__ctas">
        <a :href="scheduleAppointmentHref"
           target="_blank"
           class="advisor__cta btn btn--primary appointment"
           title="Schedule an appointment with your advisor today!">{{ scheduleAppointmentText }}</a>
        <a href="#hs-chat-open"
           :id=chatHubspotID
           class="advisor__cta btn btn--secondary chat"
           title="Click to open a chat session">{{ chatText }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function() {
    let hubspotChatScript = document.createElement('script');
    hubspotChatScript.setAttribute('src', '//js.hs-scripts.com/5181917.js');
    hubspotChatScript.setAttribute('id', 'hs-script-loader');
    hubspotChatScript.setAttribute('async', '');
    hubspotChatScript.setAttribute('defer', '');
    document.body.appendChild(hubspotChatScript);
  },
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cMeetAdvisor.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
  },
  props: {
    debugger: {
      type: Boolean,
      required: false,
      default: false,
    },
    chatHubspotID: {
      type: String,
      required: false,
      default: 'hs-'
    },
    chatText: {
      type: String,
      required: false,
      default: 'Chat'
    },
    description: {
      type: String,
      required: false,
      default: 'We can help you find available rehab appointments near you or notify you when availability opens up.'
    },
    firstName: {
      type: String,
      required: true,
      default: ''
    },
    fullName: {
      type: String,
      required: true,
      default: ''
    },
    thumbnail: {
      type: String,
      required: false,
      default: '/assets/images/facility/profile_default.svg'
    },
    scheduleAppointmentHref: {
      type: String,
      required: false,
      default: ''
    },
    scheduleAppointmentText: {
      type: String,
      required: false,
      default: 'Schedule an appointment'
    },
  },
}
</script>