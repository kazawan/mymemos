import { ref,reactive, computed,onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'


export const useTodoStore = defineStore('todoStore', () => {
    const usetodoList = ref({
        "2023-4-13":{
            todo:[
                {
                    id: 1,
                    content: '调音',
                    timestart: '19:00',
                    workzone: '希尔顿酒店',
                    tags: '调音',
                    payment: '1000元',
                    color: '#EAB543'
                },
            ]
        }
    })

    const getTodo = () =>{
        
        return usetodoList.value
        
    }

    return {
        usetodoList,
        getTodo

    }
})
