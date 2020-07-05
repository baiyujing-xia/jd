/* 分页类 */
class Pag {
    constructor(option) {
        this.confir = option.confir,//确定按钮
            this.pageInput = option.pageInput,//输入框
            this.listUl = option.listUl;//需要渲染的父元素
        this.orderPrice = option.orderPrice;//排序价格的按钮
        this.pNum = option.pNum;//渲染的父元素
        this.data = option.data;//数据
        this.pNumA = option.pNumA;//需要操作的ul元素（上一页下一页）                             
        this.num = 10;//每页显示10条数据可自己定义
        this.prev = null; //定义一个开关 页码保存样式
        this.index = 0;//当前显示的页码
        this.pagas = Math.ceil(this.data.length / this.num);
        this.flag = true;//商品价格排序true为降序
    }
    init() {
        /* 计算页数 渲染页数*/
        this.paga();
        /* 2为每一个页码添加点击事件进行对应数据渲染 */
        this.pNum.addEventListener('click', (e) => {
            e = e || event;
            if (e.target === this.pNum) return;
            this.liclickHander(e.target);
        })

        this.liclickHander()
        /* 为上一页 下一页添加事件 */;
        this.pNumA.forEach(elm => {
            elm.addEventListener('click', (e) => {
                e = e || event;
                this.aclickHander(e.target);
            });
        })
        /* 为页码的确定按钮添加事件 */
        this.confir.addEventListener('click', (e) => {
            e = e || event;
            this.confirHander(e.target);
        })
        this.orderPrice.addEventListener('click', (e) => {
            e = e || event;
            this.orderPriceHander(e.target);
        })
    }
    paga() {
        let str = '';
        for (let i = 1; i <= this.pagas; i++) {
            str += `<li>${i}</li>`;
        }
        this.pNum.innerHTML = str;
        this.prev = this.pNum.children[0];
        this.prev.className = 'active';
    }
    liclickHander(target) {
        /* 获取对应的下标 */
        this.index = !target ? this.index : parseInt(target.innerHTML - 1);
        /* 设置样式 */
        if (this.prev) this.prev.className = '';
        this.prev = this.pNum.children[this.index];
        this.prev.className = 'active';
        /* 截取对应下标的数据 */
        let pagadata = this.data.slice(this.index * 10, (this.index + 1) * 10);
        /* 对应数据渲染 */
        let str = '';
        pagadata.forEach(elm => {
            str += `
        <li class="list-li">
        <div class="gl-i-wrap">
            <div class="p-img">
                <a href="http://localhost/jd/src/detail.html?id=${elm.sid}">
                    <img src="${elm.url}" alt="">
                </a>
            </div>
            <div class="p-price">
                <em>¥</em>
                <i>${elm.price}</i>
            </div>
            <div class="p-name">
                <a href="http://localhost/jd/src/detail.html?id=${elm.sid}">${elm.title}</a>
            </div>
            <div class="p-operate">
                <a href="" class="attention">
                    <i></i>
                    关注
                </a>
                <a href="javascript:void(0);" class="addcat">
                    <i></i>
                    加入购物车
                </a>
            </div>
        </div>
    </li>
        `;
        })
        this.listUl.innerHTML = str;

    }
    aclickHander(target) {
        if (/previousPage/g.test(target.className)) {
            if (this.index < 1) {
                this.index = 0
                return;
            }
            this.index--
            this.liclickHander();
        } else if (/nextPage/g.test(target.className)) {
            console.log(this.pagas)
            if (this.index > this.pagas - 2) {
                this.index = this.pagas - 2;
                return;
            }
            this.index++;
            this.liclickHander();
        }
    }
    confirHander(target) {
        if (isNaN(Number(this.pageInput.value))) this.pageInput.value = 1;
        if (this.pageInput.value - 1 == this.index) return;
        if (this.pageInput.value < 0) this.pageInput.value = 1;
        if (this.pageInput.value > this.pagas) this.pageInput.value = this.pagas;
        this.index = this.pageInput.value - 1;
        this.liclickHander();
    }
    orderPriceHander(target) {
        if (this.flag) {
            /* 商品降序 */
            this.data = this.data.sort((a, b) => {
                return a.price - b.price;
            })

        } else {
            /* 商品升序 */
            this.data = this.data.sort((a, b) => {
                return b.price - a.price;
            })
        }
        this.index=0;
        this.flag = !this.flag;
        this.liclickHander();
    }
}
define([], function () {
    return {
        Pag
    }
})