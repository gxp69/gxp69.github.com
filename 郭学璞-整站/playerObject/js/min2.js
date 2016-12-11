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
        oBar.style.height= 300*(oRoll.parentNode.offsetHeight/oMain.offsetHeight)+'px';
    }
}
domReady(function(){
    //滚动条
    function bar(oRoll,oMain){
        var oBar = oRoll.children[0];
        var oUp = oRoll.children[1];
        var oDown = oRoll.children[2];
        oBar.style.height= 300*(oRoll.parentNode.offsetHeight/oMain.offsetHeight)+'px';
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
        var aUl = getByClass(oDiv,'movie_moreMsgCon');
        var oSpan = oDiv.children[0].children[0];
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
    //播放历史
    (function(){
        var oDiv = getByClass(oMovie,'movie_moreMsg')[0];
        Tab(oDiv);
    })();

});

