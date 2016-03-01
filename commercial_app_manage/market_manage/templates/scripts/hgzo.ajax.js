/**
 * Created by Administrator on 2016/2/29.
 */

$.hgzo_baseUrl = "http://www.baidu.com/"
$.hgzo_timeout = 2000
$.hgzo_ajax_proxy = "http://127.0.0.1:8000/proxyclient/"
$.stringifyJSON = JSON.stringify
$.extend({

    hgzo_ajax_async: function (queryurl, urlparam, callback, type) {
        var result = null; //结果数据
        var strurl = "";
        var data = {}; //上传参数
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
        // var guid = $.showLoading();
        $.ajax({
            type: "POST",
            url: $.hgzo_ajax_proxy,
            contentType: "application/json",
            async: true, //异步调用
            data: $.stringifyJSON(data), //url参数
            dataType: "json", //服务器返回的数据类型
            cache: false, //设置为 false 将不缓存此页面
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                alert($.parseJSON(xmlHttpRequest.responseText).Message);
                //$.hideLoading(guid);
            },
            success: function (json) {
                try {
                    if (json.d != "") {

                        var jsonObj = $.parseJSON(json.d);
                        if (typeof jsonObj == 'string') {
                            callback($.parseJSON(eval(json.d)));
                        }
                        else {
                            callback(jsonObj);
                        }
                    }
                    else {
                        callback(json.d);
                    }
                    //等待条关闭
                }
                finally {
                    // $.hideLoading(guid);
                }
            }
        });
    }

})

