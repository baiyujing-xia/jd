let baseUrl='http://localhost/jd';
require(['./lib/ajax_module'],function(m1){
    let username=document.getElementById('username');
    let password=document.getElementById('password');
    let phone=document.getElementById('tel');
    let fore4a=document.querySelector('.fore4-a');
    let result=document.querySelector('.tel-result')
    fore4a.addEventListener('click',clickHander);
    // 发送请求 将username 以及password发送给后端
    let flag;
        // 验证手机号是否正确
        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        phone.oninput = function() {
            result.innerHTML = myreg.test(this.value) ? '通过验证' : '未通过验证';
            flag= myreg.test(this.value);
            
        }
    function clickHander(){
        if(!flag) return result.innerHTML='请填写正确的手机号码';
        m1.ajax({
            type:'get',
            url:`${baseUrl}/php/register.php`,
            data:{
                username:username.value,
                password:password.value,
                phone:phone.value
            },
            dataType:"string",
            success:function(res){
            let script=document.createElement('script');
            script.innerHTML+=`${res}`;
            document.head.appendChild(script);
            }
        });
    }
  
})