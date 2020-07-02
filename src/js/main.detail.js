let baseUrl='http://localhost/jd';
require(['./lib/ajax_module','./lib/cookie_module'],function(m1,m2){
    let id=window.location.search.split('=').slice(1)[0];//获取search上的id
    //id发送给后端获得数据

    let catInput=document.getElementById('cat-input');//获取购物车加减的元素
    let btnReduce=document.querySelector('.btn-reduce');
    let btnAdd=document.querySelector('.btn-add');
    let shopCat=document.querySelector('.shop-cat');
    btnReduce.addEventListener('click',reduceHander);//为购物车加减元素添加事件
    btnAdd.addEventListener('click',addHander);
    shopCat.addEventListener('click',shopHander);
    let that;
    m1.ajax({
        type:'get',
        url:`${baseUrl}/php/getitem.php`,
        data:{
            id:id
        },
        success:function(date){
            //获取成功后渲染详情页
            let ul=document.querySelector('.spec-ul');//获取5张图片
            let div=document.querySelector('.sku-name');//获取商品描述的文字
            let price=document.querySelector('.price');//获取详情价格
            let smImg=document.querySelector('.sm-img>img');//获取需要放大的图
            let surplus=document.querySelector('.surplus ');
            let str=`
            <li>
            <img src="${date.piclisturl.split('===')[0]}" alt="">
        </li>
        <li>
            <img src="${date.piclisturl.split('===')[1]}" alt="">
        </li>
        <li>
            <img src="${date.piclisturl.split('===')[2]}" alt="">
        </li>
        <li>
            <img src="${date.piclisturl.split('===')[3]}" alt="">
        </li>
        <li>
            <img src="${date.piclisturl.split('===')[4]}" alt="">
        </li>
            `;
            that=date.evaluste;
            surplus.innerHTML=`剩余${date.evaluste}`;
            smImg.src=date.url;
            price.innerHTML=date.price;
            let dtr=` <img src="http://img13.360buyimg.com/devfe/jfs/t4636/72/1687629000/219/64a7daf7/58e44c0fN9f20107c.png" alt="">
            <span>${date.title}${date.des}</span>`;
            ul.innerHTML+=str;
            div.innerHTML+=dtr;
        }
    })

function reduceHander(){
    if(catInput.value<=1) return;
    catInput.value--;
}
function addHander(){
    if(!catInput.value==that) return;
    catInput.value++;
}
function shopHander(){//将商品数量以及商品id存储到cookie中
    let shop = m2.get('shop'); // 获取cookie中的购物车 
    // 获取是为了判断它是否存在
    // 不存在 创建
    // 存在 修改

    let product = {
        id: id,
        num:catInput.value
    }

    if (shop) { // 存在
        shop = JSON.parse(shop); // 将字符串转成数组
        // 数组中已经存在了商品的id
        // 只修改num只 而不是将商品放入数组
        if (shop.some(elm => elm.id == id)) {
            shop.forEach(elm => {
                elm.id == id ? elm.num = num : null;
            });
        } else {
            shop.push(product);
        }
    } else {
        shop = []; // 不存在新建数组
        shop.push(product); // 放入商品
    }

    m2.set('shop', JSON.stringify(shop),1);
}
});
