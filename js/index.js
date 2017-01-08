/**
 * Created by Administrator on 2016/12/10.
 */
'use strict';
$(function(){
    //菜单
    (function(){
        var oNav=document.getElementById('navigation');
        var aLi=oNav.getElementsByTagName('li');
        var left=0;
        var width=124;
        for(var i=0; i<aLi.length; i++){
            aLi[i].onmouseenter=function(){
                aLi[4].style.width=this.offsetWidth + 'px';
                move(aLi[4],{left:this.offsetLeft})
            };
            aLi[i].onmouseleave=function(){
                aLi[4].style.width=width + 'px';
                move(aLi[4],{left:left})
            };
            aLi[i].onclick=function(){
                left=this.offsetLeft;
                width=this.offsetWidth;
                aLi[4].style.width=width + 'px';
                move(aLi[4],{left:left})
            };
        }
    })();

    //静态页
    (function(){
        $('#carousel ul')[0].innerHTML+=$('#carousel ul')[0].innerHTML;
        //改变ul宽
        $('#carousel ul').css('width',$('#carousel ul li').length*$('#carousel ul li').eq(1).width());

        var iNow=0;
        $('#carousel .index-number a').each(function(index,element){
            $(element).click(function(){
                if(iNow>=0&&iNow<=7){
                    iNow=$(this).index();
                }else{
                    iNow=$(this).index()+8;
                }
                tab();
            });
        });
        $('#carousel #prev').click(function(){
            iNow--;
            tab();
        });
        $('#carousel #next').click(function(){
            next();
        });

        setInterval(function(){
            next();
        },3000);
        function next(){
            iNow++;
            tab();
        }

        function tab(){
            if(iNow==16){
                iNow=8;
                $('#carousel ul').css({'left':-(iNow-1)*$('#carousel ul li').eq(1).width()});
                tab2();
            }else if(iNow<0){
                 iNow=7;
                $('#carousel ul').css({'left':-(iNow+1)*$('#carousel ul li').eq(1).width()});
                tab2();
            }else{
                tab2();
            }
            $('#carousel .index-number a').eq(iNow%8).addClass('active').siblings('a').removeClass('active');
            function tab2(){
                $('#carousel ul').stop().animate({'left':-iNow*$('#carousel ul li').eq(1).width()});
            }
        }
    })();

    //js案例
    (function(){
        function getDir(obj,ev){
            var x = $(obj).offset().left + $(obj).outerWidth()/2 - ev.clientX;
            var y = $(obj).offset().top-$(document).scrollTop() + $(obj).outerHeight()/2 - ev.clientY;
            return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
        }
        function through(obj){
            var oImg=obj.children[0].children[0];
            var oLi=obj.children[0].children[1];
            $(obj).mouseenter(function(ev){
                var dir = getDir(obj,ev);
                switch(dir){
                    case 0:
                        $(oLi).css({
                            left:300,
                            top:0
                        });
                        break;
                    case 1:
                        $(oLi).css({
                            left:0,
                            top:200
                        });
                        break;
                    case 2:
                        $(oLi).css({
                            left:-300,
                            top:0
                        });
                        break;
                    case 3:
                        $(oLi).css({
                            left:0,
                            top:-200
                        });
                        break;
                }
                $(oLi).stop().animate({left:0,top:0});
                $(oImg).stop().animate({width:320,height:213,marginLeft:-10,marginTop:-5},50)
            });
            $(obj).mouseleave(function(ev){
                var dir = getDir(obj,ev);
                switch(dir){
                    case 0:
                        $(oLi).stop().animate({left:300,top:0});
                        break;
                    case 1:
                        $(oLi).stop().animate({left:0,top:200});
                        break;
                    case 2:
                        $(oLi).stop().animate({left:-300,top:0});
                        break;
                    case 3:
                        $(oLi).stop().animate({left:0,top:-200});
                }
                $(oImg).stop().animate({width:300,height:200,marginLeft:0,marginTop:0},50)
            });
        }
        $('.index_js_list ul li').each(function(index,ele){
            through(ele);
        });
    })();

    //换页
    (function(){
        var aBtn=$('.index_js_list .page a');
        var aPage=$('.index_js_list .js_list ul');
        var iNow=0;
        var old=0;
        var bOk=false;
        //存ul li数据
        $(aPage).each(function(index,ele){
            $(ele).css({width:$(ele).outerWidth(),height:$(ele).outerHeight()})
        });
        var Pos=[];
        $('.index_js_list ul.active li').each(function(index,ele){
             Pos[index]={left:$(ele).position().left,top:$(ele).position().top}
        });
        $('.index_js_list ul').each(function(index,ele){
            $(ele.children).each(function(index,ele){
                $(ele).css({left:Pos[index].left,top:Pos[index].top,position:'absolute'})
            });
        });
        //加点击事件
        for(var i=1; i<aBtn.length-1; i++){
            aBtn[i].index=i;
            aBtn[i].onclick=function(){
                if(bOk){return;}
                bOk=true;
                iNow=this.index-1;
                tab();
            };
        }
        //前一页
        aBtn[0].onclick=function(){
            if(bOk){return;}
            bOk=true;
            iNow--;
            if(iNow<0)iNow=aBtn.length-3;
            tab();
        };
        //后一页
        aBtn[aBtn.length-1].onclick=function(){
            if(bOk){return;}
            bOk=true;
            iNow++;
            if(iNow==aBtn.length-2)iNow=0;
            tab();
        };
        function tab(){
            $(aBtn).eq(iNow+1).addClass('active').siblings().removeClass('active');
            var aLi=aPage[old].children;
            var aLi2=aPage[iNow].children;
            var i=0;
            var n=8;
            function next(){
                $(aLi).eq(i).stop().animate({
                    top:700,left:500,width:0,height:0,opacity:0
                },100,function(){
                    i++;
                    function next2(){
                        $(aLi2).eq(n).stop().animate({
                            top:Pos[n].top,
                            left:Pos[n].left,
                            width:300,
                            height:200,
                            opacity:1
                        },100,function(){
                            n--;
                            if(n<0){
                                old=iNow;
                                bOk=false;
                                return;
                            }
                            next2();
                        })
                    }
                    if(i==aLi.length){
                        $(aPage).eq(iNow).addClass('active').siblings().removeClass('active');
                        $(aLi2).each(function(index,ele){
                            $(ele).css({top:700,left:500,width:0,height:0,opacity:0})
                        });
                        next2();
                    }
                    next();
                })
            }
            next();
        }
    })();
    //简介swiper
    (function(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            effect: 'cube',//切换效果‘方块’
            grabCursor: true,//小手
            cube: {
                shadow: true,//开启投影。默认 true。
                slideShadows: true,//开启slide阴影。默认 true。
                shadowOffset: 20,//投影距离。默认 20，单位px。
                shadowScale: 0.94//投影缩放比例。默认0.94。
            }
        });
    })();
    //画布
    (function(){
        var oC=$('canvas')[0];
        var winW=$(window).width();
        var winH=$(window).height();
        oC.width=winW;
        oC.height=winH;
        oC.style.zIndex='2';
        var gd=oC.getContext('2d');

        function drawPoint(x,y,r){
            gd.beginPath();
            gd.fillStyle='rgba(255,255,255,1)';
            gd.arc(x,y,r,d2a(0),d2a(360),false);
            gd.fill();
        }
        //创建
        var all=[];
        setInterval(function(){
            var N=20;
            var aPoint=[];
            for(var i=0; i<N; i++){
                var x=rnd(0,winW);
                var r=rnd(1,5);
                var iSpeedY=Math.random()*(0.5-0.1)+0.1;
                var y=0;
                aPoint[i]={
                    x:x,
                    r:r,
                    s:iSpeedY,
                    y:y
                };
                drawPoint(x,y,r);
            }
            all.push(aPoint);
            if(all.length>20){
                all.shift();
            }
        },1000);

        //运动

        setInterval(function(){
            gd.clearRect(0,0,winW,winH);
            for(var j=0; j<all.length; j++){
                for(var i=0; i<all[j].length; i++){
                    var opacity=j/all.length;
                    all[j][i].y+=all[j][i].s;
                    gd.beginPath();
                    gd.fillStyle='rgba(255,255,255,'+opacity+')';
                    gd.arc(all[j][i].x,all[j][i].y,all[j][i].r,d2a(0),d2a(360),false);
                    gd.fill();
                }
            }


        },16)
    })();
    //返回顶部
    (function(){
        var oTop=$('.back-top');
        $(window).on('risize scroll load',function(){
            if($(document).scrollTop()>0){
                oTop.css({
                    opacity:1
                });
                oTop.on('transitionend',end);
            }else if($(document).scrollTop()==0){
                oTop.css({
                    transition:'.5s all ease',
                    opacity:0
                });
                oTop.on('transitionend',end);
            }
        });

        function end(){
            oTop.css({
                transition:'none'
            });
            oTop.off('transitionend',end,false);
        }
        var timer=null;
        oTop.click(function(){
            timer=setInterval(function(){
                var oT=$(window).scrollTop();
                $(window).scrollTop(oT-15);
                if(oT<=0){
                    $(window).scrollTop(0);
                    clearInterval(timer);
                }
            },16);

        })
    })();















});
