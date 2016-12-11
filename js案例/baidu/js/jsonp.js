/**
 * Created by zhanghaibin on 2016/11/22.
 */
/**
 *
 * @param json
 * json.url  --  string  接口地址
 * json.data --  json    接口需要的参数
 * json.cbName  -- string   函数名字
 * json.success  --  function   成功的回调
 */
function jsonp(json){
    var json = json || {};
    if(!json.url){
        alert('jsonp滚!');
        return;
    }
    json.data = json.data || {};
    json.cbName = json.cbName || 'cb';

    var fnName = 'jsonb_'+Math.random();
    fnName = fnName.replace('.','');
    window[fnName] = function(json2) {
        json.success && json.success(json2);
        //创建的script标签使用完，删除
        oHead.removeChild(oS);
    };
    var oS = document.createElement('script');
    json.data[json.cbName] = fnName;
    var arr = [];
    for(var name in json.data){
        arr.push(name + '=' + json.data[name]);
    }

    oS.src = json.url + '?' + arr.join('&');
    //'http://suggestion.baidu.com/su?wd='+oT.value+'&cb='+fnName;
    //show({q:"j",p:false,s:["京东","京东商城","java","jd","锦绣未央","今夜百乐门","建设银行","今日头条","交通银行","计算器"]});
    //document.head.appendChild(oS);
    var oHead = document.getElementsByTagName('head')[0];
    oHead.appendChild(oS);
}