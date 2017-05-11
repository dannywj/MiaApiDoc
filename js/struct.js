/**
 * Struct Business
 * Created by DannyWang
 */

var tbl_preview;
// Init
function initData() {
    var query_string = GetRequest();
    var name = query_string['name'];

    if (name) {
        getStructDataFromDB(name);
        $("#btnSave").html("Update Struct &raquo;");

    } else {
        $("#btnPreview").show();
        struct_data = {
            struct_name: '',
            struct_desp: '',
            params: []
        };
        bindForm();
    }
}

// Main
$(function () {//页面加载完成后绑定页面按钮的点击事件
    initDatabase();
    initData();
});

function showPreviewTable() {
    checkApiData(struct_data);
    $("#tbl_preview").show();
    if (!tbl_preview) {
        tbl_preview = new Vue({
            el: '#tbl_preview',
            data: {
                struct_data: struct_data
            },
            methods: {
                format_type: function (type, is_array) {
                    return getFormatType(type, is_array);
                },
                mark_desp: function (val) {
                    return redMarkHtml(val);
                }
            }
        });
    }
}

function bindForm() {
    var base_info = new Vue({
        el: '#api_base_info',
        data: {
            struct_data: struct_data
        }
    });

    var params_form = new Vue({
        el: '#params_keys',
        data: {
            params: struct_data.params
        },
        methods: {
            // 删除当前参数
            removeKey: function (id) {
                for (var i = 0; i < this.params.length; i++) {
                    if (this.params[i].id == id) {
                        // 删除数组中的元素
                        deleteKeyInArray(this.params, this.params[i]);
                    }
                }
            },
            alocked: function (state) {
            }
        }
    });
}

// 检查参数信息，移除name为空的参数
function checkApiData(api_data) {
    if (api_data.params.length > 0) {
        for (var i = 0; i < api_data.params.length; i++) {
            if (!api_data.params[i].name) {
                deleteKeyInArray(api_data.params, api_data.params[i]);
            }
        }
    }

}

function showResult(data) {
    $("#sp_code_div").show();
    $("#sp_code_result").empty();
    $("#sp_code_result").html(data);
}

function generateWikiCode(struct_data) {
    var result = '';
    var line = '<br/>';
    var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
    var title = tab + '||=字段 =||=必选/可选=||= 类型 =||=  说明 =||';
    if (struct_data) {
        result += '* {0}({1})'.format(struct_data.struct_desp, struct_data.struct_name);
        result += line;
        result += title;
        result += line;
        if (struct_data.params && struct_data.params.length > 0) {
            struct_data.params.forEach(function (val, index, arr) {
                var format_type = getFormatType(val.type, val.is_array.state);
                result += tab + '||{0} ||{1} ||{2} ||{3} ||'.format(val.name, val.is_required.state ? '必选' : '可选', format_type, val.desp);
                result += line;
            })
        }
    }
    return result;
}

// Buttons click
$("#btn_addKey").click(function () {
    var timestamp = new Date().getTime();
    var new_obj = {
        id: timestamp,
        name: '', type: '', desp: '',
        is_array: {
            state: false
        },
        is_required: {
            state: false
        }
    };
    struct_data.params.push(new_obj);
});

$("#btnSave").click(function () {
    checkApiData(struct_data);
    syncStructData(struct_data);
});

$("#btnPreview").click(function () {
    showPreviewTable();
});

$("#btnGenWiki").click(function () {
    var code = generateWikiCode(struct_data);
    showResult(code);
});
