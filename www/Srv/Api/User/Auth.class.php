<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/20
 */

namespace ApiDocs\Api\User;
class Auth extends \ApiDocs\Api\Base\ApiBase {

    const AUTH_EXPIRE_TIME = 3600 * 24 * 7;

    public function generateAuthInfo($uid) {
        $new_auth_id = md5($uid . time() . 'danny');

        $info = array(
            'user_id' => $uid,
            'auth_id' => $new_auth_id,
            'create_time' => date('Y-m-d H:i:s'),
            'expire_time' => date('Y-m-d H:i:s', time() + self::AUTH_EXPIRE_TIME),
        );
        $db = parent::getDbApiDocs();
        $id = $db->Insert($info, 'user_auth');
        if ($id) {
            return $new_auth_id;
        } else {
            return null;
        }
    }

    public function setCookie($auth_id) {
        setcookie('auth_id', $auth_id, time() + self::AUTH_EXPIRE_TIME, '/');
    }

    public function removeCookie() {
        setcookie('auth_id', '', time() - 999, '/');
    }
}