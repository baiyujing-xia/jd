require([ './lib/cookie_module', './lib/Render_module'], function (cook, Ren) {
    /* 1 拿cookie数据判断cookie  */
    let shop = cook.get('shop');//获取cookie
    //没有就return 终止函数
     //如果cookie存在 执行
    shop = JSON.parse(shop);
    if (!shop || shop.length==0) return;
    /* 2 cookie存在渲染页面 */
    let pImg = document.querySelector('.cat-list');//渲染父容器
    let txt = document.querySelector('.sum');
    let allCheck = document.getElementById('all-check');
    let idlist = shop.map(element => element.id).join();//获取详情页传过来的id列表
    new Ren.Render({
        parent: pImg,//渲染的父元素
        type: 'get',//请求的方式
        url: '/php/shop.php',//接口
        kind: 'cat',//类型
        ajaxData: { idlist },
        renderItem: { shop,txt,allCheck}
    }).init();
});