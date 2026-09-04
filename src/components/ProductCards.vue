<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useBasketStore } from '@/stores/basketStore'
import { useReccomendedStore } from '@/stores/reccomendedStore'
import { useCategoricStore } from '@/stores/categoricStore'

const router = useRouter()

const basketStore = useBasketStore()
const productStore = useProductStore()
const recommendStore = useReccomendedStore()
const catStore = useCategoricStore()

const showPopup = ref(false)

onMounted(() => {
    if (productStore.products.length === 0) {
        productStore.fetchProducts()
    }
})


function productClicked(id) {
    router.push(`/products/${id}`)
    recommendStore.clicked(id)


}

function bagbuttonClicked(itemid){
    basketStore.addtoBasket(itemid)
    recommendStore.addtoBag(itemid)
    


    showPopup.value = true
    
    setTimeout(() => {
        showPopup.value = false
    }, 2000)

}

</script>

<template>

         <div v-if="showPopup" class="popup">
            Added to bag!
        </div>
    

    
        <div class="productsbox">
            <div v-for="value in productStore.products" :key = "value.id" class="card">
                <div class="card-image" @click="productClicked(value.id)">
                    <img :src="value.thumbnail" :alt="value.title">
                </div>

                <div class="content" @click="productClicked(value.id)">
                    <p class="title">{{ value.title }}</p>
                    <p class = "title price">£{{ value.price }}</p>
                </div>
                
                <button class="card-btn" @click="bagbuttonClicked(value.id)">Add to Bag</button>
                
            </div>
            
         </div>

        
         


    
</template>



<style scoped>

.card {
    width: 300px;
    height: 230px;
    background: #e7e5e5;
    padding: 15px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;

}
.productsbox {
    display: grid;
    grid-template-columns: repeat(4, 300px);
    gap: 20px 20px;
    padding: 20px;
    justify-content: center;

   
}
.card-image{
    width: 100%;
    height: 170px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s;

    
}


.card-image img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.content{
   
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    
   

}

.title {
    margin: 0;
    font-size: 0.72em;
    text-transform: uppercase;
    font-weight: 500;
    color: #4d4d4d;

}

.price {
    font-size: 1em;
    font-weight: 700;
}

.card-btn {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background-color: #f16d01;
    border: none;
    border-radius: 40px;
    color: white;
    transition: all 0.3s;
    cursor: pointer;
    font-weight: 500;

}



.card:hover .card-image {
    height: 120px;
    
    
}

.card:hover {
     text-decoration: underline;
     text-decoration-thickness: 1px;
    text-decoration-color: black;
}

.card:hover .card-btn{
    margin-top: 0;


}

.card-btn:hover {
    background-color: lightgray;
    color: rgb(35,35,35);
    text-decoration: underline;

}

.card:hover {
    background-color: white;
}


.popup {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #222;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    z-index: 1000;
    font-weight: 500;
}




</style>