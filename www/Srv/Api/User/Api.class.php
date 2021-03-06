<?php

namespace ApiDocs\Api\User;

/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/19
 */
class Api extends \ApiDocs\Api\Base\ApiBase {

    public function isLogin() {
        $this->checkLogin();
        $this->success(true);
    }

    public function register() {
        $username = $this->checkParam('username');
        $password = $this->checkParam('password');
        $password = md5($password);
        $info = array(
            'username' => $username,
            'password' => $password,
            'type' => 0,
            'status' => 0,
            'create_time' => date('Y-m-d H:i:s'),
        );

        $db = parent::getDbApiDocs();
        $id = $db->Insert($info, 'user_info');
        if ($id) {
            $this->success($id);
        } else {
            $this->error(103);
        }
    }

    public function login() {
        $username = $this->checkParam('username');
        $password = $this->checkParam('password');
        $password = md5($password);
        $sql = "SELECT * FROM user_info where username='{$username}' and password='{$password}' ";
        $db = parent::getDbApiDocs();
        $result = $db->GetOne($sql);
        if (!empty($result)) {
            $uid = $result['id'];
            $auth = new Auth();
            $auth_id = $auth->generateAuthInfo($uid);
            $auth->setCookie($auth_id);
            $this->success($auth_id);
        } else {
            $this->error(202);
        }
    }

    public function logout() {
        $auth = new Auth();
        $auth->removeCookie();
        $this->success(true);
    }

    public function getUserInfo() {
        if ($this->is_login) {
            $this->success($this->user_info);
        } else {
            $this->success(null);
        }
    }

    public function updatePassword(){
        $this->checkLogin();
        $old_password = $this->checkParam('old_password');
        $new_password = $this->checkParam('new_password');
        $current=$this->user_info['password'];
        if ($current!=md5($old_password)) {
            $this->error(204);
        }
        $db = parent::getDbApiDocs();

        $set_info = array(
            'password' => md5($new_password),
        );
        $where = "id={$this->user_info['user_id']}";
        $result = $db->Update($set_info, $where, 'user_info');
        $this->success(true);
    }
}