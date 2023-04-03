import { useCounterStore } from "./counter";


export default{
    install:(app)=>{
        const counter = useCounterStore()
        app.config.globalProperties.counter = counter
    }
}