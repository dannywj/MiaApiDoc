/**
 * DB Functions
 * Created by DannyWang
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
    });

    db.transaction(function (trans) {//启动一个事务，并设置回调函数
        //执行创建表的Sql脚本
        var api_info = "CREATE TABLE IF NOT EXISTS struct_info(id integer primary key autoincrement,name TEXT NULL,desp TEXT NULL,params TEXT NULL)";

        trans.executeSql(api_info, [], function (trans, result) {
        }, function (trans, message) {//消息的回调函数alert(message);});
        }, function (trans, result) {
        }, function (trans, message) {
        });
    });
}

function getCurrentDb() {
    //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
    //如果数据库不存在那么创建之
    var db = openDatabase("myDb", "1.0", "it's to save demo data!", 1024 * 1024);
    return db;
}

// API Data Operation
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
                window.location = 'api.html?id={0}'.format(data.insertId);
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
                last_api_data = deepCopy(api_data);
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
                    showPreviewTable();
                } else {
                    alert('Invalid id');
                }
            }
        }, function (ts, message) {
            alert(message);
        });
    });
}

// Struct Data Operation
function checkStructExists(struct_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM struct_info WHERE name=? ",
            [struct_data.struct_name], function (ts, data) {
                if (data && data.rows.length > 0) {
                    alert('Add failure! The struct:[{0}] already exists.'.format(struct_data.struct_name));
                } else {
                    syncStructData(struct_data);
                }
            }, function (ts, message) {
                console.log(message);
                alert(message);
            });
    });
}

function syncStructData(struct_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM struct_info WHERE id=? ",
            [struct_data.id], function (ts, data) {
                if (data && data.rows.length > 0) {
                    updateStructData(struct_data);
                } else {
                    insertStructData(struct_data);
                }
            }, function (ts, message) {
                console.log(message);
                alert(message);
            });
    });
}

function insertStructData(struct_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("INSERT INTO struct_info(name,desp,params) VALUES(?,?,?) ",
            [struct_data.struct_name, struct_data.struct_desp, JSON.stringify(struct_data.params)],
            function (ts, data) {
                alert('Add Success!');
                window.location = 'struct.html?name={0}'.format(struct_data.struct_name);
            }, function (ts, message) {
                alert(message);
            });
    });
}

function updateStructData(struct_data) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("UPDATE struct_info set name=?,desp=?,params=? WHERE id=" + struct_data.id,
            [struct_data.struct_name, struct_data.struct_desp, JSON.stringify(struct_data.params)], function (ts, data) {
                alert('Update Success!');
                last_struct_data = deepCopy(struct_data);
            }, function (ts, message) {
                console.log(message);
                alert(message);
            });
    });
}

function getStructDataFromDB(name) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM struct_info WHERE name=? ", [name], function (ts, data) {
            if (data) {
                if (data.rows.length > 0) {
                    var db_data = data.rows[0];
                    struct_data = {
                        id: db_data.id,
                        struct_name: db_data.name,

                        struct_desp: db_data.desp,
                        params: JSON.parse(db_data.params)
                    };
                    console.log(struct_data);
                    bindForm();
                    showPreviewTable();
                } else {
                    alert('Invalid struct name');
                    window.location = "struct.html";
                }
            }
        }, function (ts, message) {
            alert(message);
        });
    });
}

// List Data Operation
function getAllApiList() {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM api_info ", [], function (ts, data) {
            if (data) {
                if (data.rows.length > 0) {
                    var row = '<table class="table table-bordered">';
                    for (var i = 0; i < data.rows.length; i++) {
                        var info = data.rows[i];
                        var btn = '<a id="btn" class="btn btn-danger btn-xs" href="javascript:void(0);" role="button" onclick="deleteApi(' + info.id + ')">Delete &raquo;</a>';
                        row += '<tr><td style="width: 70%"><a target="_blank"  href="api.html?id={0}"> {0}> {1}  {2}</a></td><td>{3}</td></tr>'.format(info.id, info.url, info.name, btn);
                    }
                    row += '</table>';
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

function getAllStructList() {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM struct_info ", [], function (ts, data) {
            if (data) {
                console.log(data.rows.length);
                if (data.rows.length > 0) {

                    var row = '<table class="table table-bordered">';
                    for (var i = 0; i < data.rows.length; i++) {
                        var info = data.rows[i];
                        var btn = '<a id="btn" class="btn btn-danger btn-xs" href="javascript:void(0);" role="button" onclick="deleteStruct(' + info.id + ')">Delete &raquo;</a>';
                        row += '<tr><td style="width: 70%"><a target="_blank"  href="struct.html?name={1}"> {0}> {1}  </a>{2}</td><td>{3}</td></tr>'.format(info.id, info.name, redMarkHtml(info.desp), btn);
                    }
                    row += '</table>';
                    $("#sp_struct").html(row);
                } else {
                    alert('no data');
                }
            }
        }, function (ts, message) {
            alert(message);
        });
    });
}

function getAllStructType(remove_base_type) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("SELECT * FROM struct_info ", [], function (ts, data) {
            var result = [];
            if (!remove_base_type === true) {
                result = deepCopy(g_all_base_type);
            }
            if (data) {
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var info = data.rows[i];
                        result.push(info.name);
                    }
                }
            }
            result.sort();
            // init H5 autocomplete
            var item = '';
            result.forEach(function (val, index, arr) {
                item += "<option value='{0}'>{0}</option>".format(val);
            });
            $("#type_data").html(item);
        }, function (ts, message) {
            alert(message);
        });
    });
}

function deleteApiById(id) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("delete from api_info WHERE id=" + id,
            [], function (ts, data) {
                alert('Delete Success!');
                getAllApiList();
            }, function (ts, message) {
                console.log(message);
                alert(message);
            });
    });
}

function deleteStructById(id) {
    var db = getCurrentDb();
    db.transaction(function (trans) {
        trans.executeSql("delete from struct_info WHERE id=" + id,
            [], function (ts, data) {
                alert('Delete Success!');
                getAllStructList();
            }, function (ts, message) {
                console.log(message);
                alert(message);
            });
    });
}