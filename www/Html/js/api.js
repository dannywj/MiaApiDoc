/**
 * API Business
 * Created by DannyWang
 */

var tbl_preview;
var last_api_data = {};// 记录上一次修改的数据，用于和最新数据比较，控制tips弹层展示
var params_sorted_input_result = [];
var params_sorted_output_result = [];

// Init
function initData() {
    var query_string = GetRequest();
    var api_id = query_string['id'];
    if (api_id) {
        // update
        getDataFromDB(api_id);
        $("#btnSave").html("Update API &raquo;");
    } else {
        // add
        $("#btnPreview").show();
        api_data = {
            api_name: '',
            api_url: '',
            api_desp: '',
            input_params: [],
            output_params: [],
            label_id: 0
        };
        bindForm();
    }
}

function getDataFromDB(id) {
    loadingPage();
    ajaxGetJson('Docs/Api', 'getOne', {id: id}, function (re) {
        api_data = {
            id: re.id,
            api_name: re.name,
            api_url: re.url,
            api_desp: re.desp,
            input_params: JSON.parse(re.input_params),
            output_params: JSON.parse(re.output_params),
            label_id: parseInt(re.label_id)
        };
        bindForm();
        showPreviewTable();
        getLastData();
        loadingPage(true);
    }, function () {
        alert('Invalid id');
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
$(function () {
    initData();
    initPlugin();
    getAllStructType();
});

// Form Operation
function bindForm() {
    var base_info = new Vue({
        el: '#api_base_info',
        data: {
            api_data: api_data
        }
    });

    var input_form = new Vue({
        el: '#input_params_keys',
        data: {
            params: api_data.input_params
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

    var output_form = new Vue({
        el: '#output_params_keys',
        data: {
            params: api_data.output_params
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
                //this.item.state = !state; //this关键字指定修改当前项数据值
            }
        }
    });

    // other info
    ajaxGetJson('Docs/Api', 'getAllLabel', {}, function (re) {
        var options = '';
        options += '<option value ="{0}" >{1}</option>'.format(0, 'select');
        for (var i = 0; i < re.length; i++) {
            options += '<option value ="{0}" >{1}</option>'.format(re[i].id, re[i].label_name);
        }
        $("#slt_label").html(options);
        // bind default data
        $("#slt_label").setSelectedValue(api_data.label_id);
    });
}

function showResult($json) {
    $("#sp_code_div").show();
    $("#sp_code_result").empty();
    if (isJson($json)) {
        // bind JsonFormater
        var options = {
            dom: '#sp_code_result' //对应容器的css选择器
        };
        var jf = new JsonFormater(options); //创建对象
        jf.doFormat($json); //格式化json
    } else {
        // output
        $("#sp_code_result").html($json);
    }
    // toast
    scrollToEnd();
    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    };
    toastr.success('Generate Success!');
}

// 检查api参数信息，移除name为空的参数
function checkApiData(api_data) {
    if (api_data.input_params.length > 0) {
        for (var i = 0; i < api_data.input_params.length; i++) {
            if (!api_data.input_params[i].name) {
                deleteKeyInArray(api_data.input_params, api_data.input_params[i]);
            }
        }
    }

    if (api_data.output_params.length > 0) {
        for (var i = 0; i < api_data.output_params.length; i++) {
            if (!api_data.output_params[i].name) {
                deleteKeyInArray(api_data.output_params, api_data.output_params[i]);
            }
        }
    }
}

function showPreviewTable() {
    checkApiData(api_data);
    $("#tbl_preview").show();

    if (!tbl_preview) {
        tbl_preview = new Vue({
            el: '#tbl_preview',
            data: {
                api_data: api_data
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

function generateWikiCode(api_data) {
    var result = '';
    var line = '<br/>';
    var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
    var title = tab + '||=字段 =||=必选/可选=||= 类型 =||=  说明 =||';
    if (api_data) {
        result += '== {0} =={1}{1}'.format(api_data.api_name, line);
        result += '* URL{0}{1}{2}'.format(line, tab, api_data.api_url);
        result += line + line;
        result += '* 请求参数';
        result += line;

        if (api_data.input_params && api_data.input_params.length > 0) {
            result += title;
            result += line;
            api_data.input_params.forEach(function (val, index, arr) {
                var format_type = getFormatType(val.type, val.is_array.state);
                result += tab + '||{0} ||{1} ||{2} ||{3} ||'.format(val.name, val.is_required.state ? '必选' : '可选', format_type, redMarkWiki(val.desp));
                result += line;
            })
        } else {
            result += tab + '无';
            result += line;
        }
        result += line;
        result += '* 返回结果';
        result += line;

        if (api_data.output_params && api_data.output_params.length > 0) {
            result += title;
            result += line;
            api_data.output_params.forEach(function (val, index, arr) {
                var format_type = getFormatType(val.type, val.is_array.state);
                result += tab + '||{0} ||{1} ||{2} ||{3} ||'.format(val.name, val.is_required.state ? '必选' : '可选', format_type, redMarkWiki(val.desp));
                result += line;
            })
        } else {
            result += tab + '无';
            result += line;
        }
    }
    return result;
}

function generatePHPCode(api_data) {
    var result = '';
    var line = '<br/>';
    var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
    if (api_data) {
        result += '/**' + line;
        result += '* {0}'.format(api_data.api_name) + line;
        result += '*/' + line;

        result += 'public function {0} () {'.format(api_data.api_url.split('/')[1] ? api_data.api_url.split('/')[1] : api_data.api_url) + line;
        result += tab + '$params = $this->input->post("params");' + line;
        result += tab + '$arr_params = json_decode($params, true);' + line;

        if (api_data.input_params && api_data.input_params.length > 0) {
            result += line;
            api_data.input_params.forEach(function (val, index, arr) {
                result += tab + "${0} = isset($arr_params['{0}']) ? trim($arr_params['{0}']) : '';".format(val.name);
                result += line;
            })
        }
        result += line;

        if (api_data.output_params && api_data.output_params.length > 0) {
            result += tab + 'output_app_result(array(';
            result += line;
            api_data.output_params.forEach(function (val, index, arr) {
                result += tab + tab + "'{0}' => null,".format(val.name);
                result += line;
            });
            result += tab + ' ));';
        } else {
            result += tab + 'output_app_result();';
        }
    }
    result += line;
    result += '}';
    return result;
}

// 递归生成结构体示例值
function getSampleValue(type, is_array) {
    if ($.inArray(type, g_all_base_type) == -1) {
        // 结构体
        var result = {};
        g_all_struct_list.forEach(function (val, index, arr) {
            var name = val['name'];
            var params = val['params'];
            var params_obj = JSON.parse(params);
            if (name == type) {
                params_obj.forEach(function (val1, index, arr) {
                    var oname = val1['name'];
                    var otype = val1['type'];
                    result[oname] = getSampleValue(otype, val1.is_array.state);
                });
            }
        });
        if (is_array) {
            return [result];
        } else {
            return result;
        }
    } else {
        // base
        if (is_array) {
            return [
                getBaseTypeExample(type),
                getBaseTypeExample(type)
            ]
        }
        return getBaseTypeExample(type);
    }
}

// 保存原始数据，并设置定时检查
function getLastData() {
    last_api_data = deepCopy(api_data);
    setInterval('checkUpdate()', 2000);
}

// 定时检查数据是否改变
function checkUpdate() {
    if (api_data && last_api_data) {
        log(JSON.stringify(api_data) + '====' + JSON.stringify(last_api_data));
        if (JSON.stringify(api_data) === JSON.stringify(last_api_data)) {
            $("#saveTips").hide();
        } else {
            $("#saveTips").show();
        }
    }
}

// Data
function checkApiExists() {
    ajaxGetJson('Docs/Api', 'checkExists', {id: api_data.id ? api_data.id : -1}, function (re) {
        if (re === true) {
            updateApiData(api_data);
        } else {
            insertApiData(api_data);
        }
    }, null, true);
}

function insertApiData(api_data) {
    ajaxPostJson('Docs/Api', 'addOne', {api_data: JSON.stringify(api_data)}, function (re) {
        alert('Add Success!');
        window.location = 'api.html?id={0}'.format(re);
    }, function (err_data) {
        if (err_data.status == 201) {
            alert("Invalid user identity，please login");
            window.location = 'login.html';
        } else {
            alert("Add Error! " + err_data.msg);
        }
    }, true);
}

function updateApiData(api_data) {
    ajaxPostJson('Docs/Api', 'updateOne', {api_data: JSON.stringify(api_data)}, function (re) {
        alert('Update Success!');
        last_api_data = deepCopy(api_data);
        window.location = window.location;
    }, function (err_data) {
        if (err_data.status == 201) {
            alert("Invalid user identity，please login");
            window.location = 'login.html';
        } else {
            alert("Update Error! " + err_data.msg);
        }
    }, true);
}

// Buttons click
$("#btn_input_addKey").click(function () {
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
    api_data.input_params.push(new_obj);
});

$("#btn_output_addKey").click(function () {
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
    api_data.output_params.push(new_obj);
});

$("#btnSave,#btnTipSave").click(function () {
    if (api_data.api_url) {
        checkApiData(api_data);
        checkApiExists(api_data);
    }
});

$("#btnPreview").click(function () {
    showPreviewTable();
});

$("#btnGenWiki").click(function () {
    var code = generateWikiCode(api_data);
    showResult(code);
});

$("#btnGenPHP").click(function () {
    var code = generatePHPCode(api_data);
    showResult(code);
});

$("#btnGenJsonResult").click(function () {
    var json_result = {
        code: 200,
        msg: '',
        alert: '操作成功!',
        content: {}
    };
    if (api_data.output_params.length > 0) {
        // 异步获取所有结构体
        ajaxGetJson('Docs/Struct', 'getAllList', {}, function (re) {
            if (re && re.length > 0) {
                for (var i = 0; i < re.length; i++) {
                    g_all_struct_list.push(re[i]);
                }
                // 获取结构体数据完成
                api_data.output_params.forEach(function (val, index, arr) {
                    var key = val.name;
                    var type = val.type;
                    json_result.content[key] = getSampleValue(type, val.is_array.state);
                });
                log(json_result);
                showResult(JSON.stringify(json_result));
            } else {
                log('not find struct_info');
            }
        });
    }
});

//Sort Params
$("#btn_sort_input").click(function () {
    $("#sort_list_input").empty();
    var raw_data = api_data.input_params;
    raw_data.forEach(function (val, index, arr) {
        var display_name = '{0}-{1}'.format(val.name, redMarkHtml(val.desp));
        var json_data = "<div style='display: none'>" + JSON.stringify(val) + "</div>";
        $("#sort_list_input").append("<li class='sort_li'><img style='cursor:move' src='images/dragbtn.png' width='30px' height='30px' />{0}{1}</li>".format(display_name, json_data));
    });

    var el = document.getElementById('sort_list_input');
    var sortable = Sortable.create(el, {
        onEnd: function () {
            params_sorted_input_result = [];
            $('#sort_list_input').find('li').each(function () {
                var item = $(this).find('div').html();
                params_sorted_input_result.push(JSON.parse(item));
            });
            console.log(params_sorted_input_result);
        }
    });
});

$("#btn_save_sort_input").click(function () {
    if (params_sorted_input_result.length > 0) {
        $(".sp_sort_tips").html('updating');
        api_data.input_params = params_sorted_input_result;
        checkApiData(api_data);
        updateApiData(api_data);
    }
});

$("#btn_sort_output").click(function () {
    $("#sort_list_output").empty();
    var raw_data = api_data.output_params;
    raw_data.forEach(function (val, index, arr) {
        var display_name = '{0}-{1}'.format(val.name, redMarkHtml(val.desp));
        var json_data = "<div style='display: none'>" + JSON.stringify(val) + "</div>";
        $("#sort_list_output").append("<li class='sort_li'><img style='cursor:move' src='images/dragbtn.png' width='30px' height='30px' />{0}{1}</li>".format(display_name, json_data));
    });

    var el = document.getElementById('sort_list_output');
    var sortable = Sortable.create(el, {
        onEnd: function () {
            params_sorted_output_result = [];
            $('#sort_list_output').find('li').each(function () {
                var item = $(this).find('div').html();
                params_sorted_output_result.push(JSON.parse(item));
            });
            console.log(params_sorted_output_result);
        }
    });
});

$("#btn_save_sort_output").click(function () {
    if (params_sorted_output_result.length > 0) {
        $(".sp_sort_tips").html('updating');
        api_data.output_params = params_sorted_output_result;
        checkApiData(api_data);
        updateApiData(api_data);
    }
});

$("#slt_label").change(function () {
    api_data.label_id = parseInt($("#slt_label").val());
});

function setTitle() {
    $("iframe").contents().find('#main_title').html('Mia API Docs');
}