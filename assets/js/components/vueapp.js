import Vue from 'vue/dist/vue.esm.js';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLocalStorage from 'vue-local-storage';

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.use(VueLocalStorage);

// Main Components
import PatientPortal from './components/PatientPortal/Index.vue';

Vue.component('patient-portal', PatientPortal);

// Global event bus
import EventBus from './components/EventBus.js';
Object.defineProperties(Vue.prototype, {
    eventBus: {
        get: function () {
            return EventBus;
        }
    }
});

var root = document.getElementById('app');

if (window.vue) {
    window.vue.$destroy(true);
}

window.vue = new Vue({
    render: h => h(
        Vue.component(root.dataset.component), {
            props: JSON.parse(root.dataset.props)
        }
    )
}).$mount(root);
