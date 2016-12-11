/**
 * Created by Administrator on 2016/12/10.
 */
'use strict';
$(function(){
    //菜单
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
    //css
    //改变ul宽
    $('#carousel ul').css('width',$('#carousel ul li').length*$('#carousel ul li').eq(1).width());

    var iNow=0;
    $('#carousel .index-number a').each(function(index,element){
        $(element).click(function(){
            iNow=$(this).index();
            tab();
        });
    });
    $('#carousel #prev').click(function(){
        iNow--;
        if(iNow<0)iNow=$('#carousel ul li').length-1;
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
        if(iNow==$('#carousel ul li').length)iNow=0;
        tab();
    }
    function tab(){
        $('#carousel .index-number a').eq(iNow).addClass('active').siblings('a').removeClass('active');
        $('#carousel ul').stop().animate({'left':-iNow*$('#carousel ul li').eq(1).width()})
    }
    //js案例
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














});
