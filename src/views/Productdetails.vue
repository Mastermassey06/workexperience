<script setup>
import Navbar from '@/components/Navbar.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
import { useReccomendedStore } from '@/stores/reccomendedStore'

const basketStore = useBasketStore()
const recStore = useReccomendedStore()
const popup = ref(false)

console.log('STORE:', recStore)
console.log('VIEWED FUNCTION:', recStore.viewed10secs)


const route = useRoute()

const productID = Number(route.params.id)

let timer

onMounted(() => {
    

    timer = setTimeout(() => {
        
        recStore.viewed10secs(productID)

       
    }, 10000)
})

onUnmounted(() => {
   
    clearTimeout(timer)
})



const productDetails = ref(null)

onMounted(() => {
    fetch(`https://dummyjson.com/products/${productID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            productDetails.value = data
        })
        .catch(error => {
            console.error('Error fetching product:', error)
        })
})

function handleBag(itemid){
    basketStore.addtoBasket(itemid)
    recStore.addtoBag(itemid)
   

    popup.value = true

    setTimeout(() => {
        popup.value = false

    },2000)

}
</script>


<template>

    <Navbar />

     <div v-if="popup" class="popup">
            Added to Bag!
        </div>
    

    <!-- Loading -->
    <div v-if="!productDetails" class="loading">
        Loading product...
    </div>


    <!-- Product -->
    <main v-else class="product-page">

        

        <!-- Main Product -->
        <section class="product-container">

            <!-- ========================= -->
            <!-- IMAGE -->
            <!-- ========================= -->

            <div class="image-section">

                <div class="image-box">
                    <img
                        v-if="productDetails.images?.[0]"
                        :src="productDetails.images[0]"
                        :alt="productDetails.title"
                    >

                    <p v-else>
                        No image available
                    </p>
                </div>

                <div
                    v-if="productDetails.thumbnail"
                    class="thumbnail-box"
                >
                    <img
                        :src="productDetails.thumbnail"
                        :alt="productDetails.title"
                    >
                </div>

            </div>


            <!-- ========================= -->
            <!-- PRODUCT INFORMATION -->
            <!-- ========================= -->

            <div class="product-info">

                <!-- Category -->
                <p class="category">
                    {{ productDetails.category }}
                </p>


                <!-- Title -->
                <h1>
                    {{ productDetails.title }}
                </h1>


                <!-- Brand -->
                <p class="brand">
                    Brand:
                    <strong>
                        {{ productDetails.brand || 'N/A' }}
                    </strong>
                </p>


                <!-- Rating -->
                <div class="rating">

                    <span class="stars">
                        ★★★★★
                    </span>

                    <span class="rating-number">
                        {{ productDetails.rating || 'N/A' }}
                    </span>

                </div>


                <!-- Price -->
                <div class="price-section">

                    <span class="price">
                        £{{ productDetails.price }}
                    </span>

                    <span
                        v-if="productDetails.discountPercentage"
                        class="discount"
                    >
                        {{ productDetails.discountPercentage }}% OFF
                    </span>

                </div>


                <!-- Description -->
                <p class="description">
                    {{ productDetails.description }}
                </p>


                <!-- Stock -->
                <div class="stock">

                    <span class="stock-dot"></span>

                    <span>
                        {{ productDetails.availabilityStatus }}

                        <span v-if="productDetails.stock">
                            ({{ productDetails.stock }} available)
                        </span>
                    </span>

                </div>


                <!-- Quantity -->
                <div class="quantity">

                    <label>
                        Quantity
                    </label>

                    <div class="quantity-controls">

                        <button>
                            −
                        </button>

                        <span>
                            1
                        </span>

                        <button>
                            +
                        </button>

                    </div>

                </div>


                <!-- Add To Bag -->
                <button class="add-btn" @click="handleBag(productDetails.id)">
                    Add to Bag
                </button>


                <!-- Shipping / Warranty -->
                <div class="shipping">

                    <div>
                        <strong>
                            Shipping
                        </strong>

                        <p>
                            {{ productDetails.shippingInformation }}
                        </p>
                    </div>


                    <div>
                        <strong>
                            Warranty
                        </strong>

                        <p>
                            {{ productDetails.warrantyInformation }}
                        </p>
                    </div>

                </div>

            </div>

        </section>


        <!-- ========================= -->
        <!-- PRODUCT DETAILS -->
        <!-- ========================= -->

        <section class="details-section">

            <h2>
                Product Details
            </h2>


            <div class="details-grid">

                <!-- Brand -->
                <div class="detail">

                    <span>
                        Brand
                    </span>

                    <strong>
                        {{ productDetails.brand || 'N/A' }}
                    </strong>

                </div>


                <!-- Category -->
                <div class="detail">

                    <span>
                        Category
                    </span>

                    <strong>
                        {{ productDetails.category || 'N/A' }}
                    </strong>

                </div>


                <!-- SKU -->
                <div class="detail">

                    <span>
                        SKU
                    </span>

                    <strong>
                        {{ productDetails.sku || 'N/A' }}
                    </strong>

                </div>


                <!-- Weight -->
                <div class="detail">

                    <span>
                        Weight
                    </span>

                    <strong>
                        {{ productDetails.weight ?? 'N/A' }}
                        <span v-if="productDetails.weight">
                            g
                        </span>
                    </strong>

                </div>


                <!-- Dimensions -->
                <div class="detail">

                    <span>
                        Dimensions
                    </span>

                    <strong>

                        <template v-if="productDetails.dimensions">

                            {{ productDetails.dimensions?.width }}
                            ×
                            {{ productDetails.dimensions?.height }}
                            ×
                            {{ productDetails.dimensions?.depth }}

                        </template>

                        <template v-else>
                            N/A
                        </template>

                    </strong>

                </div>


                <!-- Minimum Order -->
                <div class="detail">

                    <span>
                        Minimum Order
                    </span>

                    <strong>
                        {{ productDetails.minimumOrderQuantity ?? 'N/A' }}
                    </strong>

                </div>


                <!-- Return Policy -->
                <div class="detail">

                    <span>
                        Return Policy
                    </span>

                    <strong>
                        {{ productDetails.returnPolicy || 'N/A' }}
                    </strong>

                </div>


                <!-- Warranty -->
                <div class="detail">

                    <span>
                        Warranty
                    </span>

                    <strong>
                        {{ productDetails.warrantyInformation || 'N/A' }}
                    </strong>

                </div>

            </div>

        </section>


        <!-- ========================= -->
        <!-- TAGS -->
        <!-- ========================= -->

        <section class="tags-section">

            <h2>
                Tags
            </h2>

            <div
                v-if="productDetails.tags?.length"
                class="tags"
            >

                <span
                    v-for="tag in productDetails.tags"
                    :key="tag"
                >
                    {{ tag }}
                </span>

            </div>

            <p v-else>
                No tags available.
            </p>

        </section>


        <!-- ========================= -->
        <!-- ADDITIONAL INFORMATION -->
        <!-- ========================= -->

        <section class="extra-section">

            <h2>
                Additional Information
            </h2>


            <div class="extra-grid">

                <!-- Availability -->
                <div>

                    <span>
                        Availability
                    </span>

                    <strong>
                        {{ productDetails.availabilityStatus || 'N/A' }}
                    </strong>

                </div>


                <!-- Shipping -->
                <div>

                    <span>
                        Shipping
                    </span>

                    <strong>
                        {{ productDetails.shippingInformation || 'N/A' }}
                    </strong>

                </div>


                <!-- Warranty -->
                <div>

                    <span>
                        Warranty
                    </span>

                    <strong>
                        {{ productDetails.warrantyInformation || 'N/A' }}
                    </strong>

                </div>


                <!-- Barcode -->
                <div>

                    <span>
                        Barcode
                    </span>

                    <strong>
                        {{ productDetails.meta?.barcode || 'N/A' }}
                    </strong>

                </div>

            </div>

        </section>


        <!-- ========================= -->
        <!-- PRODUCT META -->
        <!-- ========================= -->

        <section class="meta-section">

            <div class="meta-item">

                <span>
                    Product ID
                </span>

                <strong>
                    {{ productDetails.id }}
                </strong>

            </div>


            <div class="meta-item">

                <span>
                    Created
                </span>

                <strong>
                    {{ productDetails.meta?.createdAt || 'N/A' }}
                </strong>

            </div>


            <div class="meta-item">

                <span>
                    Last Updated
                </span>

                <strong>
                    {{ productDetails.meta?.updatedAt || 'N/A' }}
                </strong>

            </div>

        </section>

    </main>

</template>


<style scoped>

.product-page {
    background-color: #f5f5f5;
    min-height: calc(100vh - 60px);
    padding: 30px 5%;
    color: #232323;
}


/* ========================= */
/* LOADING */
/* ========================= */

.loading {
    min-height: 80vh;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    color: #555;
}



/* ========================= */
/* MAIN PRODUCT */
/* ========================= */

.product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 50px;

    background-color: white;

    padding: 35px;

    border-radius: 12px;
}


/* ========================= */
/* IMAGE */
/* ========================= */

.image-section {
    display: flex;
    flex-direction: column;

    align-items: center;
}


.image-box {
    width: 100%;
    height: 500px;

    background-color: #f5f5f5;

    border-radius: 10px;

    display: flex;

    align-items: center;
    justify-content: center;
}


.image-box img {
    width: 90%;
    height: 90%;

    object-fit: contain;
}


.thumbnail-box {
    width: 80px;
    height: 80px;

    margin-top: 15px;

    border: 2px solid #f16d01;

    border-radius: 8px;

    display: flex;

    align-items: center;
    justify-content: center;

    background-color: white;
}


.thumbnail-box img {
    width: 90%;
    height: 90%;

    object-fit: contain;
}


/* ========================= */
/* PRODUCT INFO */
/* ========================= */

.product-info {
    padding: 10px;
}


.category {
    color: #777;

    text-transform: uppercase;

    font-size: 0.8rem;

    font-weight: 600;

    margin: 0 0 8px;
}


.product-info h1 {
    font-size: 2.2rem;

    margin: 0 0 10px;
}


.brand {
    color: #666;

    margin-bottom: 15px;
}


/* ========================= */
/* RATING */
/* ========================= */

.rating {
    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 20px;
}


.stars {
    color: #f16d01;

    letter-spacing: 2px;
}


.rating-number {
    color: #666;

    font-size: 0.9rem;
}


/* ========================= */
/* PRICE */
/* ========================= */

.price-section {
    display: flex;

    align-items: center;

    gap: 15px;

    margin-bottom: 20px;
}


.price {
    font-size: 2rem;

    font-weight: 700;
}


.discount {
    background-color: #f16d01;

    color: white;

    padding: 5px 10px;

    border-radius: 5px;

    font-size: 0.8rem;

    font-weight: 600;
}


/* ========================= */
/* DESCRIPTION */
/* ========================= */

.description {
    color: #555;

    line-height: 1.6;

    max-width: 600px;
}


/* ========================= */
/* STOCK */
/* ========================= */

.stock {
    display: flex;

    align-items: center;

    gap: 8px;

    margin: 20px 0;

    font-weight: 500;
}


.stock-dot {
    width: 9px;
    height: 9px;

    border-radius: 50%;

    background-color: #22a447;
}


/* ========================= */
/* QUANTITY */
/* ========================= */

.quantity {
    display: flex;

    align-items: center;

    gap: 20px;

    margin-bottom: 20px;
}


.quantity label {
    font-weight: 600;
}


.quantity-controls {
    display: flex;

    align-items: center;

    border: 1px solid #aaa;

    border-radius: 7px;

    overflow: hidden;
}


.quantity-controls button {
    width: 35px;
    height: 35px;

    border: none;

    background-color: #eee;

    cursor: pointer;

    font-size: 1rem;
}


.quantity-controls button:hover {
    background-color: #ddd;
}


.quantity-controls span {
    width: 40px;

    text-align: center;
}


/* ========================= */
/* ADD TO BAG */
/* ========================= */

.add-btn {
    width: 100%;
    height: 50px;

    background-color: #f16d01;

    border: none;

    border-radius: 40px;

    color: white;

    font-size: 1rem;

    font-weight: 600;

    cursor: pointer;

    transition: 0.3s;
}


.add-btn:hover {
    background-color: #d95f00;
}


/* ========================= */
/* SHIPPING */
/* ========================= */

.shipping {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 20px;

    margin-top: 25px;

    padding-top: 20px;

    border-top: 1px solid #ddd;
}


.shipping p {
    color: #666;

    font-size: 0.85rem;

    line-height: 1.5;
}


/* ========================= */
/* DETAILS */
/* ========================= */

.details-section,
.tags-section,
.extra-section,
.meta-section {

    margin-top: 30px;

    background-color: white;

    padding: 30px;

    border-radius: 12px;
}


.details-section h2,
.tags-section h2,
.extra-section h2 {

    margin-top: 0;

    margin-bottom: 25px;
}


/* ========================= */
/* DETAILS GRID */
/* ========================= */

.details-grid {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 1px;

    background-color: #ddd;
}


.detail {

    display: flex;

    justify-content: space-between;

    gap: 20px;

    padding: 18px;

    background-color: white;
}


.detail span {

    color: #777;
}


.detail strong {

    text-align: right;
}


/* ========================= */
/* TAGS */
/* ========================= */

.tags {

    display: flex;

    gap: 10px;

    flex-wrap: wrap;
}


.tags span {

    padding: 7px 14px;

    background-color: #eee;

    border-radius: 20px;

    color: #555;

    font-size: 0.85rem;
}


/* ========================= */
/* EXTRA INFO */
/* ========================= */

.extra-grid {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 20px;
}


.extra-grid div {

    padding: 15px;

    background-color: #f5f5f5;

    border-radius: 8px;
}


.extra-grid span {

    display: block;

    color: #777;

    font-size: 0.8rem;

    margin-bottom: 5px;
}


.extra-grid strong {

    font-size: 0.9rem;
}


/* ========================= */
/* META */
/* ========================= */

.meta-section {

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;
}


.meta-item {

    padding: 15px;

    background-color: #f5f5f5;

    border-radius: 8px;
}


.meta-item span {

    display: block;

    color: #777;

    font-size: 0.8rem;

    margin-bottom: 5px;
}


.meta-item strong {

    font-size: 0.85rem;

    word-break: break-word;
}


/* ========================= */
/* RESPONSIVE */
/* ========================= */

@media (max-width: 900px) {

    .product-container {

        grid-template-columns: 1fr;

    }

    .image-box {

        height: 400px;

    }

    .details-grid {

        grid-template-columns: 1fr;

    }

    .meta-section {

        grid-template-columns: 1fr;

    }

}


@media (max-width: 600px) {

    .product-page {

        padding: 20px;

    }

    .product-container {

        padding: 20px;

    }

    .product-info h1 {

        font-size: 1.7rem;

    }

    .shipping {

        grid-template-columns: 1fr;

    }

    .image-box {

        height: 300px;

    }

    .detail {

        flex-direction: column;

        gap: 5px;

    }

    .detail strong {

        text-align: left;

    }

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
