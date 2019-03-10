import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './components/Home/Home.vue';
import Login from './components/Authentication/Login.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';
import MainDashboard from './components/Dashboard/Main.vue';
import AddPosts from './components/Dashboard/AddPosts.vue';
import ListPosts from './components/Dashboard/ListPosts.vue';
import Post from './components/Post/Post.vue';
import NotFound from './components/UI/NotFound.vue';

Vue.use(VueRouter);

// This is the authGuard to make sure that the routes are secure
const authGuard = {
    beforeEnter: (to, from, next) => {
        // If There is a token in the state then we will allow specific authorized routes
        const redirect = () => {
            if (store.state.admin.token) {
                if (to.path === '/login') {
                    next('/dashboard');
                } else {
                    next();
                }
            } else {
                if (to.path === '/login') {
                    next();
                } else {
                    next('/');
                }
            }
        };

        /**
         * If the state is refreshing for the loading
         * If it is not then we will go ahead and run the redirect to login to the app
         * Since we are using modules we need to do the watching this way
         */
        if (store.state.admin.refreshLoading) {
            store.watch(
                (_, getters) => getters['admin/refreshLoading'],
                () => {
                    // We are only going to run this after there is a change
                    redirect();
                }
            );
        } else {
            redirect();
        }
    }
};

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
        ...authGuard
    },
    {
        path: '/post/:id',
        component: Post,
        name: 'Post'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            {
                path: '/',
                component: MainDashboard,
                name: 'MainDashboard'
            },
            {
                path: 'add_posts',
                component: AddPosts,
                name: 'AddPosts'
            },
            {
                path: 'posts_list',
                component: ListPosts,
                name: 'ListPosts'
            }
        ],
        ...authGuard
    },
    {
        path: '*',
        component: NotFound,
        name: 'NotFound'
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from, to, savedPosition) {
        return { x: 0, y: 0 };
    }
});
