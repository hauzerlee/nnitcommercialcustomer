$.extend({
    BindingValueToTable: function (tableID, objectArr) {
        var ths = $("#" + tableID + " thead th")

        $.each(objectArr, function (i, obj) {

            var newtr = $("<tr></tr>");

            $.each(ths, function (i, th) {

                var newtd = $("<td></td>");
                newtr.append(newtd);
                if ($(th).find("input").length > 0) {
                    newtd.append("<input type='checkbox'/>");
                }
                else {
                    var hgzo_col_field = $(th).attr("hgzo-col-field")
                    !!hgzo_col_field && (hgzo_col_field = hgzo_col_field.split('.'))
                    if (hgzo_col_field instanceof Array) {

                        function findNode(arr, object, i) {

                            if (arr.length - 1 < i && !object[arr[i]])
                                return ""
                            else {
                                if (object[arr[i]] instanceof Object)
                                    return findNode(arr, object[arr[i]], i + 1)
                                else
                                    return object[arr[i]]
                            }
                        }

                        var fieldVal = findNode(hgzo_col_field, obj, 0);

                        newtd.html(fieldVal);

                    }

                }
            })

            $("#" + tableID).append(newtr);

        })

    },

    BindingValueToSelect: function (selectID, objectArr) {

        var valueField = $("#" + selectID).attr("hgzo-select-val")
        var htmlField = $("#" + selectID).attr("hgzo-select-html")

        $.each(objectArr, function (i, obj) {
            $("#" + selectID).append('<option value="' + obj[valueField] + '">' + obj[htmlField] + '</option>')
        })


    },

    BindingErrorMsgToEachItem: function (divID, objClass) {

        //remove
        $("#" + divID).find(".hgzo-error").remove();

        var errItmes = $("#" + divID).find("[hgzo-error-field]");

        $.each(errItmes, function (i, item) {

            var hgzo_error_field = $(item).attr('hgzo-error-field').split(".");

            function getErrorMsg(arr, obj, i) {

                if (i > hgzo_error_field.length - 1)
                    return "";

                var fieldValue = obj[hgzo_error_field[i]];

                if (typeof fieldValue == 'undefined')
                    return "";
                else if (fieldValue instanceof Array)
                    return fieldValue[0];
                else if (fieldValue instanceof Object)
                    return getErrorMsg(arr, obj, i + 1);
                else
                    return fieldValue;
            }

            var fieldValue = getErrorMsg(hgzo_error_field, objClass, 0);

            //append
            if (!!fieldValue)
                $(item).after("<label class='hgzo-error' style='color:red; font-size: x-small'>" + fieldValue + "</label>");

        })

    }
})
