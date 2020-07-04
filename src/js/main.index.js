require(['./lib/Render_module','./lib/cookie_module','./lib/indexTab_module'],function(Ren,m3,tab){
    /* 1.登入注册 显示用户名*/
   let login=document.querySelector('.lore>.login');
   let loginame=document.querySelector('.user_show>a');
   let car=document.querySelector('.car>b');
   if(m3.get('username')){
    login.innerHTML=`你好,${m3.get('username')}`;
    loginame.innerHTML=`${m3.get('username')},欢迎逛京东!`;
   }
   let sum=0;
   if(m3.get('shop')){
    JSON.parse(m3.get('shop')).forEach(elm=>{
        sum+=parseInt(elm.num);
      })
      car.innerHTML=sum;
   }
    /*2 渲染主页的为你推荐列表 */
    const feedListUl=document.querySelector('.feed_list>ul');
    new Ren.Render({
        parent:feedListUl,//渲染的父元素
        type:'get',//请求的方式
        url:'/php/getall.php',//接口
        kind:'feedList'//类型
    }).init(); 
    new tab.Tab().init();
   
});