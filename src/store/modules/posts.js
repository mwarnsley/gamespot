import Vue from 'vue';

import { GET_ALL_POSTS, GET_POST } from '../../constants';
import { firebaseLooper } from '../../helpers';

const posts = {
    namespaced: true,
    state: {
        homePosts: [],
        post: {}
    },
    actions: {
        getAllPosts({ commit }, payload) {
            Vue.http
                .get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
                .then(response => response.json())
                .then(res => {
                    // Need to format the firebase data to fit what we have
                    const posts = firebaseLooper(res);
                    // When we commit we need to reverse the array of posts for the last one to be first
                    commit(GET_ALL_POSTS, posts.reverse());
                });
        },
        getPost({ commit }, id) {
            Vue.http
                .get(`posts.json?orderBy="$key"&equalTo="${id}"`)
                .then(response => response.json())
                .then(res => {
                    // Need to format the post to fit our state
                    const post = firebaseLooper(res);
                    // Commit the get post
                    commit(GET_POST, post);
                });
        }
    },
    mutations: {
        getAllPosts(state, posts) {
            state.homePosts = posts;
        },
        getPost(state, post) {
            state.post = post.length ? post[0] : {};
        },
        clearPost(state) {
            state.post = {};
        }
    },
    getters: {
        getAllPosts(state) {
            return state.homePosts;
        },
        getPost(state) {
            return state.post;
        }
    }
};

export default posts;
