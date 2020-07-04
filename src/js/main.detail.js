let baseUrl = 'http://localhost/jd';
require(['./lib/Render_module',], function (ran) {
    let id = window.location.search.split('=').slice(1)[0];//获取search上的id
    //id发送给后端获得数据
    /* 渲染详情页 
     1 拿到数据
     2 渲染页面
    */
   /* 购物车元素 */
    const catInput = document.getElementById('cat-input');//获取购物车加减的元素
    const btnReduce = document.querySelector('.btn-reduce');
    const btnAdd = document.querySelector('.btn-add');
    const shopCat = document.querySelector('.shop-cat');
    /* 渲染元素 */
    const skuName = document.querySelector('.sku-name');//获取商品描述的文字
    const price = document.querySelector('.price');//获取详情价格
    const surplus = document.querySelector('.surplus ');
    /* 放大镜需要的图*/
    const smImg = document.querySelector('.sm-img>img');//获取需要放大的图
    const specUl = document.querySelector('.spec-ul');//获取5张图片
    const moveBox=document.querySelector('.movebox')//需要移动的小盒子
    const bigImgDiv=document.querySelector('.bigimgdiv')//需要放大的div区域
    const bigImg=document.querySelector('.bigimg')//放大的图
    let zoomData={
        specUl,//五张图的父元素
        smImg,//需要放大的图
        moveBox,//需要移动的图
        bigImgDiv,//放大后的图显示的区域
        bigImg//需要放大的图片
    }
    let renderItem = {
        specUl,
        skuName,
        price,
        smImg,
        surplus,
        catInput,
        btnReduce,
        btnAdd,
        shopCat,
        bigImg,
        zoomData
    }

    /* 获取数据渲染页面 */
    new ran.Render({
        type: 'get',//请求的方式
        url: '/php/getitem.php',//接口
        kind: 'detaildata',//类型
        ajaxData: {id:id},
        renderItem//渲染类需要的元素(detail_module.js)需要
    }).init();
});
