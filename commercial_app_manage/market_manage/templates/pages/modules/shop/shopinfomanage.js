/**
 * Created by Administrator on 2016/1/26.
 */

$(function () {

    //search
    $("#btn_search").on("click", function () {

        $.hgzo_ajax_async("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json", null, function (value) {
            alert(value);
        }, "get");

    })

    //new
    $("#btn_add").on("click", function () {


    })

    //modify
    $("#btn_modify").on("click", function () {


    })

    //delete
    $("#btn_delete").on("click", function () {


    })

    //previous page
    $("#btn_previous").on("click", function () {


    })

    //next page
    $("#btn_next").on("click", function () {


    })

})

