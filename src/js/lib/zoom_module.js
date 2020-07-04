/* 放大镜类 */
class Zoom{
    constructor(option){
        this.specUl=option.specUl;//五张图的父元素
        this.smImg=option.smImg;//需要放大的图
        this.moveBox=option.moveBox;//需要移动的图
        this.bigImgDiv=option.bigImgDiv;//放大后的图显示的区域
        this.bigImg=option.bigImg;//需要放大的图片
        this.prev=this.specUl.children[0];
        this.pot={};
    }
    init() {
        /* 1小图大图对应 tab切换 */
    
        this.specUl.addEventListener('click',(e)=>{
            e=e||event;
            this.liHander(e.target)
        })
        /* 第2步 遮罩显示 */
        this.smImg.parentNode.addEventListener('mouseover',(e)=>{
            e=e || event;
            this.overHander(e);
        });
        this.smImg.parentNode.addEventListener('mousemove', (e)=>{
            e=e||event;
            this.moveHander(e)
        });
        this.smImg.parentNode.addEventListener('mouseout', (e)=>{
            e=e||event;
            this.outHander(e);
        });
        
    }
    /* tab切换 换图 */
    liHander(target){
        /* 属性边框设置 */
        if(this.prev) this.prev.className="";
        this.prev=target.parentNode;
        this.prev.className='active';
        /* 所有图片同步 */
        this.bigImg.children[0].src=this.smImg.src=target.src;
        
    }
    /* 鼠标移入显示事件 */
    overHander(e){
        this.moveBox.style.display="block";
        this.bigImgDiv.style.display="block";
        this.pot.x=this.smImg.parentNode.offsetWidth/this.bigImg.offsetWidth;
        this.pot.y=this.smImg.parentNode.offsetHeight/this.bigImg.offsetHeight;
        this.moveBox.style.width= this.bigImgDiv.offsetWidth*this.pot.x + 'px';
        this.moveBox.style.height=this.bigImgDiv.offsetHeight*this.pot.y+ 'px';
    }
    /* 鼠标移入移动事件 */
    moveHander(e){
        /* 1 获取元素到可视窗口的位置和鼠标到可视窗口的位置 用于计算小图移动的距离*/
        let parents=this.smImg.parentNode.getBoundingClientRect();
        let moveBoxTop=e.clientY-parents.y-this.moveBox.offsetHeight/2;
        let moveBoxLeft=e.clientX-parents.x-this.moveBox.offsetWidth/2;
        /* 2 约束movbox 的移动范围  */
        if(moveBoxTop<=0){
            moveBoxTop=0;
        }
        if(moveBoxTop>=this.smImg.parentNode.offsetHeight-this.moveBox.offsetHeight){
            moveBoxTop=this.smImg.parentNode.offsetHeight-this.moveBox.offsetHeight;
        }
        if(moveBoxLeft<=0){
            moveBoxLeft=0;
        }
        if(moveBoxLeft>=this.smImg.parentNode.offsetWidth-this.moveBox.offsetWidth){
            moveBoxLeft=this.smImg.parentNode.offsetWidth-this.moveBox.offsetWidth;
        }
        /* 3设置 movebox的位置 */
        this.moveBox.style.top=moveBoxTop+'px';
        this.moveBox.style.left=moveBoxLeft+'px';
        /* 4设置大图移动 */
        this.bigImg.style.top=-moveBoxTop/this.pot.x+'px';
        this.bigImg.style.left=-moveBoxLeft/this.pot.y+'px';
    }
     /* 鼠标鼠标离开事件事件 */
    outHander(e){
        this.moveBox.style.display="none";
        this.bigImgDiv.style.display="none";
    }
}
define([],function(){
    return{
        Zoom
    }
})