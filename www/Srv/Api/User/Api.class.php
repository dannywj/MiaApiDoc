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
        //todo
    }

    public function login() {
        $username = $this->checkParam('username');
        $password = $this->checkParam('password');
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
}