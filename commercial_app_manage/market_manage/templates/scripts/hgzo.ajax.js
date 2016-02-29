/**
 * Created by Administrator on 2016/2/29.
 */

$.hgzo_baseUrl = "http://www.baidu.com/"
$.hgzo_timeout = 2000
$.hgzo_ajax_proxy = "/webproxy"

$.extend({

    hgzo_ajax_sync: function (queryurl, urlparam, type) {
        var result = null; //结果数据
        var strurl = "";  //访问远程服务器地址
        var url = "";  //代理服务地址
        var data = {}; //上传参数
        if (type == "GET") {//get方式参数以url直接传参
            //遍历url参数转换成字符串
            for (var key in urlparam) {
                strurl = strurl + "&" + key + "=" + encodeURIComponent(urlparam[key]);
            }
            if (strurl != "") {
                strurl = queryurl + "?md5=" + md5 + "&sg=" + sg + strurl;
            }
            //        url = webproxyUrl + "Get"; //李春叶修改  用于解决除G00文件夹下调用该函数时出现的bug
            url = $.hgzo_ajax_proxy;
            data = {url: strurl};
        }
        else {//post参数以json字符串传参
            //url = webproxyUrl + "Post"; //李春叶修改  用于解决除G00文件夹下调用该函数时出现的bug
            url = $.hgzo_ajax_proxy;
            data = {url: queryurl + "?md5=" + md5 + "&sg=" + sg, postdata: $.stringifyJSON(urlparam)};
        }

        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            async: false, //同步调用
            data: $.stringifyJSON(data), //url参数
            dataType: "json", //服务器返回的数据类型
            cache: false, //设置为 false 将不缓存此页面
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert($.parseJSON(XMLHttpRequest.responseText).Message);
            },
            success: function (json) {

                if (json.d != "") {
                    var jsonObj = $.parseJSON(json.d);
                    if (typeof jsonObj == 'string') {
                        result = $.parseJSON(eval(json.d));
                    }
                    else {
                        result = jsonObj;
                    }
                }
                else {
                    result = json.d;
                }
            }
        });
        return result;
    },

    hgzo_ajax_async: function (queryurl, urlparam, callback, type) {
        var result = null; //结果数据
        var strurl = "";  //访问远程服务器地址
        var url = "";  //代理服务地址
        var data = {}; //上传参数
        if (type == "GET") {//get方式参数以url直接传参
            //遍历url参数转换成字符串
            for (var key in urlparam) {
                strurl = strurl + "&" + key + "=" + encodeURIComponent(urlparam[key]);
            }
            if (strurl != "") {
                strurl = queryurl + "?md5=" + md5 + "&sg=" + sg + strurl;
            }
            url = $.hgzo_ajax_proxy;
            data = {url: strurl};
        }
        else {//post参数以json字符串传参
            url = $.hgzo_ajax_proxy;
            data = {url: queryurl + "?md5=" + md5 + "&sg=" + sg, postdata: $.stringifyJSON(urlparam)};
        }

        //创建GUID
        //开启等待
        var guid = $.showLoading();
        $.ajax({

            type: "POST",
            url: url,
            contentType: "application/json",
            async: true, //异步调用
            data: $.stringifyJSON(data), //url参数
            dataType: "json", //服务器返回的数据类型
            cache: false, //设置为 false 将不缓存此页面
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                alert($.parseJSON(xmlHttpRequest.responseText).Message);
                $.hideLoading(guid);
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
                    $.hideLoading(guid);
                }
            }
        });
    }

})

