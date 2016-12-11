/**
 * Created by zhanghaibin on 2016/11/3.
 */

'use strict';

//随机数 n-m
function rnd(n,m){
    return parseInt(Math.random() * (m - n)) + n;
}

//在一个数组中找一个数是否存在
function findInArray(n,arr){
    for(var i = 0; i<arr.length;i++){
        if (n == arr[i]){
            return true;
        }
    }
    return false;
}
//变成两位数
function toDou(n){
    return n < 10 ? '0'+n : ''+n;
}

//获取计算后的样式（兼容所有浏览器）
function getStyle(obj,name){
    return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
//通过样式名获得元素
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }
    else{
        var arr = [];
        var aElt = oParent.getElementsByTagName('*');
        for (var i = 0; i < aElt.length; i++){
            var arr2 = aElt[i].className.split(' ');
            if(findInArray(arr2,sClass)){
                arr.push(aElt[i]);
            }
        }
        return arr;
    }
}
//事件绑定
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }
    else{
        obj.attachEvent('on'+sEv,fn)
    }
}
//事件解绑定
function removeEvent(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }
    else{
        obj.detachEvent('on'+sEv,fn);
    }

}

function domReady(fn) {
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){
            fn && fn();
        },false);
    }
    else{
        document.attachEvent('onreadystatechange',function(){
            //加载状态
            if(document.readyState == 'complete'){
                fn && fn();
            }
        });
    }
}

//碰撞检测
function collTest(obj1,obj2){
    var l1 = obj1.offsetLeft;
    var r1 = l1 + obj1.offsetWidth;
    var t1 = obj1.offsetTop;
    var b1 = t1 + obj1.offsetHeight;

    var l2 = obj2.offsetLeft;
    var r2 = l2 + obj2.offsetWidth;
    var t2 = obj2.offsetTop;
    var b2 = t2 + obj2.offsetHeight;

    if(r1>l2 && l1<r2 && b1 > t2 && t1 < b2){
        return true;
    }
    else{
        return false;
    }
}
//距离
function getPos(obj){
    var l = 0;
    var t = 0;
    while(obj){
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left:l,top:t};
}



















