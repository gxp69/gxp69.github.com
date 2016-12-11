/**
 * 运动框架
 * Created by zhanghaibin on 2016/11/11.
 */


function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
    }
}

function move(obj,json,options){
    clearInterval(obj.timer);
    var options = options || {};
    var duration = options.duration || 500;
    var easing = options.easing || 'linear';
    //开始位置
    var start = {};
    //距离
    var dis = {};
    for(var name in json){
        //name   'width' 'height'
        //json[name] 400   400
        start[name] = parseFloat(getStyle(obj,name));
        if(name == 'opacity' && !obj.addEventListener){
            start[name] *= 100;
            json[name] *=100;
        }
        dis[name] = json[name] - start[name];

    }

    //总次数
    var count = Math.floor(duration / 30);
    var n = 0; //当前次数
    obj.timer = setInterval(function(){
        n++;

        for(var name in json){
            switch (easing){
                case 'linear':
                    var a = n/count;
                    var current = start[name] + dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var current = start[name] +  dis[name] * a*a*a;
                    break;
                case 'ease-out':
                    var a = 1 - n / count;
                    var current = start[name] +  dis[name] * (1-a*a*a);
                    break;
            }
            if(name == 'opacity'){
                obj.style.opacity =current;
                if(!obj.addEventListener){
                    obj.style.filter = 'alpha(opacity='+ current +')';
                }
            }
            else{
                obj.style[name] = current + 'px';
            }
        }

        if(n == count){
            clearInterval(obj.timer);
            options.complete && options.complete();

        }
    },30);
}
