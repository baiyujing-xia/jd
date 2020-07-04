function Ps(option) {
    
    // 第一步获取元素，获取三个要改变的li元素
    this.div = document.querySelectorAll('#div1>ul>li');
    this.btn = document.querySelectorAll('#div2>ul>li');
    this.lis = document.querySelectorAll('#bigpc>ul>li');
    /* 放大镜, 首先在需要放大的元素中制造一个movebox（移动盒子）第一步获取元素*/
    this.move = document.querySelector('#movebox');
    this.bigpc = document.querySelector('#bigpc');
    this.smallpic = document.querySelector('#div1');
    this.bigpic = document.querySelector('.bigpic');
    this.prev = null;
}
Ps.prototype = {
    clickHander:function(e) {//this 指的btn[i] this.that指向的实例对象
    if (this.that.prev) this.that.prev.className = '';
    this.that.prev = this;//设置开关
    this.that.prev.className = 'pitch';
    //图片地址赋值给另外两个li区域
    this.that.div[0].firstElementChild.src = this.firstElementChild.src;
    this.that.lis[0].firstElementChild.src = this.firstElementChild.src;

},
    overHander:function (e) {
    //给移动的box和大图显示区域加显示
    this.that.move.className = 'show';
    this.that.bigpc.className = 'show';
    // 获取比例 move大小/需要放大区域大小=放大显示区域大小/放大图片大小
    this.that.move.style.width = this.offsetWidth * (this.that.bigpc.offsetWidth / this.that.bigpic.offsetWidth) + 'px';
    this.that.move.style.height = this.offsetHeight * (this.that.bigpc.offsetHeight / this.that.bigpic.offsetHeight) + 'px';
    this.that.riduo = this.that.bigpic.offsetWidth / this.offsetWidth;
},

 moveHander:function(e) {
    var y = e.pageY - this.that.move.offsetHeight / 2;
    var x = e.pageX - this.that.move.offsetWidth / 2;
    if (y < 0) {
        y = 0;
    } else if (y > this.offsetHeight - this.that.move.offsetHeight) {
        y = this.offsetHeight - this.that.move.offsetHeight + 2;

    }
    if (x < 0) {
        x = 0;
    } else if (x > this.offsetWidth - this.that.move.offsetWidth) {
        x = this.offsetWidth - this.that.move.offsetWidth + 2;
    }
    this.that.move.style.top = y + 'px';
    this.that.move.style.left = x + 'px';
    this.that.bigpic.style.top = -this.that.riduo * y + 'px';
    this.that.bigpic.style.left = -this.that.riduo * x + 'px';
},
outHander:function(e) {
    this.that.move.className = 'boc';
    this.that.bigpc.className = 'boc';
}
}

define([],function(){
    return{Ps}
})