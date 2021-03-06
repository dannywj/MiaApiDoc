/**
 * 全局公共方法
 * Created by DannyWang
 */
// Global & fonfig
var g_all_base_type = ['int', 'string', 'boolean', 'float', 'double'];

var g_all_struct_list = [];

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