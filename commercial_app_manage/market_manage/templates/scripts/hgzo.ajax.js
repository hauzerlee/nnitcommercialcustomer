/**
 * Created by Administrator on 2016/2/29.
 */

$.hgzo_baseUrl = "http://172.16.3.156:8000/"
$.hgzo_timeout = 2000
$.hgzo_ajax_proxy = "/proxyclient/"
$.stringifyJSON = JSON.stringify
$.extend({

    hgzo_ajax_async: function (queryurl, urlparam, type, callback, errCallback) {
        queryurl = $.hgzo_baseUrl + queryurl;

        if (queryurl.lastIndexOf("/") != queryurl.length - 1 && queryurl.lastIndexOf("?") == -1)
            queryurl += "/"

        var result = null; //结果数据
        var strurl = "";
        var data = {}; //上传参数

        //type = type.toUpperCase();
        //type == "GET" || type == "POST" || (type = "GET");

        if (type.toUpperCase() == "GET") {//get方式参数以url直接传参
            //遍历url参数转换成字符串
            for (var key in urlparam) {
                strurl = strurl + "&" + key + "=" + encodeURIComponent(urlparam[key]);
            }
            if (strurl != "") {
                strurl = queryurl + "?" + strurl;
            } else {
                strurl = queryurl
            }
            data = {url: strurl, method: "get"};
        }
        else {//post参数以json字符串传参
            data = {url: queryurl, postdata: $.stringifyJSON(urlparam), method: "post"};
        }

        //创建GUID
        //开启等待
         var guid = $.hgzo_loading_show("正在加载数据,请稍后...");
        $.ajax({
            type: "POST",
            url: $.hgzo_ajax_proxy,
            contentType: "application/json",
            async: true, //异步调用
            data: $.stringifyJSON(data), //url参数
            dataType: "json", //服务器返回的数据类型
            cache: false, //设置为 false 将不缓存此页面
            error: function (xmlHttpRequest, textStatus, errorThrown) {


                if (typeof errCallback == "function") {
                    errCallback();
                }
                //alert($.parseJSON(xmlHttpRequest.responseText).Message);
                $.hgzo_loading_hide();
            },
            success: function (json, xmlHttpRequest, textStatus) {
                try {
                    if (!json.d)
                        callback(json);
                    else {
                        var jsonObj = $.parseJSON(json.d);
                        typeof jsonObj == "string" ? callback($.parseJSON(eval(json.d))) : callback(jsonObj);
                    }
                }
                finally {
                   $.hgzo_loading_hide();
                }
            }
        });
    }

})

