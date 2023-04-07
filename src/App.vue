<template>
  <RouterView ></RouterView>
 

</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView,useRouter  } from 'vue-router'


const router = useRouter()


onMounted(()=>{
    router.push('/home')
})

</script >

<style lang='less' scoped>

</style>
