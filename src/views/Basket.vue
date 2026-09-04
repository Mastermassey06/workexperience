<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBasketStore } from '@/stores/basketStore'
import { useReccomendedStore } from '@/stores/reccomendedStore'
import Navbar from '@/components/Navbar.vue'

const basketStore = useBasketStore()
const router = useRouter()
const recStore = useReccomendedStore()


const basketProducts = ref([])
const loading = ref(true)
const showPopup = ref(false)

onMounted(async () => {
    basketProducts.value = await basketStore.getBasketProducts()
    loading.value = false
})

async function Checkout(item) {
    await basketStore.removefromBasket(item)

    basketProducts.value = await basketStore.getBasketProducts()
    showPopup.value = true

    await recStore.removefromBag(item)
    
    setTimeout(() => {
        showPopup.value = false
    }, 2000)
}
</script>

<template>
    <Navbar />

     <div v-if="showPopup" class="popup">
            Removed from bag!
        </div>
    

    <div class="secondsec">

        <p class="rec2">> Your Basket</p>

        <div v-if="loading" class="loading">
            Loading...
        </div>

        <!-- Empty basket -->
        <div
            v-else-if="basketProducts.length === 0"
            class="emptybasket"
        >
            <div class="emptybasket-icon">
                🛒
            </div>

            <h2>Your Basket is Empty</h2>

            <p>
                Looks like you haven't added anything to your basket yet.
            </p>

            <button @click="router.push('/products')">
                Continue Shopping
                <span>→</span>
            </button>
        </div>

        <!-- Products in basket -->
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
                    @click="Checkout(basketItem.id)"
                >
                    Remove
                </button>

            </div>

        </div>

    </div>

    <div class="checkout-button">
        <button class="basket-card-button2">
            Checkout {{ basketProducts.length }} Items
        </button>
    </div>

</template>

<style scoped>

.secondsec {
    background-color: #e7e5e5;
    min-height: 500px;
    margin-bottom: 5px;
    padding-bottom: 30px;
}

/* Loading */

.loading {
    color: #222;
    text-align: center;
    margin-top: 100px;
}

/* Breadcrumb */

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

/* Empty basket */

.emptybasket {
    width: 550px;
    max-width: calc(100% - 40px);

    margin: 100px auto 20px;

    padding: 50px 40px;

    text-align: center;

    background: #ffffff;
    border-radius: 20px;

    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);

    border: 1px solid #f0f0f0;
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
    background: lightgray;

    transform: translateY(-2px);

    box-shadow: 0 8px 20px rgba(197, 197, 197, 0.25);
}

.emptybasket button:hover span {
    transform: translateX(4px);
}

.emptybasket button:active {
    transform: translateY(0);
}

/* Product container */

.basket-products {
    display: flex;

    flex-direction: row;

    gap: 20px;

    overflow-x: auto;

    align-items: flex-start;

    padding: 50px 25px 20px;

    justify-content: flex-start;
}

/* Product card */

.basket-card {
    width: 300px;
    height: 400px;

    background: white;

    padding: 15px;

    border-radius: 10px;

    overflow: hidden;

    transition: all 0.3s;

    position: relative;

    flex: 0 0 300px;

    box-sizing: border-box;
}

/* Product image */

.basket-card-image {
    width: 100%;
    height: 260px;

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

/* Product information */

.basket-card-content {
    height: fit-content;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    justify-content: center;

    margin-top: 10px;
}

.basket-card-title {
    margin: 0;

    font-size: 0.72em;

    text-transform: uppercase;

    font-weight: 500;

    color: #4d4d4d;
}

.basket-card-price {
    margin: 5px 0 0;

    font-size: 1em;

    font-weight: 700;

    color: #4d4d4d;
}

/* Checkout button on card */

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

.basket-card-button:hover {
    background-color: lightgray;

    color: rgb(35, 35, 35);

    text-decoration: underline;
}

/* Card hover */

.basket-card:hover {
    background-color: white;

    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

    transform: translateY(-3px);
}

.basket-card:hover .basket-card-image {
    height: 250px;
}

/* Scrollbar */

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

/* Bottom checkout */

.checkout-button {
    display: flex;

    justify-content: center;

    margin: 25px 0;
}

.basket-card-button2 {
    width: 250px;
    height: 45px;

    background-color: #f16d01;

    border: none;

    border-radius: 40px;

    color: white;

    font-weight: 600;

    cursor: pointer;

    transition: all 0.3s;
}

.basket-card-button2:hover {
    background-color: lightgray;

    color: #222;
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
