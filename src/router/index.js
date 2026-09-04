import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home.vue'
import AllProducts from '../views/AllProducts.vue'
import About from '../components/About.vue'
import NotFound from '../components/NotFound.vue'
import Productdetails from "../views/Productdetails.vue";
import basket from "@/views/basket.vue";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/products',
            component: AllProducts
        },
        {
            path: '/products/:id',
            component: Productdetails
        },
        {
            path: '/about',
            component: About
        },
         {
            path: '/basket',
            component: basket
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
    ]
})

export default router
