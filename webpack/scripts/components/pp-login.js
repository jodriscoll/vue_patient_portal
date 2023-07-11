/**
 * Patient Portal – Log in
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
function PPLogin(options) {
	this.options = $.extend( {}, defaults, options );
	this.init();
}

/**
 * Setup.
 */
PPLogin.prototype.init = function() {
	const loginForm = document.getElementById('login-form');

	function validateLoginForm() {
		const validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};
		const errorAlert = document.getElementById('form-error');

		let email = document.getElementsByClassName('form-section__input email')[0];
		let password = document.getElementsByClassName('form-section__input password')[0];
		let email_condition = !validateEmail(email.value);

		// Set the error default.
		let error = false;

		// Not a valid email address.
		if (email_condition) {
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
		// If any error detected.
		if (error) {
			errorAlert.style.display = 'block';
			errorAlert.focus();
			return false;
		}
	}

	// Don't do anything, unless the form is there.
	if (loginForm) {
		const loginFormSubmit = loginForm.getElementsByClassName('form-section__submit')[0];

		// Execute when the form is submitted.
		loginFormSubmit.addEventListener('click', validateLoginForm);
	}
};

/**
 * Public API
 *
 * @type {Object}
 */
module.exports = {
	init: function (opts) {
		return new PPLogin(opts);
	}
};
