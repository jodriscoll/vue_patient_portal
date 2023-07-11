### Patient Portal VueJS

A VueJS application seamlessly integrated into a Symphony web application, facilitating smooth data exchanges with a MySQL database.

---

#### Application breakdown:

- The core VueJS app is located in `assets/js/components/vueapp.js`
- The VueJS for the Patient Portal is located in `assets/js/components/PatientPortal/index.vue`
- `webpack` is used for local depencies around pre-processing
	- All of the `webpack` dependencies are located with the `webpack/` directory
- Symphony loads VueJS into the `/login`, `/registration`, `/patient`
    - When the user accesses `/login`, it routes through `SecruityController.php` within Syphomy
- The different Twig templates for Symphony is located in `templates/patient_portal/*.html.twig`
- Any visuals used should be located in `assets/images/`