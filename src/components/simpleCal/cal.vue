<template>
    <div class="container">
        <div class="calsbody">
            <div v-for="day in dayList " class="calitem">
                <div class="day" ref="days" :year="day.year" :month="day.month" :day="day.day"
                    :date="`${day.year}-${day.month}-${day.day}`"> {{ day.day }} </div>
            </div>
        </div>
    </div>
    <button @click="prv">prv</button>
    <button @click="next">next</button>
</template>

<script setup>

import { onMounted, ref, computed, onUpdated, watch } from 'vue';
const currentDate = ref(new Date())
const days = ref(null)
const today = ref(new Date().getDate());
const Year = ref(new Date().getFullYear());
const Month = ref(new Date().getMonth() + 1);
const dayInMonth = ref(new Date(Year.value, Month.value, 0).getDate());
const dayInNextMonth = ref(new Date(Year.value, Month.value + 1, 0).getDate());

const dayArr = ref([])

const dayList = computed(() => {
    const arr = [];
    let limit = 49

    for (let i = 1; i <=
        dayInMonth.value + dayInNextMonth.value; i++) {
        if (i > dayInMonth.value) {
            if (i >= limit + 1) {
                // console.log(i)
                break
            } else {
                arr.push({
                    day: i - dayInMonth.value,
                    month: Month.value + 1 > 12 ? 1 : Month.value + 1,
                    year: Month.value + 1 > 12 ? Year.value + 1 : Year.value,

                })
            }
        }
        else {
            arr.push({
                day: i,
                month: Month.value,
                year: Year.value,

            })
        }
    }
    return arr;
});

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
            item.style.opacity = '0.5'
        } else if (y === Number(thisYear) && m < Number(thisMonth)) {
            item.style.opacity = '0.5'
        } else if (y === Number(thisYear) && m === Number(thisMonth) && d < Number(thisDay)) {
            item.style.opacity = '0.5'
        }
        else{
            item.style.opacity = '1'
        }
    })
}

onMounted(() => {
    console.log(Year.value, Month.value)
    dayPassCheck()
})
watch(Month, (val, oldVal) => {
    // console.lo/g(val, oldVal)
    dayPassCheck()
})
onUpdated(() => {
    dayPassCheck()
})

const prv = () => {
    Month.value -= 1
    if (Month.value < 1) {
        Month.value = 12
        Year.value -= 1
    }
    dayInMonth.value = new Date(Year.value, Month.value, 0).getDate();
    dayInNextMonth.value = new Date(Year.value, Month.value + 1, 0).getDate();
    console.log(Year.value, Month.value)
}

const next = () => {
    Month.value += 1
    if (Month.value > 12) {
        Month.value = 1
        Year.value += 1
    }
    dayInMonth.value = new Date(Year.value, Month.value, 0).getDate();
    dayInNextMonth.value = new Date(Year.value, Month.value + 1, 0).getDate();
    console.log(Year.value, Month.value)
}

</script >

<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
    color: #000;
    // background-color: #ccc;

    .calsbody {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;

        .calitem {
            width: calc(100%/7);
            height: calc(100%/7);
            background-color: #fff;
            padding: 0 1px;

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
                background-color: #ccc;
            }
        }
    }
}

.passed {
    opacity: .3;
}</style>
