/**
 * Struct Business
 * Created by DannyWang
 */

var tbl_preview;
var last_struct_data = {};// 记录上一次修改的数据，用于和最新数据比较，控制tips弹层展示
var is_new = false;
var params_sorted_result = [];
// Init
function initData() {
    var query_string = GetRequest();
    var name = query_string['name'];

    if (name) {
        getStructDataFromDB(name);
        $("#btnSave").html("Update Struct &raquo;");
        is_new = false;
    } else {
        $("#btnPreview").show();
        struct_data = {
            struct_name: '',
            struct_desp: '',
            params: []
        };
        bindForm();
        is_new = true;
    }
}

function getStructDataFromDB(name) {
    loadingPage();
    ajaxGetJson('Docs/Struct', 'getOneByName', {name: name}, function (re) {
        var db_data = re;
        struct_data = {
            id: db_data.id,
            struct_name: db_data.name,

            struct_desp: db_data.desp,
            params: JSON.parse(db_data.params)
        };
        bindForm();
        showPreviewTable();
        getLastData();
        loadingPage(true);
    }, function () {
        alert('Invalid struct name');
        window.location = "struct.html";
    });
}

function getAllStructType() {
    ajaxGetJson('Docs/Struct', 'getAllList', {}, function (re) {
        var data = re;
        // get struct type
        var result = [];
        if (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var info = data[i];
                    result.push(info.name);
                }
            }
        }
        result.sort();
        var item = '';
        g_all_base_type.forEach(function (val, index, arr) {
            item += "<option value='{0}'>{0}</option>".format(val);
        });
        result.forEach(function (val, index, arr) {
            item += "<option value='{0}'>{0}</option>".format(val);
        });
        $("#type_data").html(item);
    });
}

function initPlugin() {
    // clipboard
    var clipboard = new Clipboard('.btncpy');
    clipboard.on('success', function (e) {
        toastr.options = {
            "positionClass": "toast-top-center",
            "timeOut": "2000"
        };
        toastr.info('Copy Success!');
    });
    clipboard.on('error', function (e) {
        alert("复制失败！请手动复制")
    });
}

// Main
$(function () {//页面加载完成后绑定页面按钮的点击事件
    initData();
    initPlugin();
    getAllStructType();
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
    // toast
    scrollToEnd();
    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    };
    toastr.success('Generate Success!');
}

function generateWikiCode(struct_data) {
    var result = '';
    var line = '<br/>';
    var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
    var title = tab + '||=字段 =||=必选/可选=||= 类型 =||=  说明 =||';
    if (struct_data) {
        result += '* {0}({1})'.format(redMarkWiki(struct_data.struct_desp), struct_data.struct_name);
        result += line;
        result += title;
        result += line;
        if (struct_data.params && struct_data.params.length > 0) {
            struct_data.params.forEach(function (val, index, arr) {
                var format_type = getFormatType(val.type, val.is_array.state);
                result += tab + '||{0} ||{1} ||{2} ||{3} ||'.format(val.name, val.is_required.state ? '必选' : '可选', format_type, redMarkWiki(val.desp));
                result += line;
            })
        }
    }
    return result;
}

// 保存原始数据，并设置定时检查
function getLastData() {
    last_struct_data = deepCopy(struct_data);
    setInterval('checkUpdate()', 2000);
}

// 定时检查数据是否改变
function checkUpdate() {
    if (struct_data && last_struct_data) {
        if (JSON.stringify(struct_data) === JSON.stringify(last_struct_data)) {
            $("#saveTips").hide();
        } else {
            $("#saveTips").show();
        }
    }
}

// Data
function checkStructExists() {
    ajaxGetJson('Docs/Struct', 'checkExists', {name: struct_data.struct_name}, function (re) {
        if (re === true) {
            alert('Add failure! The struct:[{0}] already exists.'.format(struct_data.struct_name));
        } else {
            insertStructData(struct_data);
        }
    });
}

function insertStructData(struct_data) {
    loadingPage();
    ajaxPostJson('Docs/Struct', 'addOne', {struct_data: JSON.stringify(struct_data)}, function (re) {
        loadingPage(true);
        alert('Add Success!');
        window.location = 'struct.html?name={0}'.format(struct_data.struct_name);
    }, function (err_data) {
        if(err_data.status==201){
            alert("Invalid user identity，please login");
            window.location='login.html';
        }else {
            alert("Add Error! " + err_data.msg);
        }
    },true);
}

function updateStructData(struct_data) {
    loadingPage();
    ajaxPostJson('Docs/Struct', 'updateOne', {struct_data: JSON.stringify(struct_data)}, function (re) {
        loadingPage(true);
        alert('Update Success!');
        last_struct_data = deepCopy(struct_data);
        window.location = window.location;
    }, function (err_data) {
        if(err_data.status==201){
            alert("Invalid user identity，please login");
            window.location='login.html';
        }else {
            alert("Update Error! " + err_data.msg);
        }
    },true);
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
    // 新增form后，由于vue.js会延迟生成新html，因此绑定Autocomplete控件也需要延迟执行才能生效。。
    //setTimeout("initAutocomplete()",1000);
});

$("#btnSave,#btnTipSave").click(function () {
    checkApiData(struct_data);
    if (is_new) {
        checkStructExists(struct_data);
    } else {
        updateStructData(struct_data);
    }
});

$("#btnPreview").click(function () {
    showPreviewTable();
});

$("#btnGenWiki").click(function () {
    var code = generateWikiCode(struct_data);
    showResult(code);
});

$("#btn_sort").click(function () {
    $("#sort_list").empty();
    var raw_data = struct_data.params;
    raw_data.forEach(function (val, index, arr) {
        var display_name = '{0}-{1}'.format(val.name, redMarkHtml(val.desp));
        var json_data = "<div style='display: none'>" + JSON.stringify(val) + "</div>";
        $("#sort_list").append("<li class='sort_li'><img style='cursor:move' src='images/dragbtn.png' width='30px' height='30px' />{0}{1}</li>".format(display_name, json_data));
    });

    var el = document.getElementById('sort_list');
    var sortable = Sortable.create(el, {
        onEnd: function () {
            params_sorted_result = [];
            $('#sort_list').find('li').each(function () {
                var item = $(this).find('div').html();
                params_sorted_result.push(JSON.parse(item));
            });
            console.log(params_sorted_result);
        }
    });
});

$("#btn_save_sort").click(function () {
    if (params_sorted_result.length > 0) {
        $(".sp_sort_tips").html('updating');
        struct_data.params = params_sorted_result;
        checkApiData(struct_data);
        updateStructData(struct_data);
    }
});
