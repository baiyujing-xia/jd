
define(['./Render_module'], function (Ren) {
    class Feed {
        constructor(option) {
            this.feedListUl = option.feedListUl//获取ul元素
            this.footheight = option.footheight//获取尾部元素高度
            this.fHeight = this.footheight.offsetHeight;//底部长度
            this.page=0;

        }
        init() {
            // 滚动条已滚动的距离+窗口高度 === 文档高度
            window.that=this;
            window.addEventListener('scroll',this.scrollHander);
            window.addEventListener('resize',this.scrollHander);
          
        }
        scrollHander() {
            let scrollTop = document.documentElement.scrollTop; //滚动条滚动的距离
            let documentHeight = document.documentElement.clientHeight;
            let windowHeight = document.documentElement.offsetHeight;
            if (scrollTop + documentHeight >= windowHeight - this.that.fHeight-50) {
               /*  if(scrollTop + documentHeight>= windowHeight - this.that.fHeight){
                    this.that.page==null;
                    window.removeEventListener('scroll', this.that.scrollHander);
                    window.removeEventListener('resize', this.that.scrollHander);
                } */
                this.that.page++;
                this.that.feedRender();
            }
        }
        
        feedRender() {
            new Ren.Render({
                parent: this.feedListUl,//渲染的父元素
                type: 'get',//请求的方式
                url: '/php/getpage.php',//接口
                ajaxData:{
                    page:this.page
                },
                kind: 'feedList'//类型
            }).init();
        }
    }
    return {
        Feed
    }
})