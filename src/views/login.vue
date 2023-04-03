<template>
    <k-row>
        <k-col span="24" xs="24">
            <k-row>
                <k-col span="2" xs="2" animation ></k-col>
                <k-col span="20" xs="20" animation >
                    <div class="loginview">
                        <div class="container">
                            <div class="loginhead">

                                <div class="logintitle">
                                    🖥️#卡泽湾 
                                </div>
                                <div class="loginsubtitle">
                                    <span style="background-color: #2C3A47;color: #fff; padding-left: .3rem;padding-right: .3rem;border-radius: .3rem;user-select: none;">#卡泽湾</span> is my start page that organizes my frequently visited websites into categories for
                                    quick
                                    access.   
                                    
                                </div>
                            </div>
                            <div class="loginbody">
                                <span class="username" >🤪username</span>
                                <input type="text" v-model="username" >
                                <span  class="password">🔐password</span>
                                <input  type="password"  v-model="password">
                                
                            </div>
                            <div class="loginfoot">
                                <p class="no-account" @click="gotoregister" >🆔No Account ? </p>
                                <div class="signin" >🔑Sign in</div>
                                
                            </div>
                        </div>

                    </div>
                </k-col>
                <k-col span="2"  xs="2"  animation >
                    token:{{ token.getUserToken }} auth:{{ token.getUserisAuth }}
                    
                </k-col>
            </k-row>

        </k-col>
    </k-row>
</template>

<script setup>
import { ref,computed,getCurrentInstance} from 'vue';
import { useRouter } from 'vue-router';
import { useTokenStore } from '../stores/token';
const {proxy} = getCurrentInstance()


const token = useTokenStore()

// const t = {
//     token:'abc',
//     isAuth:true
// }

// localStorage.setItem('token',JSON.stringify(t))

// const test = ref(JSON.parse(localStorage.getItem('test')) || 'test' )

// localStorage.setItem('test',JSON.stringify(test.value))

const router =useRouter()

const password = ref('')
const username = ref('')

const gotoregister = () => {
    router.push('/register')
}

</script >

<style lang='less' scoped>
.flexdiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
        .signin{
            position: absolute;
            width: 6rem;
            text-align: center;
            border-radius: .3rem;
            height: 1.8rem;
            background-color: #55E6C1;
            font-size: 1rem;
            line-height: 1.2rem;
            padding: .3rem;
            top:0;
            right: 0;
            border: 1px solid #000;
            cursor: pointer;
            // text-transform: capitalize;
            
        }
        .no-account{
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            font-size: .8rem;
            color: #ccc;
            opacity: .5;
            padding: .3rem;
            transition: .3s cubic-bezier(0.39, 0.575, 0.565, 1);
            &:hover{
                color: #2C3A47;
                opacity: 1;
            }
        }
        
        // background-color: #CA D3C8;
    }
}</style>
