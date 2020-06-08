<template>
    <div>
        <hr>
        <h3>这是B组件</h3>
        <span>{{ message }}</span>
    </div>
</template>

<script>
    import EventBus from '../assets/EventBus'
    export default {
        name: "ComponentB.vue",
        data(){
            return{
                message:""
            }
        },
        mounted(){
            let _this = this;
            EventBus.$on("sendMessage" , (msg) => {
                _this.message = msg
            })
        },
    }
</script>

<style scoped>

</style>