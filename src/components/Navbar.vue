<script setup>
import { useProductStore } from '@/stores/productStore'; 
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBasketStore } from '@/stores/basketStore';
import { computed } from 'vue'

const router = useRouter()

const basketStore = useBasketStore()
const cartCount = computed(() => basketStore.basket.length)
const input = ref('')

const productStore = useProductStore()

async function handleSearch(){
  await productStore.searchProducts(input.value)
  console.log('SEARCH RESULTS:', productStore.products)
  router.push(`/products`)
  



}



async function handleAllProducts(){
  await productStore.fetchProducts()

}
</script>

<template>
    <nav class="navbar">
        <RouterLink to="/" class="home">
            Ellizon
        </RouterLink>

        <div class="search">
            <input
                type="text"
                v-model="input"
                placeholder="Search Ellizon.co.uk"
            />
            <button @click="handleSearch">Search</button>
        </div>

        <RouterLink to="/products" class="nav-link" @click="handleAllProducts">
            All Products
        </RouterLink>

        <RouterLink to="/about" class="nav-link">
            Prime+
        </RouterLink>

         <RouterLink to="/basket" class="nav-link">
            🛒({{ cartCount }})
        </RouterLink>
    </nav>
</template>


<style scoped>
.navbar {
  height: 64px;
  background-color: #131921;
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 0 30px;
  box-sizing: border-box;
}


.home {
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  margin-right: 100px;
}

.home:hover {
  color: grey;
}


.search {
  display: flex;
  flex: 1;
  max-width: 800px;
  height: 40px;
  margin-right: 100px;
  margin-left: 260px;
  justify-content: center;
  
}

.search input {
  flex: 1;
  border: none;
  padding: 0 15px;
  font-size: 16px;
  outline: none;
  border-radius: 4px 0 0 4px;
}

.search button {
  width: 90px;
  border: none;
  background-color: #f16d01;
  font-size: 18px;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
}

.search button:hover {
  background-color:lightgray;
  text-decoration: underline;
}


.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  padding-left: 20px ;
}

.nav-link:hover {
  color: grey;
}
</style>