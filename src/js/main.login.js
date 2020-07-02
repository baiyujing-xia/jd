let baseUrl='http://localhost/jd';
require(['./lib/ajax_module','./lib/cookie_module'],function(m1,m2){
    let username=document.getElementById('username');
    let password=document.getElementById('password');
    let fore4a=document.querySelector('.fore4-a');
    fore4a.addEventListener('click',clickHander);
    // 发送请求 将username 以及password发送给后端
 function clickHander(){
        m1.ajax({
            type:'get',
            url:`${baseUrl}/php/login.php`,
            data:{
                username:username.value,
                password:password.value
            },
            dataType:"string",
            success:function(res){
               if( res.split('?')[1]){
                m2.set('username',username.value);
               }
            let script=document.createElement('script');
            script.innerHTML+=`${res.split('?')[0]}`;
            document.head.appendChild(script); 
            }
        })
    }
})
  
