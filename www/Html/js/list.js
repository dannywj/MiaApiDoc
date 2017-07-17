/**
 * List Business
 * Created by DannyWang
 */
function deleteApi(id) {
    if (confirm('Are you sure?')) {
        deleteApiById(id);
    }
}
function deleteStruct(id) {
    if (confirm('Are you sure?')) {
        deleteStructById(id);
    }
}

function getAllApiList() {
    ajaxGetJson('Docs/Api', 'getAllList', {}, function (re) {
        var data = re;
        var row = '<table class="table table-bordered">';
        for (var i = 0; i < data.length; i++) {
            var info = data[i];
            var btn = '<a id="btn" class="btn btn-danger btn-xs" href="javascript:void(0);" role="button" onclick="deleteApi(' + info.id + ')">Delete &raquo;</a>';
            row += '<tr><td style="width: 70%"><a target="_blank"  href="api.html?id={0}"> {0}> {1}  {2}</a></td><td>{3}</td></tr>'.format(info.id, info.url, info.name, btn);
        }
        row += '</table>';
        $("#sp_result").html(row);
    });
}

function getAllStructList() {
    ajaxGetJson('Docs/Struct', 'getAllList', {}, function (re) {
        var data = re;
        var row = '<table class="table table-bordered">';
        for (var i = 0; i < data.length; i++) {
            var info = data[i];
            var btn = '<a id="btn" class="btn btn-danger btn-xs" href="javascript:void(0);" role="button" onclick="deleteStruct(' + info.id + ')">Delete &raquo;</a>';
            row += '<tr><td style="width: 70%"><a target="_blank"  href="struct.html?name={1}"> {0}> {1}  </a>{2}</td><td>{3}</td></tr>'.format(info.id, info.name, redMarkHtml(info.desp), btn);
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