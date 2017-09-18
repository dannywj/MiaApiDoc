/**
 * Update passwor
 */
$("#btn_update").click(function () {
    var old_pwd = $("#old_pwd").val();
    var new_pwd = $("#new_pwd").val();
    var new_pwd_2 = $("#new_pwd_2").val();
    if (!old_pwd || !new_pwd || !new_pwd_2) {
        alert('please input value');
        return false;
    }
    if (new_pwd !== new_pwd_2) {
        alert('please check new password');
        return false;
    }
    ajaxGetJson('User/Api', 'updatePassword', {old_password: old_pwd, new_password: new_pwd}, function (re) {
        alert('Update password success');
        window.location = "manage.html";
    }, function (data) {
        $("#error_info").html(data.msg);
    }, true);
});



