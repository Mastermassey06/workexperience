<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './Navbar.vue'
import { useReccomendedStore } from '@/stores/reccomendedStore.js';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBasketStore } from '@/stores/basketStore.js';
import { useProductStore } from '@/stores/productStore.js';
import { useCategoricStore } from '@/stores/categoricStore.js';

const recStore = useReccomendedStore()
const baskStore = useBasketStore()
const prodStore = useProductStore()
const categoricStore = useCategoricStore()
const router = useRouter()
const categoryImages = ref({})


async function loadCategoryImages() {
    for (const category of categories.value) {
        categoryImages.value[category] =
            await prodStore.getCategoryImage(category)
    }
}


const catimage = computed(() => {
    return prodStore.category(category)
})


const recommendations = computed(() => {
    return recStore.getRecommendation()
})

const categories = computed(() => {
    return categoricStore.categories
})

const basketProducts = ref([])

onMounted(async () => {
    basketProducts.value = await baskStore.getBasketProducts()
    loadrec()
    await categoricStore.getCategory()

    await loadCategoryImages()
})

function loadrec() {

    recStore.loadProd(Math.floor(Math.random() * 128) +1)
    recStore.loadProd(Math.floor(Math.random() * 128) +1)
    recStore.loadProd(Math.floor(Math.random() * 128) +1)


}

function removeproduct(prod) {
    recStore.rankitem(prod, -50)
    
}


 
const slogans = ['Shop Everything. Find Anything. Love Every Purchase.',
'From Everyday Essentials to Things You Didn’t Know You Needed.',
'One Site. Endless Choices. Your Next Favourite Find.', 'Find What You Love. We Have it All at Ellizon.'];

const currentText = ref('')
const sloganIndex = ref(0)

const speed = 50

function typeWriter() {
    const text = slogans[sloganIndex.value]

    let i = 0

    // Clear the previous slogan
    currentText.value = ''

    function type() {
        if (i < text.length) {
            currentText.value += text.charAt(i)
            i++

            setTimeout(type, speed)
        } else {
            // Wait 2 seconds, then switch to next slogan
            setTimeout(() => {
                sloganIndex.value++

                if (sloganIndex.value >= slogans.length) {
                    sloganIndex.value = 0
                }

                typeWriter()
            }, 2000)
        }
    }

    type()
}

onMounted(() => {
    typeWriter()
})

function productClicked(id) {
    router.push(`/products/${id}`)
    recStore.clicked(id)


}

async function categoryClicked(category){
    await prodStore.category(category)
    router.push(`/products`)
}

function Checkout(){
    router.push('/basket')
}
</script>

<template>
    <Navbar />
    <div>
        <div class="rectitle">
             <p id="typewriteeffect">{{ currentText }}</p>
            
           

        
        </div>
        <p class="rec">> Recommended Products</p>

       

       <div class="productsbox">
            <div v-for="value in recommendations" :key = "value.productID" class="card" @click="productClicked(value.productID)">
               <button class="remove-btn" @click.stop="removeproduct(value.productID)">
                x
               </button>
               
                <div class="card-image">
                    <img :src="value.thumbnail" :alt="value.productName">
                </div>

                <div class="content">
                    <p class="title">{{ value.productName }}</p>
                    <p class = "title price">£{{ value.productPrice}}</p>
                    <p class = "description">{{ value.productDescription}}</p>
                </div>
                
                
                
            </div>
            
         </div>
        <div class="secondsec">
            <p class="rec2">> Your Basket</p>
            <div v-if="loading" class="loading">Loading...</div>
           <div v-else-if="basketProducts.length === 0" class="emptybasket">
    <div class="emptybasket-icon">
        🛒
    </div>

    <h2>Your Basket is Empty</h2>

    <p>
        Looks like you haven't added anything to your basket yet.
    </p>

    <button @click="router.push('products')">
        Continue Shopping
        <span>→</span>
    </button>
</div>
              <div v-else class="basket-products">

        <div
            v-for="basketItem in basketProducts"
            :key="basketItem.id"
            class="basket-card"
        >

            <div class="basket-card-image">
                <img
                    :src="basketItem.thumbnail"
                    :alt="basketItem.title"
                >
            </div>

            <div class="basket-card-content">
                <p class="basket-card-title">
                    {{ basketItem.title }}
                </p>

                <p class="basket-card-price">
                    £{{ basketItem.price }}
                </p>
            </div>

            <button
                class="basket-card-button"
                @click="Checkout"
            >
                Checkout 
            </button>

        </div>

    </div>


            <div class="thirdsec">
            <p class="rec2">> Categories</p>

            <div class="productsbox2">

                <div
                    v-for="category in categories"
                    :key="category"
                    class="card2"
                    :style="{
                        '--hover-image': `url(${categoryImages[category]})`
                    }"
                    @click="categoryClicked(category)"
                >
                    <div class="contents">
                        <p class="title">{{ category }}</p>
                    </div>
                </div>

            </div>
        </div>


        <div class="footer">

        </div>


   







        </div>
            

    </div>
</template>

 


<style scoped>

.thirdsec {
    height: 690px;
    background-color: white;
    overflow: hidden;
}

.loading {
    color:#222;
}

.emptybasket {
    max-width: 550px;
    margin-left: 550px;
    padding: 50px 40px;
    text-align: center;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
    border: 1px solid #f0f0f0;
    margin-bottom: 20px;
}

.emptybasket-icon {
    width: 90px;
    height: 90px;
    margin: 0 auto 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f7ff;
    border-radius: 50%;
    font-size: 42px;
}

.emptybasket h2 {
    margin: 0 0 12px;
    color: #222;
    font-size: 28px;
    font-weight: 700;
}

