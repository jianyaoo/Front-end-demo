<template>
   <div>
       <h3 class="templateA">我是A组件</h3>
       <button @click="sendMessageToB">点击传值</button>
   </div>
</template>
<script>
  import EventBus from '../assets/EventBus'

  export default {
      methods:{
          sendMessageToB(){
              EventBus.$emit("sendMessage" , "这是从A组件中传递到兄弟组件的内容")
          }
      }
  }
</script>