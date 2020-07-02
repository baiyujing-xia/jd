let baseUrl='http://localhost/jd';
require(['./lib/ajax_module','./lib/cookie_module'],function(m1,m2){
    let pImg=document.querySelector('.cat-list');
    let txt=document.querySelector('.sum');
     let shop=m2.get('shop');
     let sum=0;
        if(shop){
            shop=JSON.parse(shop);
            let idlist=shop.map(element =>element.id).join();
            m1.ajax({
                type:'get',
                url:`${baseUrl}/php/shop.php`,
                data:{
                    idlist:idlist,
                },
                success:function(date){
                    let str='';
                    date.forEach((element,index) => {
                        str+=`
                    <div class="list-item">
                        <div class="cell p-checkbox">
                            <input type="checkbox" class="radio">
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
                                <a href="javascript:void(0)" class="f">-</a>
                                <input type="text" value="${shop[index].num}">
                                <a href="javascript:void(0)" class="c">+</a>
                            </div>
                            <div class="ac">有货</div>
                        </div>
                        <div class="cell p-sum">
                            <span>¥</span><span>${shop[index].num*element.price}</span>
                        </div>
                        <div class="cell p-ops">
                            <span>删除</span>
                            <a href="">移到我的关注</a>
                        </div>
                    </div>
                    `;
                    sum+=shop[index].num*element.price;
                    });
                    txt.innerHTML=sum.toFixed(2);
                    pImg.innerHTML=(str);
                    if(sum) checkHander();
                }
            })
        }
        let that={};
        function checkHander(){
            let allCheck=document.getElementById('all-check');
            let  radio=document.querySelectorAll('.radio');
            that.elem=radio;
            allCheck.addEventListener('click',lisCheck);
        }
        function lisCheck(){
            if(this.checked){
                that.elem.checked='checked';
            }
                
                console.log(this.checked,that.elem.checked);
        }
});