<template>
    <div v-show="barShow" class="searchBar" ref="b"  >
        <div class="barbody">
            <input type="text" v-model="searchVal" placeholder="欢迎使用人工智障" ref="i"  @keydown.enter="searchGoogle"  @dblclick="searchVal = ''">
            <div  class="icon">🌐</div>
            
        </div>
        <div v-show="searchVal"  class="tag"> 111</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, nextTick, watch } from 'vue';
const b = ref(null)
const i = ref(null)
const barShow = ref(false)
const searchVal = ref('')


/**
 * * 出现动画
 */
const faderin = ()=>{
    barShow.value = !barShow.value
    b.value.style.top = '0'
    b.value.style.opacity = '0'
    setTimeout(() => {
        b.value.style.top = '10%'
        b.value.style.opacity = '1'
    }, 50)
}
/**
 * * 消失动画
 */
const faderout = (e)=>{

    setTimeout(() => {
        b.value.style.opacity = '0'
        b.value.style.top = '0'
        setTimeout(()=>{
            barShow.value = !barShow.value
            b.value.style.top = '0'
        },500)
        
    }, 50)
}

/**
 * * 查找方法
 */
const searchGoogle = () =>{
    window.open(`https://www.google.com/search?q=${searchVal.value}`)
}





/**
 * * 暴露方法
 */
defineExpose({
    show: () => {
        
        if (barShow.value === false) {
            faderin()
            
        }else{
            faderout()
            
        }

    },
    hide: () => {
        barShow.value = false
    }
})

onUpdated(() => {
    // console.log('updated')

    if (barShow.value) {

        nextTick(() => {
            i.value.focus()
        })
    } else {
        searchVal.value = ''
    }

})







</script >

<style lang='less' scoped>
.searchBar {
    position: fixed;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    width: 100%;
    max-width: 1280px;
    height: 100vh;
    // background: #cfcfcf50;
    // --webkit--backdrop-filter: blur(10px);
    // backdrop-filter: blur(10px);
    z-index: 999;
    color: #cfcfcf;
    transition: .5s all ease;
    opacity: 1;

    .barbody {
        position: absolute;
        transform: translateX(-50%);
        top: 10%;
        left: 50%;
        width: 60%;
        height: 60px;
        border-radius: 10px;
        padding: 10px;
        background: #cfcfcf50;
        --webkit--backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        border: 1px solid #55E6C1;

        input[type=text] {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            background: transparent;
            color: #cfcfcf;
            font-size: 1.5rem;
            font-weight: 500;
            // letter-spacing: .3rem;
            line-height: 2rem;
            user-select: none;
            transition: .5s all ease;
            padding-left: 2rem;
            &::placeholder {
                color: #ffffff80;
            }
        }
        .icon{
            position: absolute;
            transform: translate(-50%,-50%);
            top: 48%;
            left: 3.5%;
            font-size: 1.6rem;
        }
    }

    .tag{
        .barbody;
        top: 15%;
        height: 30px;
        font-size: 16px;
        line-height: 8px;

    }
}
</style>
