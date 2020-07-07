/* 轮播图移动类 */
class Slide{
    constructor(option){
        this.type=option.type//判断轮播类型
        this.data=option.data//轮播所需数据
        this.big=option.big//轮播主图
        this.minli=option.minli//点击切换小圆点以及移动的小方块
        this.BtnLeft=option.BtnLeft//左边点击按钮
        this.BtnRight=option.BtnRight//右边点击按钮
        this.lunboParent=option.lunboParent//轮播父元素
        this.timer=null;//定义定时器
        this.mintimer=null//小轮播运动定时器
        this.num=null;//ul的宽度
        this.prev=null;
        this.speed=20;//设置移动速度
        this.lf=null;//定义小轮播的初始值
        this.flag=true;
        this.index=0;//设置小圆点的初始值为0
        this.ratio=null//设置缓慢移动比例
    }
    init(){
        /* 京东秒杀轮播图 */
        if(this.type=='slide'){
            this.parentWidth=this.lunboParent.offsetWidth;
            this.slideRender();
            this.BtnLeft.addEventListener('click',()=>{
                /* 如果this.flag为ture,表示可以点击， 点击进去马上将this.flag值改为false,为了 防止在运动未结束，再次点击，用于禁止点
                  在后面运动结束后，再将this.flag改为true,表示可以点击*/
                if(this.flag) {
                this.LeftHander();
                this.flag=false;
                }
            })
            this.BtnRight.addEventListener('click',()=>{
                if(this.flag) {
                this.rightHander();
                this.flag=false;
                }
            })
        }
        /* 京东小轮播图 */
        if(this.type=='mincusl'){
            // console.log(this.minli)
            this.miliRender();
            this.minli.addEventListener('mouseover',(e)=>{
                e=e||event;
                if(e.target.nodeName=='LI'){
                    this.miHander(e.target);
                }
            })
            this.big.parentNode.addEventListener('mouseover',()=>{
                clearInterval(this.timer)
            })
            this.big.parentNode.addEventListener('mouseout',()=>{
                this.timer=setInterval(()=>{
                    if(this.flag) {
                    this.minliHander();
                    this.flag=false;
                    }
                },3000);
            })
            this.timer=setInterval(()=>{
                this.minliHander();
            },3000);
        }
        /* 缓慢移动轮播 */
        if(this.type=='slow'){
            this.speed=3;
            this.slowRender()
            this.timer=setInterval(()=>{
                this.slowHander();
            },100);
            this.ratio=this.minli.parentNode.offsetWidth/this.big.offsetWidth*this.speed;
        }
    }
    /* 设置缓慢移动方式 */
    slowHander(){
        this.lf=this.big.offsetWidth;
        let y=this.big.offsetLeft-this.speed;
        let x=this.minli.offsetLeft+this.ratio;
        if(y<=-this.big.parentNode.offsetWidth){
            this.big.style.left='0px';
            this.minli.style.left='0px';
            return;
        }
        this.big.style.left=y+'px';
        this.minli.style.left=x+'px';
    }
    /* 缓慢移动轮播渲染 */
    slowRender(){
        this.data=this.data.slice(40,50);
        let str='';
        this.data.forEach(elm=>{
            str+=`
            <a href="http://localhost/jd/src/detail.html?id=${elm.sid}">
            <p>TITIKA 全包防震 文胸</p>
            <img src="${elm.url}" alt="">
        </a>`
        })
        this.big.innerHTML=str;
    }

