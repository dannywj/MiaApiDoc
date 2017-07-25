/**
 * Label Business
 * Created by DannyWang
 */


function getAllLabelList() {
    ajaxGetJson('Docs/Label', 'getAll', {}, function (re) {
        log(re);
        re.forEach(function (val, index, arr) {
            var id = val['id'];
            var label_name = val['label_name'];
            $("#sort_list").append("<li id='{0}' class='sort_li'><img style='cursor:move' src='images/dragbtn.png' width='30px' height='30px' />{1}</li>".format(id, label_name));
        });

        var el = document.getElementById('sort_list');
        var sortable = Sortable.create(el, {
            onEnd: function (evt) {
                var ids = [];
                // params_sorted_result = [];
                $('#sort_list').find('li').each(function () {
                    var id = $(this).attr('id');
                    ids.push(id);
                });
                ajaxGetJson('Docs/Label', 'updateSort', {ids: ids.join(',')}, function (re) {
                    log(re);
                });

            }
        });

    }, null, true);
}


$(function () {
    getAllLabelList();
});
