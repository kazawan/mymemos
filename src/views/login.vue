<template>
    <div v-show="isalert" class="dialog" @click="isalert = !isalert">{{ alertdiv }}</div>
    <k-row>
        <k-col span="24" xs="24">
            <k-row>
                <k-col span="2" xs="2" animation></k-col>
                <k-col span="20" xs="20" animation>
                    <div class="loginview">
                        <div class="container">
                            <div class="loginhead">

                                <div class="logintitle">
                                    <div>
                                        <computer class="serveron" :bgcolor="serverOn" />
                                    </div>
                                    #卡泽湾
                                </div>
                                <div class="loginsubtitle">
                                    <span
                                        style="background-color: #2C3A47;color: #fff; padding-left: .3rem;padding-right: .3rem;border-radius: .3rem;user-select: none;">#卡泽湾</span>
                                    is my start page that organizes my frequently visited websites into categories for
                                    quick
                                    access.

                                </div>
                            </div>
                            <div class="loginbody">
                                <span class="username">🤪username</span>
                                <input type="text" v-model="username">
                                <span class="password">🔐password</span>
                                <input type="password" v-model="password">

                            </div>
                            <div class="loginfoot">
                                <p class="no-account" @click="gotoregister">🆔No Account ? </p>
                                <div class="signin" @click="login">🔑Sign in</div>

                            </div>
                        </div>

                    </div>
                </k-col>
                <k-col span="2" xs="2" animation>
                   

                </k-col>
            </k-row>

        </k-col>
    </k-row>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

import { useTokenStore } from '../stores/token';
import computer from '../components/icons/computer.vue'
const { proxy } = getCurrentInstance()


const token = useTokenStore()


const router = useRouter()

const password = ref('123142423')
const username = ref('kazawan')
const msg = ref('server is lost')
const gotoregister = () => {
    router.push('/register')
}





const getTitle = async () => {
    // console.log('check')
    msg.value = await proxy.Axios.get('http://192.168.3.123:3000')
        .then((res) => {

            return res.data.msg
        })
        .catch((error) => {
            console.log('err=>>>>>>>>>', error)
            return 'server is lost'
        })
}

getTitle()
const timer = ref(null)
const checkServerOn = async () => {
    timer.value = null
    timer.value = window.setInterval(getTitle, 60 * 1000 * 15)
}



onMounted(() => {
    checkServerOn()
    // authCheck()
})

onBeforeUnmount(() => {
    timer.value = null
})


const redirect = (data) => {
    console.log(data)
    if (data.code === 200) {

        router.push('/home')
    } else {
        isalert.value = true
        alertdiv.value = data.msg
    }
}


const alertdiv = ref('null')
const isalert = ref(false)

const login = async () => {
    isalert.value = true
    alertdiv.value = 'logining...'
    await proxy.Axios.post('http://192.168.3.123:3000/login',
        { 'username': username.value, 'password': password.value },
        {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + '123'
            }
        }
    )
        .then((res) => {
            // console.log(res.data.token)
            token.setToken(res.data.token)
            // console.log('token',token.userToken)
            redirect(res.data)
        })
    isalert.value = false
    alertdiv.value = ''
}

const serverOn = computed(() => {
    // console.log(msg.value)
    if (msg.value === 'server is on') {
        return '#55E6C1'
    } else {
        return '#FC427B'
    }
})



getTitle()


</script >

<style lang='less' scoped>
@server: v-bind(serverOn);


.flexdiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.dialog {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: #2C3A4780;
    z-index: 100;
    .flexdiv;
    opacity: .3;
    font-size: 3rem;
    color: #000;
    transition: .4s all ease;
}

.loginview {

    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .container {
        // position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 24rem;

    }

    .loginhead {
        position: relative;
        width: 100%;

        // background-color: #ccc;
        .logintitle {
            position: relative;
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: .5rem;
            // padding-left: 5rem;
            padding-bottom: 1rem;
            // background-color: #1B9CFC80;
            padding-left: .3rem;
            padding-right: .3rem;
            color: #2C3A47;

            .serveron {
                display: inline;
                position: absolute;
                top: .2rem;
                left: 8rem;
                width: 2rem;
                height: 2rem;
                font-size: 1rem;
                // background-color: @server;
            }

        }

        .loginsubtitle {
            .logintitle;
            // padding-left: 0;
            letter-spacing: .2rem;
            font-size: .5rem;
            margin-bottom: 1rem;
        }
    }

    .loginbody {
        position: relative;
        .flexdiv;
        width: 100%;

        input {
            position: relative;
            width: 100%;
            height: 3rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
            font-weight: 500;
            font-style: oblique;
            padding-left: 2rem;
            color: #2C3A47;

        }

        .username {
            background-color: #ffffff;
            color: #ccc;
            height: 1.5rem;
            line-height: 1.5rem;
            position: absolute;
            font-size: 1rem;
            top: -.69rem;
            left: 1rem;
            z-index: 10;
            padding-left: .3rem;
            padding-right: .3rem;
            user-select: none;
            text-transform: Capitalize;

        }

        .password {
            .username;
            top: 3.8rem;
            transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        // background-color: #CAD3C8;
    }

    .loginfoot {
        position: relative;
        width: 100%;

        .signin {
            position: absolute;
            width: 6rem;
            text-align: center;
            border-radius: .3rem;
            height: 1.8rem;
            background-color: #55E6C1;
            font-size: 1rem;
            line-height: 1.2rem;
            padding: .3rem;
            top: 0;
            right: 0;
            border: 1px solid #000;
            cursor: pointer;
            // text-transform: capitalize;

        }

        .no-account {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            font-size: .8rem;
            color: #ccc;
            opacity: .5;
            padding: .3rem;
            transition: .3s cubic-bezier(0.39, 0.575, 0.565, 1);

            &:hover {
                color: #2C3A47;
                opacity: 1;
            }
        }

        // background-color: #CA D3C8;
    }
}
</style>
