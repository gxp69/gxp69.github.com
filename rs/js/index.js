/**
 * Created by Administrator on 2016/12/22.
 */
'use strict';
$(function(){
    //跨域
        //媒体合作
        (function(){
            $.ajax({
                url:"http://boss.shopcmd.com/boss/website/websiteCase.do",
                data:"site=3&_=1482457578576",
                dataType: 'jsonp',
                success:function(data){
                    //console.log(data.data.content[1]);
                    //http://hycloudshop.img-cn-hangzhou.aliyuncs.com/hycloudshop/2016/05/23/1463972756600588.png
                    var re=data.data.content;
                    for(var i=0; i<re.length; i++){
                        $('.media_all img').eq(i).attr({_src:'http://hycloudshop.img-cn-hangzhou.aliyuncs.com/'+re[i].logo,alt:re[i].webName});
                        $('.media_all a').eq(i).attr('href',re[i].webAddress)
                    }
                }
            });
        })();
        //案例
        (function(){
            $.ajax({
                url:"http://boss.shopcmd.com/boss/website/websiteCase.do",
                data:"site=1&_=1482465937350",
                dataType:'jsonp',
                success:function(data){
                    var re=data.data.content;
                    //console.log(re[0])
                    for(var i=0; i<re.length; i++){
                        $('.clearR a').eq(i).attr('href',re[i].webAddress);
                        $('.clearR img').eq(i).attr({
                            _src:'http://hycloudshop.img-cn-hangzhou.aliyuncs.com/'+re[i].logo,
                            alt:re[i].webName
                        });
                        $('.clearR p').eq(i).html(re[i].webName)
                    }
                }
            })
        })();
        //常见问题
        (function(){
        $.ajax({
            url:"http://boss.shopcmd.com/boss/website/getFaqInfoList.do",
            data:"_=1482466926738",
            dataType:'jsonp',
            success:function(data){
                var re=data.data;
                //console.log(re[0])
                for(var i=0; i<re.length; i++){
                    $('.questionList dd').eq(i).html(re[i].title)
                }
            }
        })
    })();

    //图片懒加载
    load();
    window.onresize=window.onscroll=function(){
        load();
    };
    function load(){
        $('img').each(function(index,ele){
            if($(ele).offset().top<=($(window).height()+$(document).scrollTop())){
                $(ele).attr('src',$(ele).attr('_src'));
            }
        })
    }

    //car
    (function(){
        $('.car').mouseenter(function(){
            $('.car ul').css('display','block');
            $('.car ul').stop().animate({opacity:1})
        });
        $('.car').mouseleave(function(){
            $('.car ul').css('display','none');
            $('.car ul').stop().animate({opacity:0})
        })
    })();
    //轮播图
    (function(){
        //ul li宽
        $('.carousel ul li').css({width:$(window).width()});
        //ul*2
        $('.carousel ul')[0].innerHTML+= $('.carousel ul')[0].innerHTML;
        //ul加宽
        $('.carousel ul').css({width:$('.carousel ul li').length*$('.carousel ul li').eq(1).outerWidth()});
        var iNow=0;
        var l=$('.carousel ul li').length;
        $('.carousel ol li').each(function(index,ele){
            $(ele).click(function(){
                if(iNow>=0&&iNow<l/2){
                    iNow=index;
                }else{
                    iNow=index+l/2
                }
                tab();
            })
        });
        function tab(){
            $('.carousel ol li').eq(iNow%3).addClass('active').siblings().removeClass('active');
            $('.carousel ul').stop().animate({left:-iNow*$('.carousel ul li').eq(0).outerWidth()})
        }
        setInterval(function(){
            iNow++;
            if(iNow==l){
                iNow=l/2
            }
            $('.carousel ul').css({left:-(iNow-1)*$('.carousel ul li').eq(0).outerWidth()});
            tab();
        },3000)
    })();
     //案例
    (function(){
        //移入移出
         $('.bx-wrapper li').each(function(index,ele){
             $(ele).mouseenter(function(){
                 $('.bx-wrapper img').eq(index).stop().animate({width:344,marginLeft:-10,marginTop:-8});
                 $('.trans_d').eq(index).css({display:'block'})
             });
             $(ele).mouseleave(function(){
                 $('.bx-wrapper img').eq(index).stop().animate({width:324,marginLeft:0,marginTop:0});
                 $('.trans_d').eq(index).css({display:'none'})
             })
         });
        //轮换
        var l=$('.bx-wrapper ul li').length;
        var w=$('.bx-wrapper ul li').eq(0).outerWidth()+40;
        var iNow=0;
        var left=0;
        $('.bx-wrapper ul').css({width:l*w});
        $('.next').click(function(){
            iNow++;
            left=iNow*(3*w);
            if(left>l*w-$('.clearR').outerWidth()){
                left=l*w-$('.clearR').outerWidth();
                iNow--;
                $('.next').css('backgroundPosition','0 -180px');
            }
            $('.prev').css('backgroundPosition','0 -60px');
            $('.bx-wrapper ul').stop().animate({left:-left})
        });
        $('.prev').click(function(){
            iNow--;
            if(left==l*w-$('.clearR').outerWidth()){
                iNow++;
                left=(iNow)*(3*w);
                $('.bx-wrapper ul').stop().animate({left:-left});
            }else if(iNow<0){
                iNow=0;
                return;
            }else{
                $('.bx-wrapper ul').stop().animate({left:-iNow*(3*w)})
            }
            if(iNow==0){
                $(this).css('backgroundPosition','0 0');
            }
            $('.next').css('backgroundPosition','0 -120px');
        })
    })();



});




