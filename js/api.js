/**
 * API Business
 * Created by DannyWang
 */

var tbl_preview;
var last_api_data = {};// 记录上一次修改的数据，用于和最新数据比较，控制tips弹层展示
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
            output_params: []
        };
        bindForm();
    }
    // 延迟加载，数据比较
    setTimeout('getLastData()', 2000);
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
    initDatabase();
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
        }else{
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
        if (JSON.stringify(api_data) === JSON.stringify(last_api_data)) {
            $("#saveTips").hide();
        } else {
            $("#saveTips").show();
        }
    }
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
        syncData(api_data);
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
        var db = getCurrentDb();
        db.transaction(function (trans) {
            trans.executeSql("SELECT * FROM struct_info",
                [], function (ts, data) {
                    if (data && data.rows.length > 0) {
                        for (var i = 0; i < data.rows.length; i++) {
                            g_all_struct_list.push(data.rows[i]);
                        }
                        // 获取结构体数据完成
                        api_data.output_params.forEach(function (val, index, arr) {
                            var key = val.name;
                            var type = val.type;
                            json_result.content[key] = getSampleValue(type, val.is_array.state);
                        });
                        console.log(json_result);
                        showResult(JSON.stringify(json_result));
                    } else {
                        console.log('not find struct_info');
                    }
                }, function (ts, message) {
                    console.log(message);
                    alert(message);
                });
        });
    }
});
