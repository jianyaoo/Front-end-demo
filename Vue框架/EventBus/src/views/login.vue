<template>
    <div>
        <h3 class="templateA">这里是登录界面</h3>
        <input type="text" v-model="name">
        <button @click="loginIn">登录</button>
    </div>
</template>
<script>
    export default {
       data(){
           return{
               name:""
           }
       },
        methods:{
            loginIn(){
                this.$store.commit("GET_LOGIN_NAME" , { loginNmae:this.name });
            }
        }
    }
</script>