<template>
    <ul>
        <li
                v-for="product in products"
                :key="product.id">
            {{ product.title }} - {{ product.price | currency }}
            <br>
            <button
                    :disabled="!product.inventory"
                    @click="addProductToCart(product)">
                Add to cart
            </button>
        </li>
    </ul>
</template>

<script>
    // import { mapState, mapActions } from 'vuex'

    export default {

        computed:{
            products(){
                return this.$store.state.products.all
            }
        },
        methods:{
            addProductToCart(project){
                this.$store.dispatch("cart/addProductToCart" , project)
            }
        },
        //  以下为使用辅助函数的形式
        // computed: mapState({
        //   products: state => state.products.all
        // }),
        // methods: mapActions('cart', [
        //   'addProductToCart'
        // ]),
        created () {
            this.$store.dispatch('products/getAllProducts')
        }
    }
</script>
