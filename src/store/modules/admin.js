import Vue from 'vue';
import router from '../../routes';

import { AUTH_FAILED, AUTH_USER, LOG_IN } from '../../constants';

const firebaseAuth =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const firebaseKey = 'AIzaSyAQZC9GL_Oqr5LpzCvuOpoyXJWQdPelXEw';

const admin = {
    namespaced: true,
    state: {
        authFailed: false,
        refresh: null,
        token: null
    },
    actions: {
        login({ commit }, payload) {
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
                    localStorage.setItem('token', authData.idToken);
                    localStorage.setItem('refresh', authData.refreshToken);
                })
                .catch(() => {
                    commit(AUTH_FAILED);
                });
        },
        refreshToken({ commit }) {
            const refreshToken = localStorage.getItem('refresh');
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
                        localStorage.setItem('token', authData.id_token);
                        localStorage.setItem('refresh', authData.refresh_token);
                    })
                    .catch(() => {
                        console.error('Error');
                    });
            }
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;

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
        }
    },
    getters: {
        isAuth(state) {
            if (state.token) return true;
            return false;
        }
    }
};

export default admin;
