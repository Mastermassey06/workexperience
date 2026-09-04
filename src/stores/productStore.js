import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useReccomendedStore } from './reccomendedStore'

export const useProductStore = defineStore('products', () => {

    const products = ref([])
    const searchQuery = ref('')
    const selectedcategory = ref('')

    async function fetchProducts() {
        const response = await fetch(
            'https://dummyjson.com/products?limit=0'
        )

        const data = await response.json()

        products.value = data.products
    }

    async function searchProducts(query) {
        searchQuery.value = query 
        const reccomendedStore = useReccomendedStore()

    
        const response = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        )

        const data = await response.json()

        products.value = data.products

        data.products.forEach(product => {
            reccomendedStore.searched(product.id)
            
        });


    }

    async function category(category) {
        
        const response = await fetch(
            `https://dummyjson.com/products/category/${encodeURIComponent(category)}`

        )

        const data = await response.json()
        products.value = data.products

    }

    async function getCategoryImage(category) {
    const response = await fetch(
        `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
    )

    const data = await response.json()

    if (data.products.length > 0) {
        return data.products[0].images[0]
    }

    return ''
}


    async function sortBy(sortType, sortDirection) {

        let url 

        if (searchQuery.value){
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.value)}&sortBy=${sortType}&order=${sortDirection}`
        } else {
            url = `https://dummyjson.com/products?sortBy=${sortType}&order=${sortDirection}`
        }
        

        const response = await fetch (url)
        const data = await response.json()
        products.value = data.products

    }

    return {
        products,
        fetchProducts,
        searchProducts,
        sortBy,
        category,
        getCategoryImage
    }
})