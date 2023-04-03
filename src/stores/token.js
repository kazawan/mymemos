import { ref,reactive, computed,onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('tokenStore', () => {
  const userToken = ref(JSON.parse(localStorage.getItem('token')) || {token:'no token',isAuth:false} )
  const getUserToken = computed(()=>{
    return userToken.value.token
  })
  const getUserisAuth = computed(()=>{
    return userToken.value.isAuth 
  })

 

  return { userToken,getUserToken,getUserisAuth }
})
