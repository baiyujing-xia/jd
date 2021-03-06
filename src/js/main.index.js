require(['./lib/Render_module','./lib/cookie_module','./lib/indexTab_module','./lib/feed_module'],function(Ren,m3,tab,feed){
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
    const footheight=document.getElementById('foot');
    new feed.Feed({
        feedListUl,
        footheight
    }).init();
    /* 头部tab切换 */
    let bnaitem=document.querySelectorAll('.bnaitem');
    let firsttabUl=document.querySelectorAll('.bnav_l>ul>li');
    let jsbna=document.querySelector('.js_bna');
    let tabfirstItem={
        spaceLeft:bnaitem,
        tabUl:firsttabUl,
        jsbna,
        type:'fisttab'
    }
    new tab.Tab(tabfirstItem).init();
    /* 3.tab切换类 */
    let spaceLeft=document.querySelectorAll('.l_center');
    let tabUl=document.querySelectorAll('.l_header>ul>li');
    let tabItem={
        spaceLeft,
        tabUl,
        type:'secondtab'
    }
    new tab.Tab(tabItem).init();
   /* 轮播类 */
   const big=document.querySelector('.big');
   const minLi=document.querySelector('.minli');
   const BtnLeft=document.querySelector('.lunbo_btnleft');
   const BtnRight=document.querySelector('.lunbo_btnright');
   const lunboParent=document.querySelector('.col2_left');
   let renderItem={
        big,//轮播主图
        minLi,//点击切换按钮
        BtnLeft,//左边点击按钮
        BtnRight,//右边点击按钮
        lunboParent,//轮播父元素
        type:'bigtype'
   };
   new Ren.Render({
    type:'get',//请求的方式
    url:'/php/carousel.php',//接口
    kind:'carousel',//类型
    renderItem
}).init(); 
/* 第二个轮播 */
const smaul=document.querySelector('.col2_right>ul'); 
const smaleft=document.querySelector('.col2_right>.lunbo_btnleft'); 
const smaright=document.querySelector('.col2_right>.lunbo_btnright'); 
const samparent=document.querySelector('.col2_right'); 
let renderItemsma={
    big:smaul,//轮播图父元素
    BtnLeft:smaleft,//左边点击按钮
    BtnRight:smaright,//右边点击按钮
    lunboParent:samparent,//轮播父元素
    type:'bsmatype'
};
new Ren.Render({
    type:'get',//请求的方式
    url:'/php/getall.php',//接口
    kind:'carousel',//类型
    renderItem:renderItemsma
}).init(); 
/* 大轮播 点击移动轮播 */
const moveul=document.querySelector('.s_center>ul'); 
const moveleft=document.querySelector('.s_center>.lunbo_btnleft'); 
const moveright=document.querySelector('.s_center>.lunbo_btnright'); 
const moveparent=document.querySelector('.s_center'); 
let slideItem={
    big:moveul,//轮播图父元素
    BtnLeft:moveleft,//左边点击按钮
    BtnRight:moveright,//右边点击按钮
    lunboParent:moveparent,//轮播父元素
    type:'slide'
}
new Ren.Render({
    type:'get',//请求的方式
    url:'/php/getall.php',//接口
    kind:'sli',//类型
    renderItem:slideItem
}).init(); 
/* 小轮播 点击移动轮播 */
const hid=document.querySelector('.hid'); 
const sli=document.querySelector('.s_li');
let minItem={
    big:hid,//轮播图父元素
    minli:sli,//小圆点点击素
    type:'mincusl'
}
new Ren.Render({
    type:'get',//请求的方式
    url:'/php/getall.php',//接口
    kind:'sli',//类型
    renderItem:minItem
}).init(); 
/* 缓慢移动轮播 */
const find=document.querySelector('.goods_list'); 
const bar=document.querySelector('.bar');
let slowItem={
    big:find,//轮播图父元素
    minli:bar,//移动的小块
    type:'slow'
}
new Ren.Render({
    type:'get',//请求的方式
    url:'/php/getall.php',//接口
    kind:'sli',//类型
    renderItem:slowItem
}).init(); 
/* 搜索框优化 */
let forminput=document.querySelector('.form>.search_t');
let formul=document.querySelector('.form>ul');
forminput.addEventListener('input',function(){
    let time=setInterval(() => {
        formul.style.display='block';
        let script=document.createElement('script');
        script.src=`https://suggest.taobao.com/sug?code=utf-8&q=${forminput.value}&_ksTS=1589723848122_399&callback=getlist&k=1&area=c2c&bucketid=16`;
        document.body.appendChild(script);
        document.body.removeChild(script)
    }, 100);
})
window.getlist=getlist;
function getlist(data){
    let str='';
    data.result.forEach(elm=>{
       str+=`<li>${elm[0]}</li>`;
    })
    formul.innerHTML=str;
}
});

