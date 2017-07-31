/**
 * Content Business
 * Created by DannyWang
 */
var ue;

function init() {
    ue = UE.getEditor('editor', {
        toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'lineheight', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', 'anchor', '|',
            'emotion', 'insertcode', 'pagebreak', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|', 'help'
        ]], initialFrameHeight: 500
    });
    var query_string = GetRequest();
    var content_id = query_string['id'];
    if (content_id) {
        bindData(content_id);
    }
}

function bindData(id) {
    ajaxGetJson('Docs/Content', 'getOne', {id: id}, function (re) {
        $("#txt_title").val(re.title);
        ue.setContent(re.content);
        $("#slt_project").val(re.project_id);
        $("#btn_add").hide();
        $("#btn_update").show();
    }, null, true);
}

function getAllProjectList() {
    ajaxGetJson('Docs/Project', 'getAll', {}, function (re) {
        $("#slt_project").empty();
        var options = '';
        for (var i = 0; i < re.length; i++) {
            options += '<option value ="{0}" >{1}</option>'.format(re[i].id, re[i].project_name);
        }
        $("#slt_project").html(options);
    }, null, true);
}

$(function () {
    init();
    getAllProjectList();
});

$("#btn_add").click(function () {
    var title = $("#txt_title").val();
    var content = ue.getContent();
    if (title.length == 0 || content.length == 0) {
        alert('please input info');
        return false;
    }
    ajaxPostJson('Docs/Content', 'addOne', {
        title: title,
        content: content,
        project_id: $("#slt_project").val()
    }, function (re) {
        alert('add success');
        window.location = 'content.html?id={0}'.format(re);
    }, function (data) {
        alert(data.msg);
    }, true);
});


$("#btn_update").click(function () {
    var query_string = GetRequest();
    var content_id = query_string['id'];
    var title = $("#txt_title").val();
    var content = ue.getContent();
    if (title.length == 0 || content.length == 0) {
        alert('please input info');
        return false;
    }
    ajaxPostJson('Docs/Content', 'updateOne', {
        id: content_id,
        title: title,
        content: content,
        project_id: $("#slt_project").val()
    }, function (re) {
        alert('update success');
        window.location = 'content.html?id={0}'.format(content_id);
    }, function (data) {
        alert(data.msg);
    }, true);
});

function setTitle() {
    $("iframe").contents().find('#main_title').html('Mia API Doc Content');
}