import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from "vue-resource";
import PhotosService from "../services/photos.service";
import {includes, uniqBy} from "lodash";

Vue.use(VueResource);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        photos: []
    },
    actions: {
        LOAD_PHOTOS: function (context) {
            return PhotosService.getPhotos()
                .then((response) => context.commit('SET_PHOTOS', response));
        }
    },
    mutations: {
        SET_PHOTOS: (state, photos) => {
            state.photos = photos;
        }
    },
    getters: {
        filteredPhotos: (state) => (locations) => {
            return state.photos.filter(photo => includes(locations, photo.location));
        },
        locations: (state) => {
            return uniqBy(state.photos, "location");
        }
    }
});

export default store;