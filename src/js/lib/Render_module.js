/* 渲染类 */
define(['./ajax_module','./paging_module','./detail_module','./catRenderCount','./carousel_module','./slide_module'], function (oAjax,paging,det,cat,carousel,slid) {
    class Render {
        constructor(option) {
            this.parent = option.parent;//渲染的父元素
            this.type = option.type;//请求的方式
            this.baseUrl = 'http://localhost/jd';//公共接口片段
            this.url = option.url;//接口
            this.kind=option.kind;//b判断渲染类型
            this.renderItem=option.renderItem;//在当前文件下实例需要的参数
            this.ajaxData=option.ajaxData;//发送ajax数据携带的参数
        }
        //初始函数
        init() {
            //  1.发送ajax请求 
            let that = this;//存储this
            oAjax.ajax({
                type: this.type,
                url: this.baseUrl + this.url,
                data: this.ajaxData ? this.ajaxData : null,
                success: function (date) {

                    //在当前文件下实例需要参数,将数据赋值给对象 传出去渲染
                    if(that.renderItem){
                        that.renderItem.data=date;
                    }

                    /* 渲染购物车页面 */
                    if(that.kind==='cat'){
                        that.renderItem.parent=that.parent;
                        new cat.Cat(that.renderItem ).init();
                    }
                    /* 渲染详情页 */
                    if(that.kind==='detaildata'){
                        /* 渲染页面 */
                        that.renderItem.sid=that.ajaxData.id;
                        new det.Detail (that.renderItem).init();
                        
                    }
                    
                     /* 首页为你推荐渲染 */
                    if(that.kind==='feedList'){
                        let str = '';
                        date.forEach(element => {
                            str += `
                     <li>
                          <a href="http://localhost/jd/src/detail.html?id=${element.sid}">
                                     <div class="feed_list_img">
                                         <img src="${element.url}" alt="" data-src="${element.url}">
                                     </div>
                                     <div class="feed_list_p">
                                         <p>${element.title}</p>
                                    
                                     </div>
                                     <div class="feed_list_pic">
                                         <i>¥</i>
                                         <span>${element.price}.</span>
                                         <span>00</span>
                                 </div>
                                 </a>
                             </li>
                     `;
    
                        });
                        that.parent.innerHTML = str;    
                    }
                   /* 列表页渲染 */ 
                   if(that.kind==='list'){
                    new paging.Pag(that.renderItem).init()
                   }
                   /* 轮播渲染以及轮播效果*/
                   if(that.kind==='carousel'){
                       new carousel.Carousel(that.renderItem).init();
                   }
                   /* 点击滑动轮播图渲染以及效果 */
                   if(that.kind==='sli'){
                    new slid.Slide(that.renderItem).init();
                }
                }
            })
            /* 2懒加载监听滚动事件 */
        }

        //2 懒加载
        lazy() {
            /* 获取每个li到document的距离=滚动过的距离时就把li里面的img的data-src的属性值赋值给src，赋值后删除data-src属性 */
        }
    }

    return {
        Render
    }
})