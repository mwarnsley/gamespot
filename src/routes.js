import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './components/Home/Home.vue';
import Login from './components/Authentication/Login.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {
        if (store.state.admin.token) {
            next();
        } else {
            next('/');
        }
    }
};

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
    },
    {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        ...authGuard
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from, to, savedPosition) {
        return { x: 0, y: 0 };
    }
});
