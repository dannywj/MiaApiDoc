/**
 * Created by user on 2017/5/5.
 */
// DB
function initDatabase() {
    var db = getCurrentDb();//初始化数据库
    if (!db) {
        alert("您的浏览器不支持HTML5本地数据库");
        return;
    }
    db.transaction(function (trans) {//启动一个事务，并设置回调函数
        //执行创建表的Sql脚本
        var api_info = "CREATE TABLE IF NOT EXISTS api_info(id integer primary key autoincrement,name TEXT NULL,url TEXT NULL,desp TEXT NULL,input_params TEXT NULL,output_params TEXT NULL)";

        trans.executeSql(api_info, [], function (trans, result) {
        }, function (trans, message) {//消息的回调函数alert(message);});
        }, function (trans, result) {
        }, function (trans, message) {
        });
    })
}

function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("myDb", "1.0", "it's to save demo data!", 1024 * 1024);
    return db;
}

// Data Operation
function syncData(api_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM api_info WHERE id=? ",
            [api_data.id], function (ts, data) {
                if (data && data.rows.length > 0) {
                    updateApiData(api_data);
                } else {
                    insertApiData(api_data);
                }
            }, function (ts, message) {
                alert(message);
            });
    });
}

function insertApiData(api_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("INSERT INTO api_info(name,url,desp,input_params,output_params) VALUES(?,?,?,?,?) ",
            [api_data.api_name, api_data.api_url, api_data.api_desp, JSON.stringify(api_data.input_params), JSON.stringify(api_data.output_params)],
            function (ts, data) {
                alert('Add Success!');
            }, function (ts, message) {
                alert(message);
            });
    });
}

function updateApiData(api_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("UPDATE api_info set name=?,url=?,desp=?,input_params=?,output_params=? WHERE id=" + api_data.id,
            [api_data.api_name, api_data.api_url, api_data.api_desp, JSON.stringify(api_data.input_params), JSON.stringify(api_data.output_params)], function (ts, data) {
                alert('Update Success!');
            }, function (ts, message) {
                alert(message);
            });
    });
}

function getDataFromDB(id) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM api_info WHERE id=? ", [id], function (ts, data) {
            if (data) {
                if (data.rows.length > 0) {
                    var db_data = data.rows[0];
                    api_data = {
                        id: db_data.id,
                        api_name: db_data.name,
                        api_url: db_data.url,
                        api_desp: db_data.desp,
                        input_params: JSON.parse(db_data.input_params),
                        output_params: JSON.parse(db_data.output_params)
                    };
                    console.log(api_data);
                    bindForm();
                } else {
                    alert('Invalid id');
                }
            }
        }, function (ts, message) {
            alert(message);
        });
    });
}

function getAllApiList() {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM api_info ", [], function (ts, data) {
            if (data) {
                if (data.rows.length > 0) {
                    var row='<div class="list-group">';
                    for (var i = 0; i < data.rows.length; i++) {
                        console.log(data.rows[i]);
                        var info=data.rows[i];
                         row+='<a target="_blank" class="list-group-item"  href="api.html?id='+info.id+'">'+info.url+'  '+info.name+'</a> ';
                    }
                    row+='</div>';
                    $("#sp_result").html(row);
                } else {
                    alert('no data');
                }
            }
        }, function (ts, message) {
            alert(message);
        });
    });
}