/* 购物车渲染计算 */
define(['./cookie_module'], function (cook) {
    class Cat {
        constructor(option) {
            this.parent = option.parent;//父元素
            this.data = option.data;
            this.shop = option.shop;//获得cookie数据
            this.txt = option.txt;
            this.allCheck = option.allCheck;
        }
        init() {
            /* 1.渲染页面 */
            this.render();
            this.parent.addEventListener('click', (e) => {
                e = e || event;
                this.clickHander(e);
            });
            this.parent.addEventListener('keydown', (e) => {
                e = e || event;
                this.keyHander(e);
            });
            this.allCheck.addEventListener('click', (e)=>{
                e = e || event;
                this.lisCheck(e);
            });
        }
        render() {
            let str = '';
            this.data.forEach((element, index) => {
                str += `
                            <div class="list-item">
                                <div class="cell p-checkbox">
                                    <input type="checkbox" class="radio" sid="${element.sid}">
                                </div>
                                <div class="cell p-goods">
                                    <div class="p-img">
                                        <img src="${element.url}" alt="">
                                    </div>
                                    <div class="p-name">
                                        ${element.title}
                                    </div>
                                </div>
                                <div class="cell p-props">
                                    <div class="props-txt" title="图片色">图片色</div>
                                </div>
                                <div class="cell p-price">
                                    <span>¥</span><span class="price">${element.price}</span>
                                </div>
                                <div class="cell p-quantity">
                                    <div class="quantity-form">
                                        <a href="javascript:void(0)" class=" f " sid="${element.sid}">-</a>
                                        <input type="text" value="${this.shop[index].num}" class="num-input" sid="${element.sid}">
                                        <a href="javascript:void(0)" class=" c " sid="${element.sid}">+</a>
                                    </div>
                                    <div class="ac">剩余${this.shop[index].sum}件</div>
                                </div>
                                <div class="cell p-sum">
                                    <span>¥</span><span class="p-s">${(this.shop[index].num * element.price).toFixed(2)}</span>
                                </div>
                                <div class="cell p-ops">
                                    <a href="javascript:void(0)" class="ops-a" sid="${element.sid}">删除</a>
                                    <a href="javascript:void(0)">移到我的关注</a>
                                </div>
                            </div>
                            `;
            });
            this.parent.innerHTML = (str);
        }
        clickHander(e) {
            /* 利用正则方法*/
            if (/radio/g.test(e.target.className)) {
                this.radioHander(e.target);
            }
            if (/ f /g.test(e.target.className)) {
                // console.log(1)
                this.fcHander(e.target);
            }
            if (/ c /g.test(e.target.className)) {
                this.fcHander(e.target);
            }

            if (/ops-a/g.test(e.target.className)) {
                this.opsAHander(e.target);
            }

            /* 利用字符串查找方法 查不到返回-1 */
            /* if(~e.target.className.indexOf('radio')){
                console.log(2)
            }   */

        }
        keyHander(e) {
            /* 文本框选择事件 */
            if (/num-input/g.test(e.target.className)) {
                this.inputHander(e, e.target);
            }
        }
        /* 全选框 */
        lisCheck(e) {
            /* 1获取所有商品的input单选框 将其放到一个数组里 为了后面同意操作*/
            let list = Array.from(e.currentTarget.parentNode.parentNode.nextElementSibling.children);
            let arr = [];
            list.forEach(elm => {
                arr.push(elm.children[0].children[0])
            })
            /* 2  遍历单选框按钮 全选框赋值单选框 */

            for (let value of arr) {
                value.checked = e.currentTarget.checked;
            }
            /* 3 修改cookie的checked */
            this.shop.forEach(elm => {
                elm.checked = e.currentTarget.checked
            })
            //4 上传到cookie中
            cook.set('shop', JSON.stringify(this.shop), 1);
            this.totalPrice();//计算价格
        }
        /* 计算商品总价格 */
        totalPrice() {
            let sum = 0;
            this.shop.forEach(elm => {
                if (elm.checked) {//当当前元素被选择时才进行计算
                    sum += elm.num * elm.price;
                }
            })
            this.txt.innerHTML = sum.toFixed(2);//渲染到页面中
        }
        //查找按钮对应的下标 找到对应的input
        //增加按钮的效果实现
        fcHander(target) {
            let price = target.parentNode.parentNode.previousElementSibling.children[1].innerHTML;
            let sumPrice = target.parentNode.parentNode.nextElementSibling.children[1];
            let goodssid = target.getAttribute('sid');
            let inputValue;//商品数量
            let repertory;//商品库存
            /* 1 遍历cookie,获取当前商品的库存repertory，用于后面的计算 */
            this.shop.forEach(elm => {
                if (elm.id === goodssid) {
                    repertory = elm.sum;
                }
            })
            if (/f/g.test(target.className)) {//减
                /* 1 点击减input的值减1 */
                if (target.nextElementSibling.value <= 1) {//当前元素不能小于1
                    target.nextElementSibling.value = 1
                } else {
                    target.nextElementSibling.value--;
                    sumPrice.innerHTML = (target.nextElementSibling.value * price).toFixed(2);
                }
                /* 2 将输入框数量最终的值赋值给他,用于后面cookie商品数量的赋值 */
                inputValue = target.nextElementSibling.value;
            } else if (/c/g.test(target.className)) {//加按钮
                /* 1 点击减input的值加1 */
                if (target.previousElementSibling.value > repertory - 1) {
                    /* 数量不能大于库存 */
                    target.previousElementSibling.value = repertory;
                } else {
                    target.previousElementSibling.value++;
                    sumPrice.innerHTML = (target.previousElementSibling.value * price).toFixed(2);
                }
                /* 2 将输入框数量最终的值赋值给他,用于后面cookie商品数量的赋值 */
                inputValue = target.previousElementSibling.value;
            }
            /*3 获取cookie 修改对应的商品id的对应数量*/
            this.shop.forEach(elm => {
                if (elm.id === goodssid) {
                    elm.num = inputValue;
                }
            })
            /* 4 修改完成存储cookie */
            cook.set('shop', JSON.stringify(this.shop), 1);//将改变后的商品数量上传到cookie
            this.totalPrice();//计算上传后的价格
        }

        //商品输入框按钮的实现
        inputHander(e, target) {//事件对象和目标元素（数量文本框）
            if (e.keyCode == 13) {//当按钮按下时将值上传到cookie
                /* 1 存储cookie 讲当前value赋值num */
                let price = target.parentNode.parentNode.previousElementSibling.children[1].innerHTML;
                let sumPrice = target.parentNode.parentNode.nextElementSibling.children[1];
                let goodssid = target.getAttribute('sid');
                this.shop.forEach(elm => {
                    if (elm.id === goodssid) {
                        elm.num = target.value;
                    }
                })
                /* 2总价修改 */
                sumPrice.innerHTML = (target.value * price).toFixed(2);
                /* 3 存储cookie */
                cook.set('shop', JSON.stringify(this.shop), 1);
                /* 4 计算价格 */

                this.totalPrice();

            }
        }
        //为每一个checked按钮设置属性checked上传到cookie中

        radioHander(target) {
            let flag = true;    //定义一个开关 如果遍历值被修改 就不是全选
            let goodssid = target.getAttribute('sid');
            this.shop.forEach(elm => {
                if (elm.id === goodssid) {
                    elm.checked = target.checked;
                }
                if (elm.checked === false) {
                    flag = false;
                }
            })
            /* 单选框全选 则全选框为true 如果有一个不是全选就为false*/
            this.allCheck.checked = flag ? true : false;
            cook.set('shop', JSON.stringify(this.shop), 1);
            this.totalPrice();//上传后重新计算一次价格
        }
        //删除元素 并且删除cookie
        opsAHander(target) {
            /* 删除父元素 */
            let goodssid = target.getAttribute('sid');
            target.parentNode.parentNode.remove();
            /* 删除cookie中此商品 */
            this.shop.forEach((elm, index) => {
                if (elm.id === goodssid) {
                    this.shop.splice(index, 1);
                }
            })
            /* 删除后的存储cookie */
            cook.set('shop', JSON.stringify(this.shop), 1);
            this.totalPrice();//删除元素价格
        }
    }
    return {
        Cat
    }
})