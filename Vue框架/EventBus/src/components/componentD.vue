<template>
    <div>
        <h3 class="templateA">我是D组件</h3>
        <button @click="sendMessageToC">点击传值</button>
    </div>
</template>
<script>
    // import EventBus from '../assets/EventBus'

    export default {
        methods:{
            sendMessageToC(){
                this.$bus.$emit("sendMessage" , "这是从D组件中传递到兄弟组件的内容")
            }
        }
    }
</script>