let baseUrl = "http://localhost/h5-2003/day35";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];

            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    let pic = JSON.parse(res.pic);

                    let temp = `
                    <h1>${res.title}</h1>
                    <div>
                        <img src="${baseUrl}/src/${pic[1].src}" alt="${pic[1].title}">
                    </div>
                    <div>
                        <span class="yuan">￥</span>${res.price}
                    </div>
                    <div>
                        库存:<span>${res.num}</span>
                    </div>
                    <input type="number" class="num" min="1" max="${res.num}" value="1">
                    <input type="button" class="add" value="加入购物车">
                    <div>
                        ${res.details}
                    </div>
                    `;

                    $('body').append(temp);

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            // shop
            let shop = cookie.get('shop'); // 获取cookie中的购物车 
            // 获取是为了判断它是否存在
            // 不存在 创建
            // 存在 修改

            let product = {
                id: id,
                price: price,
                num: num
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

            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }
});