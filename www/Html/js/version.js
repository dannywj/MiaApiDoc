/**
 * Version Business
 * Created by DannyWang
 */


function getAllVersionList() {
    ajaxGetJson('Docs/Version', 'getAll', {}, function (re) {
        $("#version_list").empty();
        re.forEach(function (val, index, arr) {
            var version = val['version'];
            var btn = '<a id="btn" class="btn btn-danger btn-xs v_btn" href="javascript:void(0);" role="button" onclick="generateDoc(\'' + version + '\')">Generate Doc &raquo;</a>';
            var btn_review = '<a id="btn" class="btn btn-info btn-xs v_btn" href="javascript:void(0);" role="button" onclick="review(\'' + version + '\')">Review Doc &raquo;</a>';
            var is_current = index == 0 ? true : false;
            if (is_current) {
                btn_review = '';
            }
            $("#version_list").append("<li  class='version_li {2}'>{0}{1}</li>".format(version, btn + btn_review, is_current ? 'red' : ''));
        });

    }, null, true);
}


$(function () {
    getAllVersionList();
});

$("#btn_add").click(function () {
    var version = $("#txt_version").val();
    if (version) {
        ajaxGetJson('Docs/Version', 'addOne', {version: version}, function (re) {
            alert('add version success');
            getAllVersionList();
        }, function (data) {
            alert(data.msg);
        }, true);
    }
});

function setTitle() {
    $("iframe").contents().find('#main_title').html('Mia API Doc Version');
}

function generateDoc(version) {
    ajaxGetJson('Docs/Version', 'generateDoc', {version: version}, function (re) {
        alert('success');
    }, function (data) {
        alert(data.msg);
    }, true);
}

function review(version) {
    window.open("review.html?v={0}".format(version));
}