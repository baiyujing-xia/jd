/* 轮播图移动类 */
class Slide{
    constructor(option){
        this.type=option.type//判断轮播类型
        this.data=option.data//轮播所需数据
        this.big=option.big//轮播主图
        // this.minLi=option.minLi//点击切换按钮
        this.BtnLeft=option.BtnLeft//左边点击按钮
        this.BtnRight=option.BtnRight//右边点击按钮
        this.lunboParent=option.lunboParent//轮播父元素
        this.timer=null;//定义定时器
        this.num=null;//ul的宽度
        this.sum=0;
        this.speed=20;//设置移动速度
        this.parentWidth=this.lunboParent.offsetWidth;
        this.flag=true;
    }
    init(){
        /* 京东秒杀轮播图 */
        if(this.type=='slide'){
            this.slideRender();
            this.BtnLeft.addEventListener('click',()=>{
                if(this.flag) this.LeftHander();
                this.flag=false;
            })
            this.BtnRight.addEventListener('click',()=>{
                if(this.flag) this.rightHander();
                this.flag=false;
            })
        }
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
        /* 在轮播图后重复渲染第一块 */
        let item=this.parentWidth/this.big.children[0].offsetWidth;//父容器显示的li个数
        // console.log(this.big.children[0].outerHTML)
        for(let i=0;i<item;i++){
            this.big.innerHTML+=this.big.children[i].outerHTML;
        }
        this.num=this.data.length*this.big.children[0].offsetWidth;//获取一个li元素的宽
        this.big.style.width=(this.data.length+4)*this.big.children[0].offsetWidth+'px';
    }
}
define([],function(){
    return {
        Slide
    }
})