import { defineStore } from "pinia"
import { ref } from 'vue'

export const useCategoricStore = defineStore('categoric', () => {
    const categories = ref([])


    async function getCategory(){

        const response = await fetch(
            'https://dummyjson.com/products/category-list'
        )

        const data = await response.json()

        categories.value = data

    }

    return {
        categories,
        getCategory

    }

})