/**
 * Created by Administrator on 2016/11/14.
 */
function pan(){
    var oRoll = document.getElementById('rollBox');
    var oMain = oRoll.nextElementSibling || oRoll.nextSibling;
    var oBar = oRoll.children[0];
    if(oMain.offsetHeight<(oRoll.parentNode.offsetHeight)){
        oBar.style.display = 'none';
    }
    else{
        oBar.style.display = 'block';
        oBar.style.height= 700*(oRoll.parentNode.offsetHeight/oMain.offsetHeight)+'px';
    }
}
domReady(function(){
    //滚动条
    function bar(oRoll,oMain){
        var oBar = oRoll.children[0];
        var oUp = oRoll.children[1];
        var oDown = oRoll.children[2];
        oBar.style.height= 700*(oRoll.parentNode.offsetHeight/oMain.offsetHeight)+'px';
        addWheel(oRoll.parentNode,function(bDown){
            var t = oBar.offsetTop;
            if(bDown){
                t+=10;
            }
            else{
                t-=10;
            }
            setTop(t);
        });
        function setTop(t){
            if(t<=0){t=0}
            if(t>(oRoll.offsetHeight-oDown.offsetHeight-oBar.offsetHeight)){
                t= oRoll.offsetHeight -oDown.offsetHeight-oBar.offsetHeight;
            }
            var scale = t/(oRoll.offsetHeight -oDown.offsetHeight-oBar.offsetHeight);
            var t2 = oMain.offsetHeight - oRoll.parentNode.offsetHeight;
            oBar.style.top = t + 'px';
            oMain.style.top = -t2*scale +'px';
        }
        oBar.onmousedown = function(ev){
            var oEvent = ev || event;
            var disY = oEvent.clientY - getPos(oBar).top;
            document.onmousemove = function(ev){
                var oEvent = ev || event;
                var t = oEvent.clientY - disY - getPos(oRoll).top;
                setTop(t);
            };
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
                oBar.releaseCapture && oBar.releaseCapture();
            };
            oBar.setCapture && oBar.setCapture();
            return false;
        };
        oUp.onclick = function(){
            var t = oBar.offsetTop;
            t -= 10;
            setTop(t)
        };
        oDown.onclick = function(){
            var t = oBar.offsetTop;
            t += 10;
            setTop(t)
        };
    }
    //滚动条1
    (function(){
        var oRoll = document.getElementById('rollBox');
        var oMain = oRoll.nextElementSibling || oRoll.nextSibling;
        bar(oRoll,oMain);
    })();
    //选项卡
    function Tab(oDiv){
        var aLi = oDiv.children[0].getElementsByTagName('li');
        var aUl = oDiv.children[1].getElementsByTagName('ul');
        var oSpan = oDiv.getElementsByTagName('span')[0];
        var iNow = 0;
        var timer = null;
        oSpan.onclick = function() {
            if (oSpan.innerHTML == '-') {
                oDiv.children[1].style.display = 'none';
                oSpan.innerHTML = '+';
                clearInterval(timer);
            }
            else {
                oDiv.children[1].style.display = 'block';
                oSpan.innerHTML = '-';
                timer = setInterval(next, 1000);
            }
            pan();
        };
        for(var i = 0; i < aLi.length; i++){
            aLi[i].index = i;
            aLi[i].onclick = function(){
                iNow = this.index;
                tab();
            };
        }
        function tab(){
            for(var i = 0; i< aLi.length; i++){
                aLi[i].className = '';
                aUl[i].style.display = 'none';
            }
            aLi[iNow].className = 'active';
            aUl[iNow].style.display = 'block';
        }
        function next(){
            iNow++;
            if(iNow >= aLi.length){
                iNow = 0;
            }
            tab();
        }
        timer = setInterval(next,1000);
    }
    var oMovie = document.getElementById('rollBox').nextElementSibling || document.getElementById('rollBox').nextSibling;
    //傲视影音
    (function(){
        var oDiv = getByClass(oMovie,'movie_moreMsg')[0];
        Tab(oDiv);
    })();
    //同步剧场
    (function(){
        var oDiv = getByClass(oMovie,'movie_moreMsg')[1];
        Tab(oDiv);
    })();
    //视频库开始
    (function(){
        var oDiv = getByClass(oMovie,'movie_moreMsg')[2];
        Tab(oDiv);
    })();
    //排行榜开始
    (function(){
        var oDiv = document.getElementById('show4');
        var aLi = oDiv.getElementsByTagName('li');
        var oDiv1 = document.getElementById('videoGallery');
        var aDiv = oDiv1.children;
        var aList1 =  getByClass(oDiv1.children[0],'movie_rank');
        var aList2 =  getByClass(oDiv1.children[1],'movie_rank');
        var aList3 =  getByClass(oDiv1.children[2],'movie_rank');
        var aList4 =  getByClass(oDiv1.children[3],'movie_rank');
        var iNow = 0;
        var timer=null;
        function show(aList){
            for(var j =0; j<aList.length; j++){
                aList[j].onmouseover = function(){
                    for(var i = 0;i < aList.length; i++){
                        aList[i].children[0].style.display = 'block';
                        aList[i].children[1].style.display = 'none';
                    }
                    this.children[0].style.display = 'none';
                    this.children[1].style.display = 'block';
                };
            }
        }
        show(aList1);show(aList2);show(aList3);show(aList4);

        var oSpan = oDiv.getElementsByTagName('span')[0];
        //ad(oDiv,oSpan,timer,next);
        oSpan.onclick = function() {
            if (oSpan.innerHTML == '-') {
                oDiv.children[1].style.display = 'none';
                oSpan.innerHTML = '+';
                clearInterval(timer);
            }
            else {
                oDiv.children[1].style.display = 'block';
                oSpan.innerHTML = '-';
                timer = setInterval(next, 1000);
            }
            pan();
        };
        for(var i = 0; i < aLi.length; i++){
            aLi[i].index = i;
            aLi[i].onclick = function(){
                iNow = this.index;
                tab();
            };
        }
        function tab(){
            for(var i = 0; i< aLi.length; i++){
                aLi[i].className = '';
                aDiv[i].style.display = 'none';
            }
            aLi[iNow].className = 'active';
            aDiv[iNow].style.display = 'block';
        }
        function next(){
            iNow++;
            if(iNow >= aLi.length){
                iNow = 0;
            }
            tab();
        }
        timer = setInterval(next,1000);
    })();
    //播放历史
    (function(){
        var oDiv = getByClass(oMovie,'movie_moreMsg')[4];
        Tab(oDiv);
    })();
    //焦点图
    (function(){
        var oFocus = document.getElementById('playerIndexFocus');
        var oUl1 = oFocus.getElementsByTagName('ul')[0];
        var oUl2 = oFocus.getElementsByTagName('ul')[1];
        var aLi1 = oUl1.children;
        var aLi2 = oUl2.children;
        var oPoint = oUl2.nextElementSibling || oUl2.nextSibling;
        for(var i = 0; i < aLi1.length; i++){
            aLi1[i].style.opacity = 1;
            aLi2[i].index = i;
            aLi2[i].onmouseover = function(){
                for(var i = 0; i < aLi1.length; i++){
                    aLi1[i].style.display = 'none';
                    move(aLi1[i],{opacity:0})
                }
                aLi1[this.index].style.display = 'block';
                move(aLi1[this.index],{opacity:1});
                oPoint.style.left = 76*this.index+'px';
            };
        }
    })();
    //滚动条2
    (function(){
        var oRoll = document.getElementById('rollBox2');
        var oMain = document.getElementById('scroll_content');
        bar(oRoll,oMain);
    })();
    //今日热点
    (function(){
        var oCont = document.getElementById('scroll_content');
        var oRd = getByClass(oCont,'day_hot')[0];
        show(oRd);
    })();
    //电影
    (function(){
        var oCont = document.getElementById('scroll_content');
        var oRd = getByClass(oCont,'movie_list')[0];
        show(oRd);
    })();
    //电视剧/综艺/动漫/
    (function(){
        var oCont = document.getElementById('scroll_content');
        var aRd = getByClass(oCont,'tv_list');
        for(var i = 0; i <= aRd.length; i++){
            show(aRd[i])
        };
    })();
    function show(oRd){
        var aA = oRd.getElementsByTagName('a');
        for(var j = 0;j<aA.length; j++ ){
            aA[j].index = j;
            aA[j].onmouseover =function(){
                this.children[1].style.display = 'block';
            };
            aA[j].onmouseout =function(){
                this.children[1].style.display = 'none';
            };
        }
    }
});

