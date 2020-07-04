/*1.详情页渲染 */
define(['./cookie_module','./zoom_module'], function (cook,zoom) {
    class Detail {
        constructor(option) {
            this.bigImg=option.bigImg;//放大镜大图
            this.specUl = option.specUl;//放大镜小ul
            this.skuName = option.skuName;//放大镜大图
            this.price = option.price;//显示的价格
            this.smImg = option.smImg;//放大镜小图
            this.surplus = option.surplus;//剩余件数
            this.data = option.data;//渲染数据
            this.catInput = option.catInput;//购物车的数量input元素
            this.btnReduce = option.btnReduce;//购物车的减按钮
            this.btnAdd = option.btnAdd;//购物车的加号按钮
            this.shopCat = option.shopCat;//加入购物车
            this.sid=option.sid;//商品id
            this.cookieData = {};//存储cookie数据
            this.zoomData=option.zoomData;//放大镜所需数据
            
        }
        /* 初始函数 */
        init() {
            /* 1 渲染 */
            this.render();
            /*2 加入购物车 */
            // 2.1添加事件
            this.btnReduce.addEventListener('click', (e) => {
                e= e || event;
                this.reduceHander(e);//使用箭头函数使得当前this指向实例对象
            });//为购物车加减元素添加事件
            this.btnAdd.addEventListener('click', (e) => {
                e= e || event;
                this.addHander(e);
            });
            this.shopCat.addEventListener('click', (e) => {
                e= e || event;
                this.shopHander(e);
            });
            this.catInput.addEventListener('keydown', (e) => {
                e= e || event;
                this.keyHander(e);
            });
        }
        render() {
            let str = `
            <li class="active">
            <img src="${this.data.piclisturl.split('===')[0]}" alt="">
        </li>
        <li>
            <img src="${this.data.piclisturl.split('===')[1]}" alt="">
        </li>
        <li>
            <img src="${this.data.piclisturl.split('===')[2]}" alt="">
        </li>
        <li>
            <img src="${this.data.piclisturl.split('===')[3]}" alt="">
        </li>
        <li>
            <img src="${this.data.piclisturl.split('===')[4]}" alt="">
        </li>
            `;
            this.bigImg.children[0].src=this.data.url;
            this.cookieData.price = this.data.price;//存价格
            this.cookieData.evaluste = this.data.evaluste; //将数量储存在that 属性中
            this.surplus.innerHTML = `剩余${this.data.evaluste}`;
            this.smImg.src = this.data.url;
            this.price.innerHTML = this.data.price;
            let dtr = ` <img src="http://img13.360buyimg.com/devfe/jfs/t4636/72/1687629000/219/64a7daf7/58e44c0fN9f20107c.png" alt="">
            <span>${this.data.title}${this.data.des}</span>`;
            this.specUl.innerHTML += str;
            this.skuName.innerHTML += dtr;
            /* 实现放大镜效果 */
            new zoom.Zoom(this.zoomData).init()//来自 Zoom模块
        }
        //减时vlue跟着减少
        reduceHander(e) {
            if (this.catInput.value <= 1) return;
            this.catInput.value--;
            this.cookieData.shop = cook.get('shop');
        }
        //增加时vlue跟着增加
        addHander(e) {
            if (!this.catInput.value == this.cookieData.evaluste) return;
            this.catInput.value++;
        }
        //为input按钮添加输入事件
        keyHander(e) {
            if (e.keyCode == 13) {
                if (this.catInput.value < 1) {
                    this.catInput.value = 1;
                }
                if (this.catInput.value > this.cookieData.evaluste) {
                    this.catInput.value = this.cookieData.evaluste;
                }
                this.shopHander();
            }
        }
        shopHander() {//将商品数量以及商品id存储到cookie中
            this.cookieData.shop = cook.get('shop'); // 获取cookie中的购物车 
            // 获取是为了判断它是否存在
            // 不存在 创建
            // 存在 修改
            let product = {
                id: this.sid,
                num: this.catInput.value,
                price: this.cookieData.price,
                sum: this.cookieData.evaluste,
                checked:false//默认商品在购物车页不选择
            }
            if (this.cookieData.shop) { // 存在
                this.cookieData.shop = JSON.parse(this.cookieData.shop); // 将字符串转成数组
                // 数组中已经存在了商品的id
                // 只修改num只 而不是将商品放入数组
                if (this.cookieData.shop.some(elm => elm.id == this.sid)) {
                    this.cookieData.shop.forEach(elm => {
                        elm.id == this.sid ? elm.num = this.catInput.value : null;
                    });
                } else {
                    this.cookieData.shop.push(product);
                }
            } else {
                this.cookieData.shop = []; // 不存在新建数组
                this.cookieData.shop.push(product); // 放入商品
            }

            cook.set('shop', JSON.stringify(this.cookieData.shop), 1);
        }

    }

    return {
        Detail
    }
})