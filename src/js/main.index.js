let baseUrl='http://localhost/jd';
require(['./lib/index_module','./lib/ajax_module','./lib/cookie_module'],function(m1,m2,m3){
   let login=document.querySelector('.lore>.login');
   let loginame=document.querySelector('.user_show>a');
   let car=document.querySelector('.car>b');
    m2.ajax({
       type:'get',
       url:`${baseUrl}/php/getall.php`,
       success:function(date){
        let ul=document.querySelector('.feed_list>ul');
        let str='';
        date.forEach(element => {
            str+=`
            <li>
                 <a href="http://localhost/jd/src/detail.html?id=${element.sid}">
                            <div class="feed_list_img">
                                <img src="${element.url}" alt="">
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
        ul.innerHTML+=str;
       }
   })
   if(m3.get('username')){
    login.innerHTML=`你好,${m3.get('username')}`;
    loginame.innerHTML=`${m3.get('username')},欢迎逛京东!`;
   }
   let sum=0;
   if(m3.get('shop')){
    JSON.parse(m3.get('shop')).forEach(elm=>{
        sum+=parseInt(elm.num);
      })
      car.innerHTML=sum;
   }
});