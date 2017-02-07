/**
 * Created by Administrator on 2016/12/22.
 */
$(function(){
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
    //亮点
    (function(){
        $('.lights img').each(function(index,ele){
            $(ele).mouseenter(function(){
                $(this).stop().animate({width:120,marginTop:4,marginLeft:42,marginBottom:26})
            });
            $(ele).mouseleave(function(){
                $(this).stop().animate({width:128,marginTop:0,marginLeft:38,marginBottom:22})
            })
        })
    })();

    //案例
    (function(){
        //移入移出
        $('.bx-wrapper li').each(function(index,ele){
            $(ele).mouseenter(function(){
                $('.bx-wrapper img').eq(index).stop().animate({width:344,height:226,marginLeft:-10,marginTop:-8});
                $('.trans_d').eq(index).css({display:'block'})
            });
            $(ele).mouseleave(function(){
                $('.bx-wrapper img').eq(index).stop().animate({width:324,height:210,marginLeft:0,marginTop:0});
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
    //跨域
    (function(){
        $.ajax({
            url:"http://boss.shopcmd.com/boss/website/websiteCase.do",
            data:"site=2&_=1482468410215",
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






});
