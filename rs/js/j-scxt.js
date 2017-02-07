
/*$(function () {
    //inow = 在a1里找.active的位置
    var iNow = $('.header .nav .active').index('.a1');
    $('.header .nav li a').mouseover(function () {
        $(this).css({'color':'#0b95ed'});
    });
    $('.header .nav li a').mouseout(function () {
        if(iNow != $(this).index(".a1")){
            $(this).css({'color':'#000'});
        }
    });
});*/

window.onload = function () {
    var oul = document.getElementById('ul01');
    var aa = oul.getElementsByTagName('a');
    var adiv = document.getElementsByClassName('show');
    var ayd = document.getElementsByClassName('yd');
    var oul2 = document.getElementById('ul02');
    var aa2 = oul2.getElementsByTagName('a');
    var oul3 = document.getElementById('ul33');
    var ali = oul3.getElementsByTagName('li');
    //导航
    for(var i=0; i<aa.length; i++){
        aa[i].onmouseover = function () {
            for(var i=0; i<aa.length; i++){
                if(i!=3){
                    aa[i].style.color = '#000';
                }
            }
            this.style.color = '#0b95ed';
        };
        aa[i].index = i;
        aa[i].onmouseout=function () {
            if(this.index !=3){
                this.style.color = '#000';
            }
        }
    }
    //移动
    for(var i = 0;i<adiv.length;i++){
        adiv[i].onmouseover = function () {
            move(this.children[0],{left:-260})
        };
        adiv[i].onmouseout = function () {
            move(this.children[0],{left:0})
        };
    }
    //移动02
    for(var i=0; i<ali.length; i++){
        ali[i].index = i;
        ali[i].onmouseenter = function () {
            move(ayd[this.index],{top:-30})
        };
        ali[i].onmouseleave = function () {
            move(ayd[this.index],{top:70})
        };
    }
    //导航02
    for(var i=0; i<aa2.length; i++){
        aa2[i].onmouseover = function () {
            for(var i=0; i<aa2.length; i++){
                aa2[i].style.color = '#fff';
            }
            this.style.color = '#0b95ed';
        };
        aa2[i].onmouseout = function () {
            this.style.color = '#fff';
        }
    }
};

