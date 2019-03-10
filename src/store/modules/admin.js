import Vue from 'vue';

import { AUTH_FAILED, AUTH_USER, LOG_IN } from '../../constants';

const firebaseAuth =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const firebaseKey = 'AIzaSyAQZC9GL_Oqr5LpzCvuOpoyXJWQdPelXEw';
const projectId = 'gamespot-25af3';

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
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;
        },
        authFailed(state, type) {
            if (type === 'reset') {
                state.authFailed = false;
            } else {
                state.authFailed = true;
            }
        }
    },
    getters: {}
};

export default admin;
