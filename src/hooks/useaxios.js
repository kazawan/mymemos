import axios from 'axios';

const useAxios = {
    get(url,callback){
        return new Promise((resolve,reject)=>{
            axios
                .get(url)
                .then((res)=> callback ? callback(resolve(res.data)) : resolve(res.data) )
                .catch((err)=>{
                    reject(err)
                })
        })
        
    },
    post(url,params,callback){
        return new Promise((resolve,reject)=>{
            axios
                .post(url,{params})
                .then((res)=> callback ? callback(resolve(res.data)) : resolve(res.data) )
                .catch(err=>reject(err))
        })
    }
}


export default useAxios