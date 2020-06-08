<template>
    <div>
        {{name}}
    </div>
</template>

<script>
    export default {
        name: "index",
        computed:{
            name(){
                console.log(this);
                return this.$store.state.name
            }
        }
    }
</script>

<style scoped>

</style>