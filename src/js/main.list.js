require(['./lib/Render_module'],function(ran,){
    /* 1. 渲染列表页 */
    const listUl=document.querySelector('#list-min>.container>ul');
    const pageItem={
        /* 1 ,int */
    }
    new Ren.Render({
        parent:listUl,//渲染的父元素
        type:'get',//请求的方式
        url:'/php/getall.php',//接口
        kind:'list',
        pageItem
    }).init(); 
       
})