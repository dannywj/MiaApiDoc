/**
 * ContentView Business
 * Created by DannyWang
 */
$(function () {
    var query_string = GetRequest();
    var id = query_string['id'];

    if (id) {
        bindData(id);
    }else{
        $("#sp_result").html('not find data!');
    }
});

function setTitle() {
    $("iframe").contents().find('#main_title').html('Mia API Content');
}

function bindData(id) {
    ajaxGetJson('Docs/Content', 'getOne', {id: id}, function (re) {
        var title = re.title;
        var content = re.content;
        $("#sp_result_div_title").html(title);
        $("#sp_result").html(content);
    },null,true);
}