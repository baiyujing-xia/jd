/*  */
class Carousel{
    constructor(option){
        this.type=option.type//判断轮播类型
        this.data=option.data//轮播所需数据
        this.big=option.big//轮播主图
        this.minLi=option.minLi//点击切换按钮
        this.BtnLeft=option.BtnLeft//左边点击按钮
        this.BtnRight=option.BtnRight//右边点击按钮
        this.lunboParent=option.lunboParent//轮播父元素
        this.num=null;//小圆点数量
        this.index=0;
        this.timer=null;
        this.smanum=3;//表示小轮播每个显示三个数据
    }
    init(){
        /* 首页大轮播效果 */
        if(this.type=='bigtype'){
              /* 有多少张图片添加多少个li元素 */
        this.dotRender()
        /* 添加所有的图片 */
        this.picRender();
       /* 3 设置小圆点切换 利用事件委托 */
       this.minLi.addEventListener('click',e=>{
            e=e||event;
            if(e.target.nodeName==='LI') this.dotHander(e.target);
       })
       /* 4左右按钮 点击切换效果 */
       this.BtnLeft.addEventListener('click',e=>{
        e=e||event;
        this.leftHander(e.target);
       })
       this.BtnRight.addEventListener('click',e=>{
        e=e||event;
        this.rightHander(e.target);
       })
       /* 5 首次自动轮播方法 */
       this.auto();
       /* 6 添加移入移除事件 改变定时轮播 */
       this.lunboParent.addEventListener('mouseover',()=>{
        clearInterval(this.timer);
       })
       this.lunboParent.addEventListener('mouseout',()=>{
        this.auto()
    })
        }
        /* 首页大轮播边上的小轮播 效果 */
        if(this.type=='bsmatype'){
            this.data=this.data.slice(0,9);
            this.num=(this.data.length/this.smanum);//获取li数量
             let str='';
            for(let i=0;i<this.num;i++){
                let data=this.data.slice(i*3,(i+1)*3);
                    str+=`<li>
                    <a href="http://localhost/jd/src/detail.html?id=${data[0].sid}">
                        <img src="${data[0].url}" alt="">
                    </a>
                    <a href="http://localhost/jd/src/detail.html?id=${data[1].sid}">
                        <img src="${data[1].url}" alt="">
                    </a>
    
    
                    <a href="http://localhost/jd/src/detail.html?id=${data[2].sid}">
                        <img src="${data[2].url}" alt="">
                    </a>
                </li>`;
            }
            this.big.innerHTML=str;
            this.big.children[0].style.opacity=1;
            this.auto()
            this.lunboParent.addEventListener('mouseover',()=>{
                this.BtnLeft.style.display= this.BtnRight.style.display='block';
                clearInterval(this.timer);
            })
            this.lunboParent.addEventListener('mouseout',()=>{
                this.BtnLeft.style.display= this.BtnRight.style.display='none';
                this.auto();
            })
            this.BtnLeft.addEventListener('click',()=>{
                this.leftHander();
            })
            this.BtnRight.addEventListener('click',()=>{
                this.rightHander();
            })
        }
       
    }
    /* 大图渲染方法 */
    picRender(){
        let str='';
        this.data.forEach(elm=>{
            str+=` <li>
            <a href="javacript:;">
                <img src="${elm.url}" alt="">
            </a>
        </li>`;
    })
        this.big.innerHTML=str;
        /* 默认第一个显示 */
        this.big.children[this.index].style.opacity=1;
    }
    /* 小圆点渲染方法 */
    dotRender(){
        this.num=this.data.length;
        let a='';
        for(let i=0;i<this.num;i++){
            a+='<li></li>'
        }
        this.minLi.innerHTML=a;
        this.minLi.children[this.index].className='active';
    }
    /* 小圆点点击方法 */
    dotHander(target){
        this.removeHander();
       if(target) this.index=Array.from(this.minLi.children).indexOf(target);
       this.big.children[this.index].style.opacity=1;
        if(this.type==='bigtype') this.minLi.children[this.index].className='active';
    }
    /* 左边按钮点击切换 */
    leftHander(){
       this.removeHander();
        this.index--;
        if(this.index<0){
            this.index=this.num-1;
        }
      this.dotHander();
    }
    /* 右边点击效果切换 */
    rightHander(){
        this.removeHander();
        this.index++;
        if(this.index>this.num-1){
            this.index=0;
        }
        this.dotHander();
    }
    /* 去上一个点击的效果 */
    removeHander(){
        this.big.children[this.index].style.opacity=0;
        if(this.type==='bigtype') this.minLi.children[this.index].className='';
    }
    /* 自动轮播方法 */
    auto(){
        this.timer=setInterval(()=>{
            this.rightHander();
        },3000)
    }
    smaoverHander(){
        this.BtnLeft.style.display= this.BtnRight.style.display='block';
    }
} 
/* 定义模块 */
define([],function(){
    return {
        Carousel  
    }
})