/**
 * 全局公共方法
 * Created by DannyWang
 */
// Global & fonfig
var g_all_base_type = ['int', 'string', 'boolean', 'float', 'double'];

var g_all_struct_list = [];

var g_controller_base = '../Srv/index.php';
// Tools
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                }
                else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
};

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.TrimStr = function (str) {
    return this.replace(new RegExp('^\\' + str + '+|\\' + str + '+$', 'g'), '');
};

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

function deepCopy(json) {
    if (typeof json == 'number' || typeof json == 'string' || typeof json == 'boolean') {
        return json;
    } else if (typeof json == 'object') {
        if (json instanceof Array) {
            var newArr = [], i, len = json.length;
            for (i = 0; i < len; i++) {
                newArr[i] = arguments.callee(json[i]);
            }
            return newArr;
        } else {
            var newObj = {};
            for (var name in json) {
                newObj[name] = arguments.callee(json[name]);
            }
            return newObj;
        }
    }
}

function randomInt(under, over) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * under + 1);
        case 2:
            return parseInt(Math.random() * (over - under + 1) + under);
        default:
            return 0;
    }
}

function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function getFormatType(type, is_array) {
    var result = '';
    if ($.inArray(type, g_all_base_type) == -1) {
        result = generateTypeLink(type) + '结构体';
    } else {
        result = type;
    }
    if (is_array) {
        result = 'array(' + result + ')';
    }
    return result;
}

function generateTypeLink(type) {
    var url = 'struct.html?name={0}'.format(type);
    return "<a href='{0}' target='_blank'>{1}</a>".format(url, type);
}

function isJson(str) {
    try {
        var check_is_json = JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
}

function redMarkHtml(str) {
    str = str.replace("[[", "<span class='red'>");
    return str.replace("]]", "</span>");
}

function redMarkWiki(str) {
    str = str.replace("[[", "[[span(style=color: #FF0000,");
    return str.replace("]]", ")]]");
}

function formatUrlKey(url) {
    return url.replaceAll("/", "_").TrimStr('_');
}

function formatStructKey(key) {
    return "struct_{0}".format(key);
}

function scrollToEnd() {
    var h = $(document).height() - $(window).height();
    $(document).scrollTop(h);
}

function getBaseTypeExample(type) {
    var val = {
        int: randomInt(1, 99999),
        string: randomString(8),
        boolean: true,
        float: (Math.random() + 1).toFixed(2),
        double: Math.random().toFixed(4)
    };
    return val[type];
}

function ajaxGetJson(s, f, params, callback, error_callback, page_loading) {
    if (page_loading) {
        loadingPage();
    }
    params.s = s;
    params.f = f;
    $.getJSON(g_controller_base, params, function (data) {
        if (page_loading) {
            loadingPage(true);
        }
        if (data.status === 0) {
            callback(data.data);
        } else {
            if (error_callback) {
                error_callback(data);
            } else {
                console.error(data);
                switch (data.status) {
                    case 201:
                        alert("Invalid user identity，please login");
                        window.location = 'login.html';
                        break;
                    case 203:
                        alert("Invalid permission");
                        break;
                    default:
                        alert("get api[{0}] error!".format(s + ' ' + f));
                }
            }
        }
    });
}

function ajaxPostJson(s, f, params, callback, error_callback, page_loading) {
    if (page_loading) {
        loadingPage();
    }
    $.post(g_controller_base + "?s={0}&f={1}".format(s, f), params, function (data) {
        if (page_loading) {
            loadingPage(true);
        }
        if (data.status === 0) {
            callback(data.data);
        } else {
            if (error_callback) {
                error_callback(data);
            } else {
                console.error(data);
                switch (data.status) {
                    case 201:
                        alert("Invalid user identity，please login");
                        window.location = 'login.html';
                        break;
                    case 203:
                        alert("Invalid permission");
                        break;
                    default:
                        alert("post api[{0}] error!".format(s + ' ' + f));
                }
            }
        }
    });
}

function loadingDiv(divSelecter) {
    $(divSelecter).html("<img src='images/loading.gif' style='margin: 0 auto;display: block;'/>");
}

function loadingPage(is_hide) {
    var loading_html = '<section class="loading_shade" id="J_loading_box"> <div class="loading_box"> <div class="loading"></div> <p class="loading_text">Loading...</p> </div> </section>';
    if (is_hide) {
        $(".loading_shade").hide();
    } else {
        $("body").append(loading_html);
    }
}

function log(info) {
    console.log(info);
}

jQuery.fn.setSelectedText = function (text) {
    var isExist = false;
    var count = this.dlSize();
    for (var i = 0; i < count; i++) {
        if (jQuery(this).get(0).options[i].text.toLocaleLowerCase() == text.toLocaleLowerCase()) {
            jQuery(this).get(0).options[i].selected = true;
            isExist = true;
            break;
        }
    }
};

jQuery.fn.setSelectedValue = function (val) {
    $(this).get(0).value = val;
};

jQuery.fn.getSelectedText = function () {
    return $(this).find("option:selected").text();
};