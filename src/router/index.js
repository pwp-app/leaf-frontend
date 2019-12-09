import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/landing/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'landing.home',
        component: Home,
        meta: {
            title: 'Leaf'
        }
    },
    {
        path: '/portal',
        name: 'landing.portal',
        component: () => import( /* webpackChunkName: "landing.portal" */ '../views/landing/Portal.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
