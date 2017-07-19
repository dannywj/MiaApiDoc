/**
 * Detail Business
 * Created by DannyWang
 */
// Global
var api_data_list = [];
var struct_data_list = [];

// Data
function getAllApiList() {
    loadingDiv('#sp_result');
    ajaxGetJson('Docs/Api', 'getAllList', {order_by: 'url asc'}, function (re) {
        //ul-list
        var html = '';
        for (var i = 0; i < re.length; i++) {
            var info = re[i];
            html += '<li><a href="#{0}">{1}  -  {2}</a></li>'.format(formatUrlKey(info.url), info.url, info.name);

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
    ajaxGetJson('Docs/Struct', 'getAllList', {}, function (re) {
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

function formatUrlKey(url) {
    return url.replaceAll("/", "_").TrimStr('_');
}

function formatStructKey(key) {
    return "struct_{0}".format(key);
}

// Init
$(function () {
    getAllApiList();
    getAllStruct();
});