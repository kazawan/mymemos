import axios from 'axios'


export const useAuthCheck = () => {
    const Check = (token, cbfail) => {
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
                cbfail
            } else {
                return
            }

        })
    }

    return {Check}




}