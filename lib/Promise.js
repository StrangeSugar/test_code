//自定义promise模块
(function (window) {
    const PENGDING = "pending";
    const RESOLVED = "resolved"
    const REJACTED = "rejcated"


    //Promise的构造函数
    function Promise(excutor) {
        const _this = this;  //promise的实例对象
        _this.status = PENGDING;//状态的属性，初始值为pending，代表初始未确定的状态
        _this.data = undefined;//用来储存结果数据的属性，初始值为undefined
        _this.callbacks = []





        //调用执行器函数

        //将promise的状态改成成功value
        function resolve(value) {
            if (_this.status !== PENGDING) return
            _this.status = RESOLVED
            _this.data = value;

            //调用所有缓存的待执行成功的回调函数
            if (_this.callbacks.length > 0) {
                //启动一个延迟时间为0 的定时 ，在定时器中的回调执行所有成功的回调
                setTimeout(() => {
                    _this.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onResolved(value)
                    })
                }, 0);

            }


        }
        //将promise的状态改为失败，指定失败的reeson
        function reject(reason) { 
            if (_this.status !== PENGDING) return
            _this.status = REJACTED //改成失败的状态
            _this.data = reason;//保存失败的value
            //调用所有缓存的待执行失败的回调函数
            if (_this.callbacks.length > 0) {
                //启动一个延迟时间为0 的定时 ，在定时器中的回调执行所有失败的回调
                setTimeout(() => {
                    _this.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onRejected(reason)
                    })
                }, 0);

            }

        }
        try {
            excutor(resolve, reject)
        } catch (err) {
            if (_this.callbacks.length > 0) {

            }
        }


    }
    /**
     * 用来指定成功/失败的回调函数的方法
     * 如果当前promise是pending状态，就保存回调函数
     * 如果当前promise是resolved状态,就异步执行成功的回调函数onResolved.
     * 如果当前promise是rejected状态,就异步执行成功的回调函数onRejacted
     * 返回一个新的promise对象
     *  它的结果状态由onResolved或者onRejected执行的结果决定
     *2.1). 抛出error ==> 变为rejected, 结果值为error
     *2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
     *2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
     */
    Promise.prototype.then = function (onResolved, onRejected) {
        const then_this = this;
     
            if (then_this.status === RESOLVED) {
                
                   console.log("调用1")
                        onResolved(then_this.data)
    
                
            }
            else if (then_this.status === REJACTED) {
                console.log("调用2")
                    onRejected(then_this.data)
               
                
            }
            else {
                //保存回调函数 
                console.log("调用3")
    
                this.callbacks.push({
                    onResolved,
                    onRejected
                }) //将两个回调函数以对象形式保存到promis对象
            }
       




    }
    //用来指定失败的回调函数的方法
    Promise.prototype.catch = function (onRejected) {

    }
    //用来返回一个指定value的成功的Promise
    Promise.resolve = function () {

    }
    //用来返回一个指定reason的失败的Promise
    Promise.reject = function () {


    }
    //返回一盒promise，只有当数组中的所有的promise都成功才成功，否则失败
    Promise.all = function (promises) {

    }
    //返回一个promise，由第一个完成的promise决定的状态
    Promise.race = function () {

    }


    window.Promise = Promise;

})(window)