<template>
    <k-row>
        <k-col span="24">
            <k-row>
                <k-col span="24">
                    <div style="width:100%"><h2>{{ token.userToken.username }}</h2></div>
                </k-col>
                
            </k-row>
        </k-col>
    </k-row>
    <k-row>
        <k-col span="24">
            <k-row>
                <k-col span="20">
                    <h1>卡泽湾</h1>
                </k-col>
                <k-col span="4">
                    <button @click="logout"> logout</button>
                </k-col>
            </k-row>
        </k-col>
    </k-row>
</template>

<script setup>
import { onMounted, getCurrentInstance ,onUpdated ,watch} from 'vue';
import { useTokenStore } from '../stores/token';
import { useRouter } from 'vue-router';
import useAxios  from '../hooks/useaxios';
// import { useAuthCheck } from '../hooks/useAuthCheck';
// const Auth = useAuthCheck()
const { proxy } = getCurrentInstance()
const router = useRouter()

const token = useTokenStore()


/**
 * * token 检查
 */
const authCheck = () => {
    if(token.userToken.token === 'no token'){
        router.push('/')
        return 
    }
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
        // console.log('res', res.data)
        if (res.data.code != 200  ) {
            router.push('/')
        }
    })
}


const moveto = (path)=>{
    router.push(path)
}
authCheck()



onMounted( () => {
   
})





const logout = () => {
    token.logout()
    authCheck()
}
</script >

<style lang='less' scoped></style>
