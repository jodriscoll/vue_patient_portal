<template>
  <nav class="navbar">
    <ul class="navbar__list"
        @mouseover="dropdownMouseOver"
        @mouseleave="dropdownMouseLeave">
      <li class="navbar__list-item">
        <a href="#plan-options"
           class="navbar__link"
           title="My plan options">My Plan</a>
      </li>
      <li class="navbar__list-item">
        <a href="#insurance-verify"
           class="navbar__link"
           title="Verify my insurance">Verify Insurance</a>
      </li>
      <li class="dropdown">
        <a class="dropdown__toggle"
           href="#"
           id="navbarUserDropdown"
           role="button"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false"
           ref="dropdownElement"
           @click="dropdownClick">
          {{ firstName }}
        </a>
        <div class="dropdown__menu"
             aria-labelledby="navbarUserDropdown"
             v-if="dropdownOpen">
          <a href="/patient/settings"
             class="dropdown__link"
             title="Change your user settings">Settings</a>
          <div class="dropdown__divider" tabindex="-1"></div>
          <a href="/logout"
             class="dropdown__logout"
             title="Log out of your account">Log out</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownCurrentlyMouseOver: false,
      dropdownOpen: false,
    }
  },
  mounted: function() {
    this.debugger ? console.log( '%c\u2713 %cHeaderNavbar.vue %cLoaded%c!', "color: green", "color: #fb60fb", "color: lightgreen", "color: #979797" ) : false;
  },
  component: { },
  methods: {
    dropdownClick: function() {
      if (this.dropdownOpen) {
        this.dropdownOpen=false;
        this.$refs.dropdownElement.ariaExpanded='false';
      } else {
        this.dropdownOpen=true;
        this.$refs.dropdownElement.ariaExpanded='true';
      }
    },
    dropdownMouseLeave: function() {
      // Make sure this only fires when the dropdown is opened already.
      if (this.dropdownCurrentlyMouseOver) {
        // Remove the dropdown from the DOM, after .5 seconds
        setTimeout(() => {
          this.$refs.dropdownElement.ariaExpanded='false';
          this.dropdownOpen=false;
        }, 500);
      }
    },
    dropdownMouseOver: function() {
      this.dropdownCurrentlyMouseOver=true;
    }
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
  }
}
</script>