    /* 左边点击按钮 */
    LeftHander(){
        if(this.big.offsetLeft===0){
            this.big.style.left=-this.num+'px'; 
         }
        /* 计算剩余长度 */
        let residue=-this.big.offsetLeft;
         /* 确定点击后最终要到的left值*/
         let ulleft;
         if(residue<this.parentWidth){
            ulleft=0;
         }else{
            ulleft=this.big.offsetLeft+this.parentWidth;//我移动最终要到的位置
         }
         this.leftmove(ulleft);
        
    }
    /* 右边移动按钮 */
    rightHander(){
        /* 计算剩余长度 */
        let residue=this.num+this.big.offsetLeft-this.parentWidth;
        /* 确定点击后最终要到的left值*/
        let ulleft;
        if(residue<this.parentWidth){
            ulleft=this.big.offsetLeft-residue;
            /* 这里已经整个ul结束了 */

        }else{
            ulleft=this.big.offsetLeft-this.parentWidth;//我移动最终要到的位置
        }
        if(residue<=0){/* 这里说明点击是移动最后一块跟第一块一样的图 */
            ulleft=-(this.big.offsetWidth-this.parentWidth);
        }
        this.move(ulleft);
        
    }
    /* 移动方法 */
    move(ulleft){
        this.timer=setInterval(()=>{
            let y=this.big.offsetLeft-this.speed;//设置移动的left值
            if(y<=ulleft){ /*y<=ulleft 是因为速度，会出现比 ulleft 小 */
                /* 运动结束 */
                this.big.style.left=ulleft+'px';
                if(ulleft===-(this.big.offsetWidth-this.parentWidth)){
                    this.big.style.left='0px';
                }
                clearInterval(this.timer);
                this.flag=true;
                return;//运行结束，下面不走，不用再赋值
            }
            this.big.style.left=y+'px';
        },16)
    }
    /* leftmove */
    leftmove(ulleft){
        this.timer=setInterval(()=>{
            let y=this.big.offsetLeft+this.speed;//设置移动的left值
            if(y>=ulleft){ /*y<=ulleft 是因为速度，会出现比 ulleft 小 */
                /* 运动结束 */
                this.big.style.left=ulleft+'px';
                clearInterval(this.timer);
                /*  */
                this.flag=true;
                return;//运行结束，下面不走，不用再赋值
            }
            this.big.style.left=y+'px';
        },16)
    }
    /* 渲染轮播图页面 */
    slideRender(){
        this.data=this.data.slice(30,41)
        let str='';
        this.data.forEach(elm=>{
            str+=` <li>
            <a href="http://localhost/jd/src/detail.html?id=${elm.sid}">
                <div class="s_img">
                    <img src="${elm.url}" alt="">
                </div>
                    <p>${elm.title}</p>
                <div class="s_p">
                    <span class="first">
                        <i>¥</i>
                        <span>${elm.price}</span>
                    </span>
                    <span class="second">
                        <i>¥</i>
                        <span>${elm.price*1.5}</span>
                    </span>
                </div>
            </a>
        </li>
            `;
        })
        this.big.innerHTML=str;
        this.cloneChildren();
    }
    miliRender(){
        this.data=this.data.slice(3,6);
        let str='';
        let stri='';
        for(let i=0;i<this.data.length;i++){
            
            stri+=`<li></li>`;
        }
        this.minli.innerHTML=stri;
        this.data.forEach(elm=>{
            str+=`<li>
            <a href="http://localhost/jd/src/detail.html?id=${elm.sid}">
                <div class="hid_img">
                    <img src="${elm.url}" alt="">
                </div>
                <div class="hid_p">
                    <p>${elm.des}</p>
                    <p>低至${elm.price-30}元</p>
                    <div class="hid_btn">
                        大牌闪购
                        <i></i>
                    </div>
                </div>
               
            </a>
        </li>`;
        })
        str+=`<li>
        <a href="http://localhost/jd/src/detail.html?id=${this.data[0].sid}">
            <div class="hid_img">
                <img src="${this.data[0].url}" alt="">
            </div>
            <div class="hid_p">
                <p>${this.data[0].des}</p>
                <p>低至${this.data[0].price-30}元</p>
                <div class="hid_btn">
                    大牌闪购
                    <i></i>
                </div>
            </div>
           
        </a>
    </li>`;;
        this.big.innerHTML=str;
        this.prev=this.minli.children[0];
        this.prev.className='active';
        this.num=this.data.length*this.big.children[0].offsetWidth;
        this.big.style.width=(this.data.length+1)*this.big.children[0].offsetWidth+'px';
    }
    cloneChildren(){
         /* 在轮播图后重复渲染第一块 */
         let item=this.parentWidth/this.big.children[0].offsetWidth;//父容器显示的li个数
         for(let i=0;i<item;i++){
             this.big.innerHTML+=this.big.children[i].outerHTML;
         }
         this.num=this.data.length*this.big.children[0].offsetWidth;//获取一个li元素的宽
         this.big.style.width=(this.data.length+4)*this.big.children[0].offsetWidth+'px';
    }
    /* 定义小轮播图的移动样式 */
    minliHander(){
        this.lf-=this.big.children[0].offsetWidth;
        this.index++;
       if(this.lf==-this.big.children[0].offsetWidth*3){
        this.lf=0
        this.index=0;
       }
       this.minmove();
    //    this.big.style.left=this.lf+'px';
       this.liclassName();
       
    }
    minmove(){
        this.mintimer=setInterval(()=>{
            let y=this.big.offsetLeft-this.speed;
            if(y<=this.lf){
                clearInterval(this.mintimer);
                this.big.style.left=this.lf+'px';
                this.flag=true;
                return;
            }
               this.big.style.left=y+'px';
        },16)
    }
    /* 小轮播图点击效果 */
    miHander(target){
        this.index=Array.from(this.minli.children).indexOf(target);
        this.liclassName();
        this.lf=-this.big.children[0].offsetWidth*this.index;
        this.big.style.left=this.lf+'px';
    }
    liclassName(){
        if(this.prev) this.prev.className='';
        this.prev=this.minli.children[this.index];
        this.prev.className='active';
    }
}
define([],function(){
    return {
        Slide
    }
})