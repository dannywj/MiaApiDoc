/**
 * Login
 */
$("#btn_login").click(function () {
    var username = $("#username").val();
    var password = $("#pwd").val();
    ajaxGetJson('User/Api', 'login', {username: username, password: password}, function (re) {
        window.location = "manage.html";
    }, function (data) {
        $("#error_info").html(data.msg);
    }, true);
});



