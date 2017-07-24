/**
 * Register
 */
$("#btn_signup").click(function () {
    var username = $("#username").val();
    var password = $("#pwd").val();
    ajaxGetJson('User/Api', 'register', {username: username, password: password}, function (re) {
        alert('Register success!');
        window.location = window.location;
    }, function (data) {
        $("#error_info").html(data.msg);
    }, true);
});