.emptybasket p {
    margin: 0 auto 30px;
    max-width: 400px;
    color: #777;
    font-size: 16px;
    line-height: 1.6;
}

.emptybasket button {
    border: none;
    outline: none;
    padding: 14px 24px;
    border-radius: 10px;
    background: #f16d01;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
}

.emptybasket button span {
    margin-left: 8px;
    font-size: 18px;
    transition: transform 0.25s ease;
    display: inline-block;
}

.emptybasket button:hover {
    background: lightgrey;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(197, 197, 197, 0.25);
}

.emptybasket button:hover span {
    transform: translateX(4px);
}

.emptybasket button:active {
    transform: translateY(0);
}
.card {
    width: 500px;
    height: 310px;
    background: #e7e5e5;
    padding: 15px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
    

}



.productsbox {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    overflow-x: auto;
    gap: 20px;
    padding: 0px;
    padding-left: 60px;
    padding-right: 30px;
    padding-bottom: 40px;

   
}


.productsbox::-webkit-scrollbar {
    height: 6px;
   
}

.productsbox::-webkit-scrollbar-track {
    background: #d5d5d5;
    border-radius: 10px;
}

.productsbox::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
}

.productsbox::-webkit-scrollbar-thumb:hover {
    background: #777;
}
.card-image{
    width: 100%;
    height: 170px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s;

    
}

.secondsec{
    
    background-color: #e7e5e5 ;
    min-height: 290px;
    margin-bottom: 5px;
    padding-bottom: 1px;
}

.rectitle {
    display: flex;
    justify-content: center;
    align-items: center;
   
    padding-right: 60px;
    background-color: #e7e5e5 ;
    
    
}

#typewriteeffect {
    
    color: rgb(165, 162, 162);
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-family: Arial, sans-serif;
    margin: 0;
}

.home:hover {
    
    color: rgb(0, 0, 0);
    
}
.rec {
    color: rgb(148, 148, 148);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-family: Arial, sans-serif;
    padding-left: 60px;
    padding-top: 10px;
    margin: 0;
}

.rec2 {
    color: rgb(148, 148, 148);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-family: Arial, sans-serif;
    padding-left: 32px;
    padding-top: 10px;
    margin: 0;
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
    overflow-y: hidden;

    
   

}

.contents{

    position: relative;
    z-index: 2;
   

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  
    color: #222;
    font-size: 28px;
    font-weight: 700;
    padding-right: 30px;
    box-sizing: border-box;

    

    
   

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




.card-btn:hover {
    background-color: lightgray;
    color: rgb(35,35,35);

}

.card:hover {
    background-color: white;
    background-image:url
    
}


.description:hover {
    color: rgb(156, 156, 156);
}

.basket-card {
    width: 400px;
    height: 400px;
    background: white;
    padding: 15px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
    flex: 0 0 300px;
}

.basket-products {
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow-x: auto;
    align-items: center;
    padding-left: 25px;
    padding-top: 5px;
    padding-bottom: 20px;
    justify-content: left;
    
}

.basket-card-image {
    width: 100%;
    height: 335px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s;
}

.basket-card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.basket-products::-webkit-scrollbar {
    height: 6px;
   
}

.basket-products::-webkit-scrollbar-track {
    background: #d5d5d5;
    border-radius: 10px;
}

.basket-products::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
}

.basket-products::-webkit-scrollbar-thumb:hover {
    background: #777;
}

.basket-card-content {
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.basket-card-title {
    margin: 0;
    font-size: 0.72em;
    text-transform: uppercase;
    font-weight: 500;
    color: #4d4d4d;
}

.basket-card-price {
    margin: 0;
    font-size: 1em;
    font-weight: 700;
    color: #4d4d4d;
}

.basket-card-button {
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

.basket-card:hover .basket-card-image {
    height: 290px;
}

.basket-card:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: black;
    background-color: white;
}

.basket-card:hover .basket-card-button {
    margin-top: 0;
}

.basket-card-button:hover {
    background-color: lightgray;
    color: rgb(35, 35, 35);
    text-decoration: underline;
}


.productsbox2 {
    height: 690px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 310px;

    overflow-x: hidden;
    overflow-y: auto;

    gap: 20px;
    padding: 10px;

    box-sizing: border-box;
}

.card2 {
    width: 100%;
    height: 310px;

    background-color: #e7e5e5;

    padding: 15px;
    border-radius: 10px;

    position: relative;
    box-sizing: border-box;
    overflow: hidden;

    transition: all 0.3s ease;
}

/* Hover image */
.card2::before {
    content: "";

    position: absolute;
    inset: 0;

    background-image: var(--hover-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    filter: blur(3px);

    opacity: 0;

    transition: opacity 0.3s ease;

    z-index: 0;
}

/* Show image when hovering */
.card2:hover::before {
    opacity: 1;
}

/* Category text */
.card2 .contents {
    position: relative;
    z-index: 1;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #222;

    font-size: 28px;
    font-weight: 700;

    box-sizing: border-box;

    transition: color 0.3s ease;
}

/* Text changes colour over image */
.card2:hover .contents {
    color: white;
    
}

.card2:hover {
    font-family: monospace;

    text-decoration: underline;
    text-decoration-color: black;
    text-decoration-thickness: 3px;
}

.card2 .title {
    margin: 0;
    padding: 12px 25px;

    color: black;
    background-color: transparent;

    transition: all 0.3s ease;
    

}

.card2:hover .title {
    background-color: white;
    color: black;
    border: 1px solid rgba(0, 0, 0, 0.8);
    
}


.remove-btn {
    float: right;
}



</style>