import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import store from './store/store';
import vuelidate from 'vuelidate';
import router from './routes';
import Button from './components/UI/Button.vue';
import wysiwyg from 'vue-wysiwyg';
import {
    MdCard,
    MdButton,
    MdDialog,
    MdContent
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

Vue.component('app-button', Button);

Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdContent);
Vue.use(VueResource);
Vue.use(vuelidate);
Vue.use(wysiwyg, {});

Vue.http.options.root = '';
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
