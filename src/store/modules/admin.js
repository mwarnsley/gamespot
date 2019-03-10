import Vue from 'vue';
import router from '../../routes';

import {
    AUTH_FAILED,
    AUTH_USER,
    LOG_IN,
    REFRESH_LOADING
} from '../../constants';

const firebaseAuth =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const firebaseKey = 'AIzaSyAQZC9GL_Oqr5LpzCvuOpoyXJWQdPelXEw';

const admin = {
    namespaced: true,
    state: {
        authFailed: false,
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
        }
    },
    getters: {
        isAuth(state) {
            if (state.token) return true;
            return false;
        },
        refreshLoading(state) {
            return state.refreshLoading;
        }
    }
};

export default admin;
