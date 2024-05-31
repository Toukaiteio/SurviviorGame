const EventInterceptorGenerator = () => {
    return {
        "event_fire_up":{
            "Before":{
                "example":(event_name)=>{
                    console.log(`${event_name} interceptor:`,_TStore);
                }
            },
            "After":{
                
            }
        }
    }
}