import Vue from 'vue';
import router from '../../routes';

import {
    ADD_POST,
    AUTH_FAILED,
    AUTH_USER,
    CLEAR_ADD_POST,
    GET_ADMIN_POSTS,
    IMAGE_UPLOAD,
    LOG_IN,
    REFRESH_LOADING
} from '../../constants';

import filter from 'lodash/filter';
import { firebaseLooper } from '../../helpers';

const firebaseAuth =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const firebaseKey = 'AIzaSyAQZC9GL_Oqr5LpzCvuOpoyXJWQdPelXEw';

const admin = {
    namespaced: true,
    state: {
        adminPosts: [],
        addPost: false,
        authFailed: false,
        imageUpload: null,
        refresh: null,
        refreshLoading: true,
        token: null
    },
    actions: {
        login({ commit }, payload) {
            // Logging the user into the app
            Vue.http
                .post(`${firebaseAuth}/verifyPassword?key=${firebaseKey}`, {
                    ...payload,
                    returnSecureToken: true
                })
                .then(response => response.json())
                .then(authData => {
                    commit(AUTH_USER, {
                        ...authData,
                        type: LOG_IN
                    });
                    // Storing the refresh token and the regular token in the local storage
                    localStorage.setItem('token', authData.idToken);
                    localStorage.setItem('refresh', authData.refreshToken);
                })
                .catch(() => {
                    commit(AUTH_FAILED);
                });
        },
        refreshToken({ commit }) {
            // Grabbing the refresh token from the local storage
            const refreshToken = localStorage.getItem('refresh');
            // If there is a refresh token then we will authenticate the user again
            if (refreshToken) {
                Vue.http
                    .post(
                        `https://securetoken.googleapis.com/v1/token?key=${firebaseKey}`,
                        {
                            grant_type: 'refresh_token',
                            refresh_token: refreshToken
                        }
                    )
                    .then(response => response.json())
                    .then(authData => {
                        commit(AUTH_USER, {
                            idToken: authData.id_token,
                            refreshToken: authData.refresh_token,
                            type: 'refresh'
                        });

                        // Changing the refresh loading for the page to load on the page we are currently on
                        commit(REFRESH_LOADING);

                        localStorage.setItem('token', authData.id_token);
                        localStorage.setItem('refresh', authData.refresh_token);
                    })
                    .catch(() => {
                        console.error('Error');
                    });
            } else {
                commit(REFRESH_LOADING);
            }
        },
        addPost({ commit, state }, post) {
            Vue.http
                .post(`posts.json?auth=${state.token}`, post)
                .then(response => response.json())
                .then(() => {
                    // Commiting the add post and then clearing the post data
                    commit(ADD_POST);
                    setTimeout(() => {
                        commit(CLEAR_ADD_POST);
                    }, 3000);
                });
        },
        imageUpload({ commit }, file) {
            // Getting the cloudinary url from cloudinary for uploading images
            const CLOUDINARY_URL =
                'https://api.cloudinary.com/v1_1/marcuscloud/image/upload';
            // Getting the preset needed for uploading images
            const CLOUDINARY_PRESET = 'hplstavr';

            let formData = new FormData();

            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_PRESET);

            Vue.http
                .post(CLOUDINARY_URL, formData, {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => response.json())
                .then(res => {
                    commit(IMAGE_UPLOAD, res);
                });
        },
        getAdminPosts({ commit }) {
            Vue.http
                .get('posts.json')
                .then(response => response.json())
                .then(res => {
                    // Formatting the data to fit the state
                    const posts = firebaseLooper(res);
                    // Commiting getting the admin post and reversing the order for the newest to be first
                    commit(GET_ADMIN_POSTS, posts.reverse());
                });
        },
        deletePost({ commit, state }, id) {
            Vue.http.delete(`posts/${id}.json?auth=${state.token}`).then(() => {
                // Getting all of the admin post
                const newPost = filter(
                    state.adminPosts,
                    post => post.id !== id
                );
                // Updating the state with the new post
                commit(GET_ADMIN_POSTS, newPost);
            });
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;

            // If the type from the authData is equal to login then we are routing the user to the dashboard after login
            if (authData.type === LOG_IN) {
                router.push('/dashboard');
            }
        },
        authFailed(state, type) {
            if (type === 'reset') {
                state.authFailed = false;
            } else {
                state.authFailed = true;
            }
        },
        logoutUser(state) {
            state.refresh = null;
            state.token = null;

            localStorage.removeItem('token');
            localStorage.removeItem('refresh');

            router.push('/');
        },
        refreshLoading(state) {
            state.refreshLoading = false;
        },
        addPost(state) {
            state.addPost = true;
        },
        clearAddPost(state) {
            state.addPost = false;
        },
        imageUpload(state, image) {
            state.imageUpload = image.secure_url;
        },
        clearImageUpload(state) {
            state.imageUpload = null;
        },
        getAdminPosts(state, posts) {
            state.adminPosts = posts;
        }
    },
    getters: {
        isAuth(state) {
            if (state.token) return true;
            return false;
        },
        refreshLoading(state) {
            return state.refreshLoading;
        },
        addPostStatus(state) {
            return state.addPost;
        },
        imageUpload(state) {
            return state.imageUpload;
        },
        getAdminPosts(state) {
            return state.adminPosts;
        }
    }
};

export default admin;
