import Vue from 'vue'
import Router from 'vue-router'
import Photos from '@/components/Photos'
import Photo from '@/components/Photo'

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Photos',
            component: Photos
        },
        {
            path: "/photo/:id",
            name: "Photo",
            component: Photo,
            meta: { bodyClass: 'overflow' }
        }
    ]
});

export default router;
