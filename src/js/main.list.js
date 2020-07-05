require(['./lib/Render_module'],function(ran,){
    /* 1. 渲染列表页 */
    const listUl=document.querySelector('#list-min>.container>ul');
    const pNum=document.querySelector('.p-num>ul');
    const pNumA=document.querySelectorAll('.p-num>a');
    const pageInput=document.querySelector('.pageInput');
    const confir=document.querySelector('.confir');
    const orderPrice=document.querySelector('.order-price');
    const renderItem={
        /* 1 ,int */
        listUl,//需要渲染的父元素
        pNum,//需要添加的页码
        pNumA,//需要操作的a元素（上一页下一页）
        confir,//确定按钮
        pageInput,//输入框
        orderPrice//排序价格按钮
    }
    new ran.Render({
        parent:listUl,//渲染的父元素
        type:'get',//请求的方式
        url:'/php/getall.php',//接口
        kind:'list',
        renderItem
    }).init(); 
       
})