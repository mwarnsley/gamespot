import Vue from 'vue';

import { AUTH_USER, LOG_IN } from '../../constants';

const firebaseAuth =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const firebaseKey = 'AIzaSyAQZC9GL_Oqr5LpzCvuOpoyXJWQdPelXEw';

const admin = {
    namespaced: true,
    state: {
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
                .catch(error => {
                    throw new Error(error);
                });
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;
        }
    },
    getters: {}
};

export default admin;
