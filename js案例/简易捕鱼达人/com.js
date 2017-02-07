/**
 * Created by Administrator on 2017/1/9.
 */
var JSON=[];

function d2a(n){
    return n*Math.PI/180;
}
function a2d(n){
    return n*180/Math.PI;
}
function rnd(n,m){
    return Math.floor(Math.random()*(m-n)+n);
}

function loadImage(arr,fnSucc,fnLoading){
    var count=0;
    for(var i=0; i<arr.length; i++){
        var oImg=new Image();
        oImg.src='img/'+arr[i]+'.png';
        (function(index){
            oImg.onload=function(){
                JSON[arr[index]]=this;
                //console.log(this);
                count++;
                fnLoading&&fnLoading(count,arr.length);
                if(count==arr.length){
                    fnSucc&&fnSucc();
                }
            };
        })(i);
    }
}























