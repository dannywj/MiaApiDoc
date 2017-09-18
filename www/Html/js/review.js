/**
 * Detail Business
 * Created by DannyWang
 */
// Global
var api_data_list = [];
var struct_data_list = [];
var version = '';

// Data
function getAllApiList() {
    loadingDiv('#sp_result');
    ajaxGetJson('Docs/Api', 'getAllListVersion', {version: version}, function (re) {
        //ul-list
        var item_list = {};
        var html = '';
        // 第一次循环，构造label_name为key的JS对象（关联数组）
        for (var i = 0; i < re.length; i++) {
            if (item_list[re[i]['sort'] + re[i]['label_name']] == undefined) {
                item_list[(re[i]['sort'] + re[i]['label_name'])] = [];
            }
            item_list[(re[i]['sort'] + re[i]['label_name'])].push(re[i]);

            // 构造api_data_list
            var item = {
                api_name: re[i].name,
                api_url: re[i].url,
                api_desp: re[i].desp,
                input_params: JSON.parse(re[i].input_params),
                output_params: JSON.parse(re[i].output_params),
                key: formatUrlKey(re[i].url),
                show_input: JSON.parse(re[i].input_params).length > 0 ? true : false,
                show_output: JSON.parse(re[i].output_params).length > 0 ? true : false
            };
            api_data_list.push(item);

        }

        // 循环对象内key，构造列表
        for (var key in item_list) {
            html += '<span class="api_list_label">{0}</span>'.format(key.replace(/[\d]+/, ''));
            for (var j = 0; j < item_list[key].length; j++) {
                var info = item_list[key][j];
                html += '<li><a href="#{0}">{1}  -  {2}   &nbsp;&nbsp; <span class="gray">[developer:{3}]</span></a></li>'.format(formatUrlKey(info.url), info.url, redMarkHtml(info.name) + redMarkVersion(info.create_version, info.update_version, version), info.last_modify_user ? info.last_modify_user : info.create_user);
            }
        }
        $("#ul_apilist").html(html);

        bindDetail();
        scrollHash();
    }, null, true);
}

function bindDetail() {
    tbl_preview = new Vue({
        el: '#tbl_preview',
        data: {
            api_data_list: api_data_list
        },
        methods: {
            format_type: function (type, is_array) {
                return getFormatTypeDetail(type, is_array);
            },
            mark_desp: function (val) {
                return redMarkHtml(val);
            }
        }
    });
}

function getAllStruct() {
    ajaxGetJson('Docs/Struct', 'getAllListVersion', {version: version}, function (re) {
        for (var i = 0; i < re.length; i++) {
            var item = {
                struct_name: re[i].name,
                struct_desp: re[i].desp,
                params: JSON.parse(re[i].params),
                struct_key: formatStructKey(re[i].name)
            };
            struct_data_list.push(item);
        }

        struct_preview = new Vue({
            el: '#struct_preview',
            data: {
                struct_data_list: struct_data_list
            },
            methods: {
                format_type: function (type, is_array) {
                    return getFormatTypeDetail(type, is_array);
                },
                mark_desp: function (val) {
                    return redMarkHtml(val);
                }
            }
        });
    });
}

// Tools
function getFormatTypeDetail(type, is_array) {
    var result = '';
    if ($.inArray(type, g_all_base_type) == -1) {
        result = generateTypeLinkDetail(type) + '结构体';
    } else {
        result = type;
    }
    if (is_array) {
        result = 'array(' + result + ')';
    }
    return result;
}

function generateTypeLinkDetail(type) {
    return "<a href='#{0}'>{1}</a>".format(formatStructKey(type), type);
}

function scrollHash() {
    if (location.hash) {
        var hash = location.hash.substring(1);
        document.getElementById(hash).scrollIntoView();
    }
}

// Init
$(function () {
    var query_string = GetRequest();
    var v = query_string['v'];
    if (v) {
        version = v;
        $("#sp_ver").html(version.replaceAll('_', '.'));
        getAllApiList();
        getAllStruct();
    } else {
        alert("invalid version");
    }

});

function setTitle() {
    $("iframe").contents().find('#main_title').html('Mia API Doc Review');
}
