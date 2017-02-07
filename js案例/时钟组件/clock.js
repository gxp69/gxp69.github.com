addEventListener('DOMContentLoaded',function(){




    function d2a(n){
        return n*Math.PI/180;
    }

    function Clock(cl,index){
        if(!cl)return;
        this.oCa=document.getElementsByClassName(cl)[index];
        this.gd=this.oCa.getContext('2d');

        this.cx=200;
        this.cy=200;
        this.oDate=0;
        this.h=0;
        this.m=0;
        this.s=0;
        this.ms=0;
        this.move();
    }
    Clock.prototype.move=function(){
        this.clock(this.gd);
        var _this=this;
        setInterval(function(){
            _this.clock(_this.gd);
        },16);
    };

    Clock.prototype.draw=function(gd,start,end,r,color){
        start=start-90;
        end=end-90;

        gd.beginPath();
        gd.lineWidth=20;
        gd.strokeStyle=color||'#000';
        gd.arc(this.cx,this.cy,r,d2a(start),d2a(end),false);
        gd.stroke();
    };

    Clock.prototype.clock=function(gd){
        gd.clearRect(0,0,this.oCa.width,this.oCa.height);
        this.oDate=new Date();
        this.h=this.oDate.getHours();
        this.m=this.oDate.getMinutes();
        this.s=this.oDate.getSeconds();
        this. ms=this.oDate.getMilliseconds();

        this.draw(gd,0,this.s*6+this.ms/1000*6,120,'#f00');
        this.draw(gd,0,this.m*6+this.s/60*6,100,'#399');
        this.draw(gd,0,this.h%12*30+this.m/60*30,80,'yellow');

        gd.beginPath();
        gd.lineWidth=1;
        gd.strokeStyle='#000';
        gd.textAlign='center';
        gd.textBaseline='middle';
        gd.font='30px 楷体';
        gd.fillText('时钟',200,180);

        gd.beginPath();
        gd.fillText(this.h+':'+this.m+':'+this.s,200,210);
    };

    var aC=document.getElementsByClassName('can');
    for(var i=0; i<aC.length; i++){
        new Clock('can',i);
    }


},false);









