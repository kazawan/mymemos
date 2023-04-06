import { ref,reactive, computed,onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('tokenStore', () => {
  const userToken = ref(JSON.parse(localStorage.getItem('token')) || {token:'no token',isAuth:false} )
  const user = ref('test')

  const setToken = (token) => {
    console.log('set')
    userToken.value = {
      token: token,
      isAuth: true
    }
    localStorage.setItem('token', JSON.stringify({
      token: token,
      isAuth: true
    }))
  }

  const getUserToken = computed(()=>{
    return userToken.value.token
  })
  const getUserisAuth = computed(()=>{
    return userToken.value.isAuth 
  })

  const logout = () =>{
    console.log('logout')
    userToken.value = {
      token: 'no token',
      isAuth: false
    }
    localStorage.setItem('token', JSON.stringify(userToken.value))
  }

 

  return { userToken,getUserToken,getUserisAuth ,setToken,user,logout}
})
