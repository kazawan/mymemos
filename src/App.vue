<template>
  <RouterView ></RouterView>
 

</template>

<script setup>
import { onMounted ,getCurrentInstance} from 'vue';
import { RouterView,useRouter  } from 'vue-router'
import  {useTokenStore}  from './stores/token'
const token = useTokenStore()
const { proxy } = getCurrentInstance()
const router = useRouter()
const authCheck = () => {
    proxy.Axios.post('http://192.168.3.123:3000/isAuth',
        {
            token: token.userToken.token
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token.userToken.token
            }
        }

    ).then((res) => {
        if (res.data.code === 200) {
            router.push('/home')
        }
    })
}
authCheck()

</script >

<style lang='less' scoped>

</style>
