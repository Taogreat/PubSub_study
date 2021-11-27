(function(window){

    let id=0
    let callbacks={
        // add:{
        //     uid:add1(),
        //     uid2:add2(),
        // },
        // delete:{
        //     uid3:add3()
        // }
    } //保存回调函数的容器


    const PubSub={

        // subscribe(msgName, callback): 订阅消息, 并返回一个标识token
        subscribe(msgName, callback){
            let uid=`uid_${id++}`
            if(!callbacks[msgName]) callbacks[msgName]={}
            callbacks[msgName][uid]=callback
            return uid
        },

        // publish(msgName, data): 异步发布消息
        publish(msgName, data){
            if(callbacks[msgName]){
                Object.values(callbacks[msgName]).forEach(callback=>{
                    setTimeout(()=>{
                        callback(msgName,data)
                    })
                })
            }
        },

        // publishSync(msgName, data): 同步发布消息
        publishSync(msgName, data){
            if(callbacks[msgName]){
                Object.values(callbacks[msgName]).forEach(callback=>{
                    callback(msgName,data)
                })
            }
        },

        /* 
        unsubscribe(flag): 根据flag取消订阅
            1. flag没有指定: 取消所有
            2. flag是一个token值: 取消对应的一个回调
            3. flag是msgName: 取消对应的所有
        */
        unsubscribe(flag){
            if(flag === undefined){//不传
                callbacks={}
            }else if(typeof flag === 'string' && flag.indexOf('uid_') === 0){//传token
                Object.values(callbacks).forEach(obj=>{
                    delete obj[flag]
                })
            }else{//传事件名
                delete callbacks[flag]
            }

        }

    }

    window.PubSub=PubSub

})(window)