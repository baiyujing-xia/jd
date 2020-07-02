 //总结：
 //参数超过3个或以上，就使用对象来作为参数。对象是无序的，可扩展的
 //option:配置参数（在工作中，option代表对象） setting:默认参数
 /* 
 ajax函数封装 （交互） - 方便使用 
 1：函数的参数不能超过4个 对象(属性无序)
 2: 传输或者获取都需要ajax 四部曲
 3：如何配置参数（可变的）
     -请求方式
     -接收地址   必须传
     -是否异步
     -是否传输数据
     -把里面的接口数据拿出来  callback回调函数  
     -接口地址有误，回调函数  error
     -想到拿到的接口数据的数据类型    
 4：如何配置默认值
     -请求方式 - get
     -接收地址 -必填项
     -是否异步 - true 
     -是否传输数据 - 数据是否存在（get/post） 不需要传数据就不用传
     -回调函数  callback- 可以不传  不需要拿值就不用传
     -想到拿到的接口数据的数据类型 -JSON对象 可以不传 默认拿到数据是对象
 5.最大的兼容，让使用的少犯点错误
 */
 //    $ajax({
 //     type:'post',//请求方式
 //     url:"http://localhost/boject/5.14ajax/2updata.php",
 //     // data:{
 //     //     name:"张三",
 //     //     age:16
 //     // },
 //     async:true,
 //     success:function(res){
 //         console.log(res);
 //     },
 //     error:function(err){
 //         throw new Error(err);
 //     },
 //     dataType:"string"
 // });
define([],function(){
    return{
      ajax:function (option) {
        let xhr = new XMLHttpRequest();
        /* 1 设置请求方式，默认值get */
        option.type = option.type || 'get';
        /* 2 判断接口地址是否存在  不存在，自定义错误*/
        if (!option.url) {
            throw new Error("请输入接口地址");
        };
        /* 3 数据是否存在    存在，再判断是什么类型，是否是对象*/
        if (option.data) {
            if (Object.prototype.toString.call(option.data).slice(8, -1) === "Object") { //数据是对象
                var arr = [];
                for (var prop in option.data) {
                    var str = prop + "=" + option.data[prop];
                    arr.push(str);
                }
                option.data = arr.join("&");
            }
        }
        /* 4 判断请求方式 - get */
        if (option.data && option.type === "get") {
            option.url = option.url + "?" + option.data;
        }
        /* 6 判断是否异步 */
        if (option.async === 'false' || option.async === false) {
            option.async = false;
        } else {
            option.async = true;
        }
        xhr.open(option.type, option.url, option.async);
        /* 5 判断请求方式 - post  为啥这个要放在监听前面：因为同步是时候，是先发送，才拿到数据的*/
        if (option.data && option.type === "post") {
            xhr.setRequestHeader("content-type", "appliction/x-www-form-urlencoded");
            xhr.send(option.data);
        } else { //get post  只要数据不存在就走这块
            xhr.send();
        }
        /* 7异步判断 */
        if (option.async) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        /* 8 是否存在 option.dataType    条件是option.dataType必须存在，并且值必须是string，取反*/
                        if (option.dataType && option.dataType === "string") {
                            /* xhr.responseText 是接口数据 */
                            // let arr=JSON.parse(xhr.responseText);
                            option.success && typeof option.success === "function" && option.success(xhr.responseText);
                        } else {
                            option.success && typeof option.success === "function" && option.success(JSON.parse(xhr.responseText));
                        }
                    } else {
                        option.error && typeof option.error === "function" && option.error("接口地址有误，404");
   
                        // throw new error("接口地址有误，404");
                    }
                }
        } else { //同步
            /* 8 是否存在 option.dataType    条件是option.dataType必须存在，并且值必须是string，取反*/
            if (!(option.dataType && option.dataType === "string")) {
                /* xhr.responseText 是接口数据 */
                option.success && typeof option.success === "function" && option.success(xhr.responseText);
            } else {
                let arr = JSON.parse(xhr.responseText);
                option.success && typeof option.success === "function" && option.success(arr);
            }
   
        }
   
    }
    }

})
 