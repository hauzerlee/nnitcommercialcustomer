$.html_path = $("script").last().attr("src").substring(0, $("script").last().attr("src").lastIndexOf("/")) + "/hgzo.loading.html";

$.extend({

    hgzo_loading_show: function (loadingText, params) {

        if ($("#hgzo_dialog").length == 0) {

            //load html

            $.ajax({

                url: $.html_path,
                //data: { Full: "fu" },
                type: "get",
                async: false,
                //dataType: 'json',
                success: function (d) {

                    var loading_form = $(d);
                    loading_form.appendTo($(document.body)).hide();

                },
                error: function (er) {

                }
            });
        }

        if (typeof params == "function") {

            $("#hgzo_dialog button").show().unbind("click").on("click", params);
        }
        else if (typeof params == "string" && params == "close") {

            $("#hgzo_dialog button").show().unbind("click").on("click", $.hgzo_loading_hide);

        }
        else {

            $("#hgzo_dialog button").hide();

        }

        loadingText || (loadingText = "操作正在进行,请等待...");
        $('#hgzo_dialog_content').html(loadingText);
        $("#hgzo_dialog").modal({backdrop: 'static', keyboard: false}).modal("show");

    },

    hgzo_loading_hide: function () {

        $('#hgzo_dialog').modal({backdrop: 'static', keyboard: false}).modal('hide');

    }
})


