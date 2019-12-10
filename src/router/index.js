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
    },
    {
        path: '/app',
        name: 'app.main',
        component: () => import( /* webpackChunkName: "app.main" */ '../views/app/Main.vue'),
        meta: {
            title: 'Leaf'
        },
        children: [{
            path: 'myapps',
            name: 'app.main.myapps',
            component: () => import( /* webpackChunkName: "app.main.myapps" */ '../views/app/pages/MyApps.vue'),
            meta: {
                title: '我的应用'
            }
        }, {
            path: 'usersettings',
            name: 'app.main.usersettings',
            component: () => import( /* webpackChunkName: "app.main.usersettings" */ '../views/app/pages/UserSettings.vue'),
            meta: {
                title: '用户设置'
            }
        }]
    },
    {
        path: '/error/404',
        name: 'error.404',
        component: () => import( /* webpackChunkName: "error.404" */ '../views/error/404.vue'),
        meta: {
            title: '404 not found'
        }
    },
    {
        path: '*',
        name: 'error.404.default',
        component: () => import( /* webpackChunkName: "error.404" */ '../views/error/404.vue'),
        meta: {
            title: '404 not found'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
