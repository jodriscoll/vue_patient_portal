/**
 * Patient Portal – Settings
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
function PPSettings(options) {
	this.options = $.extend( {}, defaults, options );
	this.init();
}

/**
 * Setup.
 */
PPSettings.prototype.init = function() {
	const settingsPage = document.body.classList.contains('portal-settings');

	function editingFormBehavior() {
		const settingsForm = '.js-pp-settings';
		const editFormBtn = $('.js-pp-editing');

		// Disable fields.
		const disableEditing = function(selector) {
			$(selector).removeClass('form--enabled').addClass('form--disabled');
			$(selector + ' input, ' + selector + ' select, ' + selector + ' button').prop('disabled', true);
		};

		// Enable fields.
		const enableEditing = function(selector) {
			$(selector + ' input, ' + selector + ' select, ' + selector + ' button ').prop('disabled', false);
			$(selector).removeClass('form--disabled').addClass('form--enabled');
		};

		// Initially disable all fields.
		disableEditing(settingsForm);

		// When one of the "Edit" buttons are clicked, check what to do.
		editFormBtn.on('click', function() {
			// Get the status of form.
			const checkStatus = $(settingsForm).hasClass('form--disabled') ? 'disabled' : 'enabled';

			// Check if disabled or enabled.
			switch (checkStatus) {
				case 'disabled':
					enableEditing(settingsForm);
					$(this).text('Undo');
					break;
				case 'enabled':
					disableEditing(settingsForm);
					$(this).text('Edit');
					break;
			}
		});
	}

	function navbarDropdown() {
		let dropdownToggle = document.getElementById('navbarUserDropdown');
		let dropdownMenu = document.getElementById('navbarUserMenu');
		let dropdownOpenedCSS = 'dropdown-opened';

		function openDropdown(e) {
			// Update the aria on the toggle.
			e.target.ariaExpanded='true';
			// Show the menu.
			dropdownMenu.classList.add(dropdownOpenedCSS);
		}

		function resetDropdowns() {
			// Dropdown menu has open class
			let isDropdownOpened = dropdownMenu.classList.contains(dropdownOpenedCSS);

			if (isDropdownOpened) {
				// Update the aria on the toggle.
				dropdownToggle.ariaExpanded='false';
				// Remove the open class.
				dropdownMenu.classList.remove(dropdownOpenedCSS);
			}
		}

		function documentHandler() {
			resetDropdowns();
			// Remove document click listener
			document.removeEventListener('click', documentHandler , false);
		}

		dropdownToggle.addEventListener('click',function(e) {
			let isActive = dropdownMenu.classList.contains(dropdownOpenedCSS);

			resetDropdowns();

			if (isActive) { return; }

			e.stopPropagation();
			e.preventDefault();

			openDropdown(e);

			// Add document click listener to close dropdown on outside click.
			document.addEventListener('click', documentHandler, false);
		}, false);
	}

	function dynamicInput() {
		// TODO: convert to vanilla JS
		let targetElement = $('.js-dynamic-input');

		// Set the initial width
		targetElement.css('width', function() {
			// return ((this.getAttribute('placeholder').length + 1) * 8) + 'px';
			return ((this.value.length + 1) * 8) + 'px';
		});
		targetElement.focusin( function() {
			this.style.width = ((this.value.length + 1) * 8) + 'px';
		});
		targetElement.focusout( function() {
			if ( this.value.length > 0) {
				this.style.width = ((this.value.length + 1) * 8) + 'px';
			} else {
				this.style.width = ((this.getAttribute('placeholder').length + 1) * 8) + 'px';
			}
		});
	}

	// Don't do anything, unless the form is there.
	if (settingsPage) {
		// Prime the form behaviors.
		editingFormBehavior();
		// Mimic the Vue.js navbar dropdown functionality.
		navbarDropdown();
		// Dynamically adjust the width of the text inputs.
		dynamicInput();
	}
};

/**
 * Public API
 *
 * @type {Object}
 */
module.exports = {
	init: function (opts) {
		return new PPSettings(opts);
	}
};
