import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/Home.vue';
import Login from './components/Authentication/Login.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from, to, savedPosition) {
        return { x: 0, y: 0 };
    }
});
