import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBasketStore = defineStore('basket',() => {

    const basket = ref([])

    function addtoBasket(item){
        basket.value.push(item)

    }

    function removefromBasket(item){
        
        const index = basket.value.indexOf(item)

        if (index !== -1){
             basket.value.splice(index,1)

        }
           

    }

    async function getBasketProducts(){
        const products = await Promise.all(
            basket.value.map(async (id) => {
                const response = await fetch(
                     `https://dummyjson.com/products/${id}`
                )
                return await response.json()
            })
        )
        return products
    }
    return {
        basket,
        addtoBasket,
        removefromBasket,
        getBasketProducts
    }
})