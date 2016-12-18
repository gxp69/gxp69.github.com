/**
 * Created by Administrator on 2016/12/10.
 */
'use strict';
$(function(){
    //黑客
    (function(){
        var matrix=document.getElementById("matrix");

        var timer=null;

        var context=matrix.getContext("2d");
        matrix.height=window.innerHeight;
        matrix.width=window.innerWidth;
        var drop=[];
        var font_size=16;
        var columns=matrix.width/font_size;
        for(var i=0;i<columns;i++)
            drop[i]=1;

        function drawMatrix(){
            context.fillStyle="rgba(0, 0, 0, 0.1)";
            context.fillRect(0,0,matrix.width,matrix.height);

            context.fillStyle="green";
            context.font=font_size+"px";
            for(var i=0;i<columns;i++){
                context.fillText(Math.floor(Math.random()*2),i*font_size,drop[i]*font_size);/*get 0 and 1*/

                if(drop[i]*font_size>(matrix.height*2/3)&&Math.random()>0.85)/*reset*/
                    drop[i]=0;
                drop[i]++;
            }
        }
        timer=setInterval(drawMatrix,30);
        setTimeout(function(){
            clearInterval(timer);
            $(matrix).css({display:'none'});
        },3000)
    })();
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















});
