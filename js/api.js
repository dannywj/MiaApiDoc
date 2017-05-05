/**
 * Created by DannyWang on 2017/5/5.
 */

// Tools
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function deleteKeyInArray(array, item) {
    array.splice(jQuery.inArray(item, array), 1);
}



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
        api_data = {
            api_name: '',
            api_url: '',
            api_desp: '',
            input_params: [],
            output_params: []
        };
        bindForm();
    }
}

// Main
$(function () {//页面加载完成后绑定页面按钮的点击事件
    initDatabase();
    initData();
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
                // console.log(this.item);
                // this.item.state = !state; //this关键字指定修改当前项数据值
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

$("#btnSave").click(function () {
    $("#sp_result").text(JSON.stringify(api_data, null, "\t"));
    syncData(api_data);
});


