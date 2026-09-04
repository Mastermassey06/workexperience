<script setup>
import Navbar from '../components/Navbar.vue'
import ProductCards from '../components/ProductCards.vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useProductStore } from '@/stores/productStore.js'




const productStore = useProductStore()

const sortOption = ref('featured')

function sortProducts(event) {
    const value = event.target.value

    if (value === 'price-low') {
        productStore.sortBy('price', 'asc')
    }

    if (value === 'price-high') {
        productStore.sortBy('price', 'desc')
    }

    if (value === 'alphabetical') {
        productStore.sortBy('title', 'asc')
    }

    if (value === 'featured') {
        productStore.fetchProducts()
    }
}

</script>

<template>
    <Navbar />
    <header>
        <p class="resultscount">{{ productStore.products.length }} results </p>
        <p class="filter">Filter</p>
        
        <div class="sort-box">
            <span>Sort by:</span>
            
            <select v-model="sortOption" @change="sortProducts">
            <option value="featured">Featured Items</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="alphabetical">Alphabetical</option>
        
        
        </select>

        </div>
        
        
    </header>
    <div class="page">
        <ProductCards @products-loaded="updateProductLength" />
    </div>
    
</template>

<style scoped>
    .page {
        background-color: #f5f5f5;
        min-height: calc(100vh - 100px);
    }

    :global(body) {
    margin: 0;
    background-color: #f5f5f5;}


   header {
    display: flex;
    align-items: center;
    position: relative;
    height: 50px;

    background-color: #e7e5e5;
    color: black;
   
   }

   .title {
    position: absolute;
    left:50%;
    transform: translate(-50%);
    
   }

 
    .resultscount {
    padding-left: 10px;
    font-size: 1.2rem;
   }

   .filter {
    padding-left: 5px;
    padding-top: 5px;
    color: lab(69.29% -18.95 -25.23);
    font-size: 0.8rem;
   }

   .filter:hover {
    text-decoration: underline;
   }


   .sort-box {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 10px;
  
  border: 1px solid #aaa;
  border-radius: 7px;
  background: #f7f7f7;
  font-size: 14px;
  margin-left: auto;
  margin-right: 10px;
}

.sort-box span {
  margin-right: 5px;
  font-weight: 500;
}

.sort-box select {
  padding: 8px 5px;
  border: none;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}


 


</style>