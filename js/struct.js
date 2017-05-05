/**
 * Created by DannyWang on 2017/5/5.
 */
var gKeyCount = 1;

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

function initData() {
    var query_string = GetRequest();
    var fn = query_string['fn'];
    var api_id = query_string['api_id'];
    fn = fn ? fn : 'new';
    // require_options = [
    //     {text: 'v', value: 1},
    //     {text: 'x', value: 0}
    // ];

    if (fn === 'new') {
//alert('new page');
        struct_data = {};

        input_params = [];
    } else if (fn === 'update') {

    } else {
        struct_data = {
            struct_name: '会员信息',
            struct_desp: '会员信息desp',
            params: 1,
        };


        params = [
            {
                id: 1,
                name: 'name1', type: 'int', desp: 'desp1',
                is_array: {
                    state: false
                },
                is_required: {
                    state: true
                }
            }
            ,
            {
                id: 2,
                name: 'name2', type: 'string', desp: 'desp2',
                is_array: {
                    state: true
                },
                is_required: {
                    state: false
                }
            },
            {
                id: 3,
                name: 'name3', type: 'float', desp: 'desp3',
                is_array: {
                    state: false
                },
                is_required: {
                    state: false
                }
            }
        ];



    }


}
$(function () {//页面加载完成后绑定页面按钮的点击事件
    initData();

    var base_info = new Vue({
        el: '#api_base_info',
        data: {
            struct_data: struct_data
        }
    });

    var form = new Vue({
        el: '#params_keys',
        data: {
            params: params
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
                this.item.state = !state; //this关键字指定修改当前项数据值
            }
        }
    });



});

$("#btn_addKey").click(function () {
    var new_obj = {
        id: 4,
        name: 'name4', type: 'int', desp: 'desp4',
        is_array: {
            state: false
        },
        is_required: {
            state: false
        }
    };
    params.push(new_obj);
});



$("#btnSave").click(function () {

    var re={};
    re.params=params;
    re.struct_data=struct_data;
    alert(JSON.stringify(re, null, "\t"));
    $("#sp_result").text(JSON.stringify(re, null, "\t"));
    //alert(JSON.stringify(api_data));

//            var txtName = 'wj';
//            var txtTitle = 'test';
//            var txtWords = 'words';
//            var db = getCurrentDb();
//            //执行sql脚本，插入数据
//            db.transaction(function (trans) {
//                trans.executeSql("INSERT INTO Demo(uName,title,words) VALUES(?,?,?) ", [txtName, txtTitle, txtWords], function (ts, data) {
//                }, function (ts, message) {
//                    alert(message);
//                });
//            });
//            showAllTheData();
});


///////////////------------------------------


function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("myDb", "1.0", "it's to save demo data!", 1024 * 1024);
    ;
    return db;
}
//显示所有数据库中的数据到页面上去
function showAllTheData() {
    $("#tblData").empty();
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM Demo ", [], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    appendDataToTable(data.rows.item(i));//获取某行数据的json对象
                }
            }
        }, function (ts, message) {
            alert(message);
            var tst = message;
        });
    });
}
function appendDataToTable(data) {//将数据展示到表格里面
    //uName,title,words
    var txtName = data.uName;
    var txtTitle = data.title;
    var words = data.words;
    var strHtml = "";
    strHtml += "<tr>";
    strHtml += "<td>" + txtName + "</td>";
    strHtml += "<td>" + txtTitle + "</td>";
    strHtml += "<td>" + words + "</td>";
    strHtml += "</tr>";
    $("#tblData").append(strHtml);
}

