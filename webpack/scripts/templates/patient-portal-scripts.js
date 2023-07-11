/**
 * Patient Portal (Symphony)
 *
 * @package rehab_admin
 */

import PPLogin from "~webpack/scripts/components/pp-login";
import PPRegistration from "~webpack/scripts/components/pp-registration";
import PPSettings from "~webpack/scripts/components/pp-settings";

// Equivalent of $(document).ready().
(function (ready) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		ready();
	} else {
		document.addEventListener("readystatechange", function() {
			if (document.readyState === "complete") {
				ready();
			}
		});
	}
})(function dom_ready_scripts() { // Document is now complete.
	PPLogin.init();
	PPRegistration.init();
	PPSettings.init();
});
