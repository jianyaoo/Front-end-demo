<template>
    <div>
        <hr>
        <h3>这是C组件</h3>
        <span>{{ message }}</span>
    </div>
</template>

<script>
    export default {
        name: "ComponentC.vue",
        data(){
            return{
                message:""
            }
        },
        mounted(){
            let _this = this;
            this.$bus.$on("sendMessage" , (msg) => {
                _this.message = msg
            })
        },
    }
</script>

<style scoped>

</style>