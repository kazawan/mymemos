<template>
    <div class="container">
        <div class="calsbody">
            <div v-for="day in dayList " class="calitem">
                <div class="day" ref="days" :year="day.year" :month="day.month" :day="dayCheck(day.day)"
                    :date="`${day.year}-${day.month}-${dayCheck(day.day)}`"> </div>
            </div>
        </div>
        <div class="weekday">
            <div class="weekdayitem">Sun</div>
            <div class="weekdayitem">Mon</div>
            <div class="weekdayitem">Tue</div>
            <div class="weekdayitem">Wed</div>
            <div class="weekdayitem">Thu</div>
            <div class="weekdayitem">Fri</div>
            <div class="weekdayitem">Sat</div>
        </div>
    </div>
    <button @click="prv">prv</button>
    <button @click="next">next</button>
    {{ testmsg }}  {{ daySelected }}
</template>

<script setup>

import { onMounted, ref, computed, onUpdated, watch } from 'vue';

const props = defineProps({
    todos:Object,
})

const currentDate = ref(new Date()) // 当前时间
const days = ref(null) // 日历元素
const today = ref(new Date().getDate()); // 当前日期
const Year = ref(new Date().getFullYear()); // 当前年份
const Month = ref(new Date().getMonth() + 1); // 当前月份
const dayInMonth = ref(new Date(Year.value, Month.value, 0).getDate()); // 当前月份天数
const dayInNextMonth = ref(new Date(Year.value, Month.value + 1, 0).getDate()); // 下个月份天数
const firstDayinMonth = computed(() => new Date(Year.value, Month.value - 1, 1).getDay()); // 当前月份第一天是星期几
const daySelected = ref(null) // 选中的日期
const daySelectreturn = computed(()=>{
    return daySelected.value
})


const testmsg =  computed(()=>{
    return `${Year.value}-${Month.value}`
}) 


const dayList = computed(() => {
    const arr = [];
    let limit = 49 + firstDayinMonth.value -1
    let offset = firstDayinMonth.value
    let prevMonth = Month.value - 1 < 1 ? 12 : Month.value - 1
    let dayInPrevMonth = new Date(Year.value, prevMonth, 0).getDate();
    /**
     * /todo 这里有bug 应该先得到第一天是星期几 然后再计算
     */
    for (let i = 1 ; i <=
        dayInMonth.value + dayInNextMonth.value  ; i++) {
        if(i<= offset){
            arr.push({
                day: i - offset + dayInPrevMonth,
                month: Month.value - 1 < 1 ? 12 : Month.value - 1,
                year: Month.value - 1 < 1 ? Year.value - 1 : Year.value,

            })
        }
        else if (i > dayInMonth.value + offset) {
            if (i >= limit - offset + 2) {
                // console.log(i)
                break
            } else {
                arr.push({
                    day: i - dayInMonth.value -offset,
                    month: Month.value + 1 > 12 ? 1 : Month.value + 1,
                    year: Month.value + 1 > 12 ? Year.value + 1 : Year.value,

                })
            }
        }
        else {
            arr.push({
                day: i - offset ,
                month: Month.value,
                year: Year.value,

            })
        }
    }
    return arr;
});

//公用方法
const dayCheck = computed((days) =>{
    return (days)=>{
        return days === 'not' ? '' : days
    }
})

const dayPassCheck = () => {
    let res = days.value
    let thisMonth = currentDate.value.getMonth() + 1
    let thisYear = currentDate.value.getFullYear()
    let thisDay = currentDate.value.getDate()
    res.forEach((item, i) => {
        let d = Number(item.getAttribute('day'))
        let m = Number(item.getAttribute('month'))
        let y = Number(item.getAttribute('year'))
        // console.log(y, m, d)
        if (y < Number(thisYear)) {
            item.style.opacity = '0.3'
        } else if (y === Number(thisYear) && m < Number(thisMonth)) {
            item.style.opacity = '0.3'
        } else if (y === Number(thisYear) && m === Number(thisMonth) && d < Number(thisDay)) {
            item.style.opacity = '0.3'
        }
        else{
            item.style.opacity = '1'
        }
    })
}

const calsClick = () =>{
    let res = days.value
    
    res.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            // console.log(e.target.getAttribute('date'))
            daySelected.value = e.target.getAttribute('date')
            emit('clickItem',daySelected.value)
        })
    })
   
}

const todoMonitor = ()=>{
    console.log(props.todos.length,'props.todos')
    let res = days.value
    if(!props.todos){
        console.log('none')
    }else{
        // console.log(props.todos)
        let temp = props.todos
        res.forEach(item=>{
            let date = item.getAttribute('date')
            if(temp[date]){
                item.style.background = '#55E6C1'
            }else{
                item.style.background = '#ccc'
            }
        })
    }
  
}

onMounted(() => {
    // console.log(firstDayinMonth.value)
    dayPassCheck()
    calsClick()
    todoMonitor()
    
    
})
watch(Month, (val, oldVal) => {
    // console.lo/g(val, oldVal)
    dayPassCheck()
    todoMonitor()
    // calsClick()
})
onUpdated(() => {
    dayPassCheck()
    todoMonitor()
    // calsClick()
})

const prv = () => {
    Month.value -= 1
    if (Month.value < 1) {
        Month.value = 12
        Year.value -= 1
    }
    dayInMonth.value = new Date(Year.value, Month.value, 0).getDate();
    dayInNextMonth.value = new Date(Year.value, Month.value + 1, 0).getDate();
    // console.log(Year.value, Month.value)
}

const next = () => {
    Month.value += 1
    if (Month.value > 12) {
        Month.value = 1
        Year.value += 1
    }
    dayInMonth.value = new Date(Year.value, Month.value, 0).getDate();
    dayInNextMonth.value = new Date(Year.value, Month.value + 1, 0).getDate();
    // console.log(Year.value, Month.value)
}


defineExpose({
    daySelected,
    
    
})

const emit = defineEmits(
    ["clickItem"]
)

// const clickItem = (data) => {
    
//     emit("clickItem",data)
// }

</script >

<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
    color: #000;
    display: flex;
    // background-color: #ccc;
    .weekday{
        width:10%;
        height:100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        .weekdayitem{
            width:100%;
            height:calc(100%/7);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .5rem;
            &:nth-child(1){
                color:#29a24d;
            }
            &:nth-child(7){
                color:#d39e2c;
            }
            // background-color: #ccc;
        }
    }

    .calsbody {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;

        .calitem {
            width: calc(100%/9);
            height: calc(100%/7);
            // background-color: #f7f5f4;
            // padding: 0 ;

            // border: 1px solid #000;
            .day {

                max-width: 30px;
                height: 90%;
                max-height: 30px;
                font-size: 1rem;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                // background-color: #ccc;
                cursor: pointer;
                
            }
        }
    }
}

.passed {
    opacity: .3;
}</style>
