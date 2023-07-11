/**
 * Patient Portal – Registration
 *
 * @package rehab_admin
 */
const defaults = {
	debug: false
};

/**
 * Constructor
 *
 * @param {Object} options Optional properties to override defaults
 */
function PPRegistration(options) {
	this.options = $.extend( {}, defaults, options );
	this.init();
}

/**
 * Setup.
 */
PPRegistration.prototype.init = function() {
	const mobilePhoneInput = document.getElementById('mobile-phone');
	const registrationForm = document.getElementById('registration-form');

	// Execute when the form is submitted.
	function validateRegistrationForm(e) {
		e.preventDefault();

		const validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};
		const errorAlert = document.getElementById('form-error');

		let first_name = document.getElementsByClassName('form-section__input first-name')[0];
		let last_name = document.getElementsByClassName('form-section__input last-name')[0];
		let mobile = document.getElementsByClassName('form-section__input telephone')[0];
		let email = document.getElementsByClassName('form-section__input email')[0];
		let password = document.getElementsByClassName('form-section__input new-pass')[0];
		let vertical = document.getElementById('vertical');
		let formSectionDropdown = document.getElementById('formSectionDropdown');

		// Set the error default.
		let error = false;

		// First name is less than 3 characters.
		if (first_name.value.length < 3) {
			first_name.classList.add('error');
			error = true;
		} else {
			first_name.classList.remove('error');
		}

		// Last name is less than 3 characters.
		if (last_name.value.length < 3) {
			last_name.classList.add('error');
			error = true;
		} else {
			last_name.classList.remove('error');
		}

		// Mobile number is not 14 characters long
		if (mobile.value.length !== 14) {
			mobile.classList.add('error');
			error = true;
		} else {
			mobile.classList.remove('error');
		}

		// Not a valid email address.
		if (!validateEmail(email.value)) {
			email.classList.add('error');
			error = true;
		} else {
			email.classList.remove('error');
		}

		// Length of the password.
		if (password.value.length < 8) {
			password.classList.add('error');
			error = true;
		} else {
			password.classList.remove('error');
		}

		// Is the default value selected.
		if (vertical.value === "I need help with") {
			formSectionDropdown.classList.add('error');
			error = true;
		} else {
			formSectionDropdown.classList.remove('error');
		}

		// If any error detected.
		if (error) {
			errorAlert.style.display = 'block';
			errorAlert.focus();
			return false;
		} else {
			// No errors detected.
			document.getElementById('registration-form').submit();
		}
	}

	// Don't do anything, unless the form is there.
	if (registrationForm) {
		const registrationSubmit = registrationForm.getElementsByClassName('form-section__submit')[0];

		// Check for mobile phone, if present, monitor user input and filter if they do something silly.
		mobilePhoneInput.addEventListener('input', function (e) {
			var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
			e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
		});

		// Execute when the form is submitted.
		registrationSubmit.addEventListener('click', validateRegistrationForm);
	}
};

/**
 * Public API
 *
 * @type {Object}
 */
module.exports = {
	init: function (opts) {
		return new PPRegistration(opts);
	}
};
