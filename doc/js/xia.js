/**
 * Created by Administrator on 2016/12/19.
 */
'use strict';
$(function(){
    $(window).resize(function(){
        document.documentElement.style.fontSize=document.documentElement.clientWidth/3.75+'px';
    });
    document.documentElement.style.fontSize=document.documentElement.clientWidth/3.75+'px';
    $('.g_three .g_video')[0].onTouchStart=$('.g_three .g_video')[0].onclick=function(){
        $('.g_three video')[0].play();
        $('.g_three video').siblings().hide();
    };
    $('.btn').click(function(){
        $('.l_big').css('display','block')
    });
    $('.btn2').click(function(){
        $('.l_big').css('display','none')
    });
    $('.l_big ul li').eq(0).click(function(){
        $('.l_big').css('display','none')
    });
    $('.l_big ul li').eq(2).click(function(){
        $('.l_big').css('display','none')
    });
    var swiper = new Swiper('.swiper-container', {
        scrollbar: '.swiper-scrollbar',
        scrollbarHide: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        grabCursor: true
    });

});

