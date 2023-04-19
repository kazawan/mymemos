import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todoStore', () => {
    const usetodoList = ref({})

    const getTodo = computed(() => {
        return (data) => {
            if (!data) { return 'no todo' }
            else if (!usetodoList.value[data]) { return 'no todo' }
            else { return usetodoList.value[data] }

        }
    })
    /**
     * 
     * @param {用户名} username 
     */
    const saveTodo = (username) => {
        localStorage.setItem(username, JSON.stringify(usetodoList.value))
    }
 
    const getlocalTodo = (username) => {
        // console.log('getlocalTodo')
        if (localStorage.getItem(username)) {
            usetodoList.value = JSON.parse(localStorage.getItem(username))
        }else{
            usetodoList.value = {}
        }
    }

    const getServerTodo = (username) => {
        // console.log('getServerTodo')

    }
    
    return {
        usetodoList,
        getTodo,
        saveTodo,
       
        getlocalTodo,
    }
})
