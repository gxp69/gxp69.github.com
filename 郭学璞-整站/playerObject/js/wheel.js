/**
 * Created by zhanghaibin on 2016/11/10.
 */
function addWheel(obj,fn){
    //加事件
    function addEvent(obj,sEv,fn){
        if(obj.addEventListener){
            obj.addEventListener(sEv,fn,false);
        }
        else{
            obj.attachEvent('on'+sEv,fn);
        }
    }
    function wheel(ev){
        var oEvent = ev || event;
        //存一下，是否向下
        var bDown = oEvent.wheelDelta?(oEvent.wheelDelta<0) : (oEvent.detail>0);
        //已知了滚动方向，可以做些事情了
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;

    }
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
        addEvent(obj,'DOMMouseScroll',wheel)

    }else{
        addEvent(obj,'mousewheel',wheel);
        //obj.onmousewheel = wheel;

    }
}








