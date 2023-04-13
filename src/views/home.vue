<template>
    <searchBar ref="search" />
    <div class="top">
        <k-row>
            <k-col span="6">

                <div class="header">
                    <div class="homeTitle">
                        🍍 卡泽湾
                    </div>

                </div>
            </k-col>
            <k-col span="16">

                <div style="width: 100%;background-color:#191919;height: 100%;">
                    <div style="color: aliceblue;cursor: pointer;line-height: 1.8rem;" @click="search.show"> 呼出人工智障</div>
                </div>
            </k-col>
            <k-col span="2">
                <div class="logout" @click="logout">登出</div>
            </k-col>
        </k-row>
        <k-row wrap="wrap">
            <k-col span="4"  md="6" sm="0" xs="0">
                <div class="side">
                    <div class="cal">
                        <simpleCal /> 
                    </div>
                </div>


            </k-col>
            <k-col span="20" md="18" sm="24"  xs="24">
                <div class="main">mainaaaaa</div>


            </k-col>
        </k-row>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, getCurrentInstance, ref } from 'vue';
import { useTokenStore } from '../stores/token';
import { useRouter } from 'vue-router';
import searchBar from '../components/searchBar/searchBar.vue'
import simpleCal from '../components/simpleCal/cal.vue'
// import { useAuthCheck } from '../hooks/useAuthCheck';
// const Auth = useAuthCheck()
const { proxy } = getCurrentInstance()
const router = useRouter()
/**
 * * token
 */
const token = useTokenStore()
/**
 * * token 检查
 */
const authCheck = () => {
    if (token.userToken.token === 'no token') {
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
        if (res.data.code != 200) {
            router.push('/')
        }
    })
}
authCheck()

/**
 * * 人工智障搜索框
 */
const search = ref(null)
// const barShow = ref(true)


/**
 * * 按键检测
 */
const keyCheck = () => {
    document.addEventListener('keydown', (e) => {
        // console.log(e.code)
        if (e.code === 'KeyI' && e.ctrlKey === true) {
            // console.log('d')
            search.value.show()
        }
        else if (e.code === 'Escape') {
            search.value.hide()
        }

    })
}

onMounted(keyCheck)
onUnmounted(() => {
    document.removeEventListener('keydown', keyCheck)
})






/**
 * * 登出
 */
const logout = () => {
    token.logout()
    authCheck()
}
</script >

<style lang='less' scoped>
.t {
    width: 100%;
    height: 30px;
    background: #191919;
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 600;
    color: #cfcfcf;
    letter-spacing: .3rem;
    line-height: 2rem;
    user-select: none
}


.top {
    width: 100%;
    max-width: 1280px;
    height: 30px;
    background-color: #191919;
    position: fixed;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
}

.header {
    width: 100%;
    height: 30px;
    background: #cccccc50;
    display: flex;
    flex-direction: row;

    .homeTitle {
        .t;
    }
}




.logout {
    .t;
    width: 100%;
    font-size: .5rem;
    line-height: 1.8rem;
    cursor: pointer;
    transition: .3s all ease;
    text-align: center;

    &:hover {
        background: #585858;
        color: #fff;
    }
}


.main {
    width: 100%;
    height: 100vh;
    // background-color: #52ac74;
    color: #fff;
    background-color: #585858;
}


.side {
    width: 100%;
    padding: .3rem .3rem .3rem .3rem;
    

    .cal {
        width: 100%;
        height: 200px;
        // background-color: #191919;
        // padding: 10px;
    }
}
</style>
