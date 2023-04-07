import axios from 'axios'
import {onMounted} from 'vue'
export const useAuthCheck = () => {
    const Check = (token) => {
        return new Promise((reslove) => {
            axios.post('http://192.168.3.123:3000/isAuth',
                {
                    token: token
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

            ).then((res) => {
                console.log(res.data)
                if (res.data.code != 200) {
                    reslove(false)
                } else {
                    reslove(true)
                }

            })
        })

    }

  

    return { Check }




}