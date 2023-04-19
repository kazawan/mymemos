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

                <div style="width: 100%;height: 100%;color:#000">
                    <div style="color: #000;cursor: pointer;line-height: 1.8rem;" @click="search.show"> 呼出人工智障</div>
                </div>
            </k-col>
            <k-col span="2">
                <div class="logout" @click="logout">登出</div>
            </k-col>
        </k-row>
        <k-row wrap="wrap" gutter="10">
            <k-col span="6" xl="4" md="6" sm="0" xs="0">
                <div class="side">
                    <div class="cal">
                        <simpleCal ref="cal" v-on:click-item="getDate" :todos="gettodolist" />
                    </div>
                </div>


            </k-col>
            <k-col span="18" xl="20" md="18" sm="24" xs="24">
                <div class="main">
                    <button @click="todoList.saveTodo(token.userToken.username)">save</button>
                    <button>add todo</button>
                    <k-row>
                        <k-col span="24">
                            <div class="todolist">
                                <div class="dateTop">{{ getDay }} </div>
                                <!-- <div class="date">{{ todoList.getTodo(getDay).todo }} </div> -->
                                <div v-show="todoList.getTodo(getDay) === 'no todo'">{{ todoList.getTodo(getDay) }}</div>
                                <div class="date" v-for="(todo, index) in todoList.getTodo(getDay).todo">

                                    <div class="todobox">
                                        <div class="todotitlebox">⏰时间</div>
                                        <div class="todotitleboxcontaian">
                                            {{ todo.id }}
                                        </div>
                                    </div>
                                    <div class="todobox">
                                        <div class="todotitlebox">📝待办</div>
                                        <div class="todotitleboxcontaian">
                                            {{ todo.content }}
                                        </div>

                                    </div>
                                    <div class="todotags">{{ todo.tags }}</div>
                                </div>
                            </div>
                        </k-col>
                    </k-row>
                </div>


            </k-col>
        </k-row>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, getCurrentInstance, ref, onUpdated } from 'vue';
import { useTokenStore } from '../stores/token';
import { useTodoStore } from '../stores/todo'
import { useRouter } from 'vue-router';
import searchBar from '../components/searchBar/searchBar.vue'
import simpleCal from '../components/simpleCal/cal.vue'
import { computed } from '@vue/reactivity';

const { proxy } = getCurrentInstance()
const router = useRouter()

/**
 * * 待办事项
 */
const todoList = useTodoStore()
const gettodolist = computed(() => {
    // console.log(todoList.usetodoList)
    if (todoList.usetodoList === undefined  ) {
        console.log('null')
        return null
    }else{
        return todoList.usetodoList
    }
    
})

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

            console.log('d')
            search.value.show()
        }
        else if (e.code === 'Escape') {
            search.value.hide()
        }

    })
}

onMounted(() => {
    keyCheck()
    todoList.getlocalTodo(token.userToken.username)
})
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


/**
 * * 日历
 */
const cal = ref(null)
const currentDate = new Date()
const day = ref(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate())
const getDay = computed(() => {

    return day.value
})

const getDate = (data) => {
    day.value = data
}

const getTodo = computed(() => {
    return function (date) {
        let res
        Object.keys(todoList.usetodoList).forEach((item, i) => {
            console.log('====>', todoList.usetodoList[i])
            if (item === date) {
                res = todoList.usetodoList[i]
                console.log(res)
            }
        })
        return res
    }



})

onMounted(() => {
    // console.log(cal.value.daySelected)
})

onUpdated(() => {

})
// const dateSelect =(data)=>{
//     console.log(data)
//     day.value = data
// }

</script >

<style lang='less' scoped>
.t {
    width: 100%;
    height: 30px;
    // background: #f7f5f4;
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 600;
    color: #000;
    letter-spacing: .3rem;
    line-height: 2rem;
    user-select: none
}


.top {
    width: 100%;
    max-width: 1280px;
    height: 30px;
    // background-color: #f7f5f4;
    position: fixed;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
}

.header {
    width: 100%;
    height: 60px;
    // background: #f7f5f4;
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
    color: #000;

    .todolist {
        width: 100%;
        height: 100vh;

        .dateTop {
            width: 100%;
            height: 30px;
            // background: #f7f5f4;
            padding: 0 10px;
            font-size: 1rem;
            font-weight: 400;
            color: #000;
            // letter-spacing: .3rem;
            line-height: 2rem;
            user-select: none;
        }

        .date {
            position: relative;
            width: 100%;
            // height: 30px;
            // background: #f7f5f4;
            padding: 0 10px;
            font-size: 1rem;
            font-weight: 300;
            color: #000;
            letter-spacing: .1rem;
            line-height: 1.5rem;
            user-select: none;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            border-radius: 5px;
            box-shadow: 3px 3px 5px #ccc;
            padding: 10px;

            .todobox {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;

                .todotitlebox {
                    background-color: #ccc;
                    min-width: 5rem;
                    border-radius: 3px;
                    height: 1.4rem;
                    line-height: 1.4rem;
                    text-align: center;
                    margin-right: 10px;

                }

            }

            .todotags {
                background: #ccc;
                width: 3rem;
                text-align: center;
                font-size: .5rem;
                height: 1rem;
                line-height: 1rem;
                border-radius: 3px;
                position: absolute;
                top: 10px;
                right: 10px;
            }

        }
    }

}




.side {
    width: 100%;
    padding: .3rem .3rem .3rem .3rem;
    // background: #f7f5f4;

    .cal {
        width: 100%;
        height: 150px;
        // background: #f7f5f4;
        // background-color: #191919;
        // padding: 10px;
    }
}
</style>
