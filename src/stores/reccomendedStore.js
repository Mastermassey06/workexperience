import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReccomendedStore = defineStore('recommended', () => {

    const rank = ref([])


    async function rankitem(productID, points) {
        let item = rank.value.find(item => item.productID === productID)

        
        if (!item) {
            const response = await fetch(
                `https://dummyjson.com/products/${encodeURIComponent(productID)}`
        )

            const data = await response.json()
            item = rank.value.find(item => item.productID === productID)

            if (!item) {

            item = {
                productID,
                productName: data.title,
                productPrice: data.price,
                productDescription: data.description,
                thumbnail: data.thumbnail,
                points: 0,
                lastInteractedAt: 0,
                inCheckout: false
            }

            rank.value.push(item)
        }
    }

        item.points += points
        item.lastInteractedAt = Date.now()
    }
    async function searched(productId){

        await rankitem(productId, 1);
        console.log([...rank.value])
    }

    async function clicked(productId){
        await rankitem(productId, 2);
        console.log([...rank.value])
    }
    
    async function viewed10secs(productId){
        console.log("10 seconds HAVE PASSED")
        await rankitem(productId, 3);
    }

    
    async function addtoBag(productId){
        
        await rankitem(productId, 8);
    }

    async function removefromBag(productId){
        
       await rankitem(productId, -12);
    }

    async function loadProd(productId){
        
       await rankitem(productId, 0.5);
    }



    function getRecommendation(){
        return [...rank.value]
        .filter(item => !item.inCheckout && item.points > 0)  //if in checkout filter out
        .sort((a,b) => {
            if (b.points !== a.points){     //if b points dont equal a points
                return b.points - a.points    //return highest points 
            }

            return b.lastInteractedAt - a.lastInteractedAt   //if they are equal return the most recent interaction
        })
        .slice(0,10);  //return top 3
    }

    return {
        rank, 
        rankitem,
        searched,
        clicked,
        viewed10secs,
        getRecommendation,
        addtoBag,
        loadProd,
        removefromBag


    } 



})