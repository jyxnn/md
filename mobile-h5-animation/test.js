/*
* @Author: wuna
* @Date:   2019-05-14 11:48:46
* @Last Modified by:   wuna
* @Last Modified time: 2019-05-15 18:16:24
*/
$(function(){
    var timmer = null;
    var mySwiper = new Swiper('.swiper-container',{
        // autoplay : 5000,
        // onlyExternal: true,
        onInit: function(swiper){ //Swiper3
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
            console.log(swiper.activeIndex+1);
        }, 
        onSlideChangeEnd: function(swiper){ 
            console.log('now',swiper.activeIndex+1);
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            var ifRandomSlide = (swiper.activeIndex - 2)%2;
            if(ifRandomSlide == 0 || swiper.activeIndex == 2){
                clearInterval(timmer);
                var textArr=['宅出一片天','中美贸易战','新的一天'];
                var index = 0;
                timmer = setInterval(function(){
                    index++;
                    if(index==3){
                        index=0;
                    }
                    $('.page3 .change').text(textArr[index]);
                }, 2000);
            }
            // 结果页  再玩一次
            var ifAddSlide = (swiper.activeIndex - 3)%2;
            if(ifAddSlide == 0 || swiper.activeIndex == 3){
                    var html1 = `<div class="swiper-slide page3 swiper-no-swiping">
                                    <div class="title ani" swiper-animate-effect="myAniTitle">标签</div>
                                    <div class="ul-box ani" swiper-animate-effect="myAniTitle">
                                        <ul>
                                            <li><span class="change">宅出一片天</span></li>
                                            <li><span class="">中美贸易战</span></li>
                                            <li><span class="">新的一天</span></li>
                                        </ul>
                                    </div>
                                    <div class="btn3 ani btn">停止</div>
                                </div>`;
                    var html2 = `<div class="swiper-slide page4 swiper-no-swiping">
                                    <div class="title ani" style="font-size:30px;" swiper-animate-effect="myAniTitle"></div>
                                    <div class="btn4 ani btn" swiper-animate-effect="myAniTitle">再玩一次</div>
                                </div>`
                    mySwiper.appendSlide([html1,html2]);
            }
        } 
    });

    $('.swiper-container').on('click','.btn2',function(){
        mySwiper.slideNext();
    })
    $('.swiper-container').on('click','.btn3',function(){
        console.log('点了停止');
        //记录前一页面选中的值
        var $txt = $('.page3 .change');
        var txt = $($txt[$txt.length-1]).text();
        $('.page4 .title').text(txt)
        mySwiper.slideNext();
    })
    $('.swiper-container').on('click','.btn4',function(){
        console.log('点了再玩一次');
        // 添加元素
        mySwiper.slideNext();
    })
    // 生成海报
    $('.btnCreate').click(function(){
        $('.haibao-box').show().html(canvasToImg($("#myCanvas")[0]))
        // var dom = $('.page1 ul').removeClass('ani');
        // html2canvas(document.querySelector("#copy")).then(canvas => {
            // $('.haibao-box').html(canvas)
            // document.body.appendChild(canvas);
        // });
    })
    
    // $('#bg-img').load(function(){
    //     console.log('load');
    //     canvasInit();
    // })
    canvasInit();
    function canvasInit(){
        var c=$("#myCanvas")[0];
        var ctx=c.getContext("2d");
        // 设置canvas的宽、高
        var w = $('body').width()*0.9;
        var h = $('body').height()*0.8;
        // 设置canvas的宽，只能js设置，否则会被拉伸
        c.width = w;
        c.height = h;
        // console.log('图片',$('#bg-img').width());
        ctx.drawImage($('#bg-img')[0],0,0,c.width,c.height);  // 图片铺满满屏
        ctx.fillStyle = '#fff';
        ctx.font="20px Arial";
        ctx.rotate(-10*Math.PI/180)
        ctx.fillText("宅出一片天",40,100);
        ctx.fillText("中美贸易战",40,135);
    }
    function canvasToImg(canvas){
        var image = new Image();
        // image.crossOrigin = 'anonymous'; // 不需要使用
        // 移动端报错SecurityError，因为canvas中有图片为别的域名下的
        image.src = canvas.toDataURL("image/png");
        console.log('img----',image.src);
        return image;
    }
})