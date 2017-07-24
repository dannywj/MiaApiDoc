/**
 * List Business
 * Created by DannyWang
 */
function deleteApi(id) {
    if (confirm('Are you sure?')) {
        ajaxGetJson('Docs/Api', 'deleteOne', {id: id}, function (re) {
            getAllApiList();
        }, null, true);
    }
}

function deleteStruct(id) {
    if (confirm('Are you sure?')) {
        ajaxGetJson('Docs/Struct', 'deleteOne', {id: id}, function (re) {
            getAllStructList();
        }, null, true);
    }
}

function getAllApiList() {
    loadingDiv('#sp_result');
    ajaxGetJson('Docs/Api', 'getAllList', {}, function (re) {
        // ---begin create table---
        var data = re;
        var row = '<table class="table table-bordered">';
        row += '<tr><th style="">{0}</th><th>{1}</th><th>{2}</th><th>{3}</th></tr>'.format('API name', 'create info', 'update info', 'operation');
        var item_list = {};
        // 第一次循环，构造label_name为key的JS对象（关联数组）
        for (var i = 0; i < re.length; i++) {
            if (item_list[re[i]['sort'] + re[i]['label_name']] == undefined) {
                item_list[(re[i]['sort'] + re[i]['label_name'])] = [];
            }
            item_list[(re[i]['sort'] + re[i]['label_name'])].push(re[i]);
        }
        // 循环对象内key，构造列表
        for (var key in item_list) {
            row += '<tr><td style=""><span class="api_list_table_label">{0}</span></td><td></td><td></td><td></td></tr>'.format(key.replace(/[\d]+/, ''));
            for (var j = 0; j < item_list[key].length; j++) {
                var info = item_list[key][j];
                var btn = '<a id="btn" class="btn btn-danger btn-xs" href="javascript:void(0);" role="button" onclick="deleteApi(' + info.id + ')">Delete &raquo;</a>';
                var other_info = '<td class="smallt">{0}<br/>{1}</td><td class="smallt">{2}<br/>{3}</td>'.format(info.create_user ? info.create_user : '', info.add_time ? info.add_time : '', info.last_modify_user ? info.last_modify_user : '', info.update_time ? info.update_time : '');
                row += '<tr><td style=""><a id="{4}" target="_blank"  href="api.html?id={0}"> {1}  {2}</a></td>{5}<td>{3}</td></tr>'.format(info.id, info.url, info.name, btn, formatUrlKey(info.url), other_info);
            }
        }
        row += '</table>';
        $("#sp_result").html(row);
        // ---end create table---

        // get api autocomplete
        var result = [];
        if (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var info = data[i];
                    result.push(info.url);
                }
            }
        }
        result.sort();
        var item = '';
        result.forEach(function (val, index, arr) {
            item += "<option value='{0}'>{0}</option>".format(val);
        });
        $("#type_data_api").html(item);

    });
}

function getAllStructList() {
    loadingDiv('#sp_struct');
    ajaxGetJson('Docs/Struct', 'getAllList', {}, function (re) {
        var data = re;
        var row = '<table class="table table-bordered">';
        row += '<tr><th style="">{0}</th><th>{1}</th><th>{2}</th><th>{3}</th></tr>'.format('struct name', 'create info', 'update info', 'operation');
        for (var i = 0; i < data.length; i++) {
            var info = data[i];
            var btn = '<a id="btn" class="btn btn-danger btn-xs" href="javascript:void(0);" role="button" onclick="deleteStruct(' + info.id + ')">Delete &raquo;</a>';
            info.add_time = info.add_time.substr(0, info.add_time.length - 3);
            info.update_time = info.update_time.substr(0, info.update_time.length - 3);
            var other_info = '<td class="smallt">{0}<br/>{1}</td><td class="smallt">{2}<br/>{3}</td>'.format(info.create_user ? info.create_user : '', info.add_time ? info.add_time : '', info.last_modify_user ? info.last_modify_user : '', info.update_time ? info.update_time : '');
            row += '<tr><td style=""><a target="_blank"  href="struct.html?name={1}"> {0}{1}  </a>{2}</td>{4}<td>{3}</td></tr>'.format('', info.name, redMarkHtml(info.desp), btn, other_info);
        }
        row += '</table>';
        $("#sp_struct").html(row);

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
        result.forEach(function (val, index, arr) {
            item += "<option value='{0}'>{0}</option>".format(val);
        });
        $("#type_data").html(item);
    });
}

$(function () {
    getAllApiList();
    getAllStructList();
});

$("#btn_search_struct").click(function () {
    var txt_struct_name = $("#txt_struct_name").val();
    if (txt_struct_name) {
        window.open("struct.html?name={0}".format(txt_struct_name));
    }
});

$("#btn_search_api").click(function () {
    var txt_api_name = $("#txt_api_name").val();
    if (txt_api_name) {
        window.location.hash = "#" + formatUrlKey(txt_api_name);
    }
});

function setTitle() {
    $("iframe").contents().find('#main_title').html('Mia API Doc Manage');
}