class Tab {
    constructor(option) {
        this.spaceLeft = option.spaceLeft;//tab切换父元素
        this.tabUl = option.tabUl;//tab切换li
        this.prev = this.spaceLeft[0]//设置变量定义初始样式
        this.jsbna = option.jsbna//显示的父元素
        this.type = option.type//传入的类型
    }
    init() {
        if (this.type == 'secondtab') {
            this.prev.style.display = 'block';
            /* 遍历li元素 为li元素添加事件 */
            this.tabUl.forEach(elm => {
                elm.addEventListener('mouseover', (e) => {
                    e = e || event;
                    this.tabclickHander(e.currentTarget);
                })
            })
        }
        /* 父元素鼠标移出事件 */
        if (this.type == 'fisttab') {
            this.tabUl.forEach(elm => {
                elm.addEventListener('mouseover', (e) => {
                    e = e || event;
                    this.tabclickHander(e.currentTarget);
                })
            })
            this.tabUl[0].parentNode.addEventListener('mouseout',()=>{
                this.jsbna.style.display = 'none';
            })
            this.jsbna.addEventListener('mouseover', () => {
                this.jsbna.style.display = 'block';
            })
            this.jsbna.addEventListener('mouseout', () => {
                this.jsbna.style.display = 'none';
            })
        }

    }

    /* 鼠标进入是的放大 */
    tabclickHander(target) {
        if (this.type == 'fisttab') this.jsbna.style.display = 'block';
        if (this.prev) this.prev.style.display = 'none';
        let index = Array.from(this.tabUl).indexOf(target);
        this.prev = this.spaceLeft[index];
        this.prev.style.display = 'block';
    }
}
define([], function () {
    return {
        Tab
    }
})