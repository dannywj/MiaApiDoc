<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/8/21
 */

namespace ApiDocs\Api\Permission;

class Api {
    public function getUserRole($user) {
        if (empty($user)) {
            return 'guest';
        }
        if (intval($user['type']) == 0) {
            return 'dev';
        } elseif (intval($user['type']) == 1) {
            return 'admin';
        } else {
            return 'guest';
        }
    }

    public function checkUserRole($user_role) {
        if ($user_role == 'admin') {
            return true;
        }
        global $api_path;
        global $api_function;

        //可以调用的角色
        $api_role_list = array(
            'User\Api\getUserInfo' => ['dev', 'guest'],
            'User\Api\logout' => ['dev', 'guest'],
            'User\Api\isLogin' => ['dev', 'guest'],
            'User\Api\register' => ['dev', 'guest'],
            'User\Api\login' => ['dev', 'guest'],
            'User\Api\updatePassword' => ['dev'],

            'Docs\Api\getAllList' => ['dev', 'guest'],
            'Docs\Api\getAllListTitle' => ['dev', 'guest'],
            'Docs\Api\getOne' => ['dev', 'guest'],
            'Docs\Api\getAllLabel' => ['dev', 'guest'],
            'Docs\Api\getAllListVersion' => ['dev', 'guest'],
            'Docs\Api\checkExists' => ['dev', 'guest'],
            'Docs\Api\deleteOne' => ['dev'],//+本人uid
            'Docs\Api\addOne' => ['dev'],
            'Docs\Api\updateOne' => ['dev'],

            'Docs\Struct\getAllList' => ['dev', 'guest'],
            'Docs\Struct\getAllListVersion' => ['dev', 'guest'],
            'Docs\Struct\getOneByName' => ['dev', 'guest'],
            'Docs\Struct\checkExists' => ['dev', 'guest'],
            'Docs\Struct\deleteOne' => ['dev'],//+本人uid
            'Docs\Struct\addOne' => ['dev'],
            'Docs\Struct\updateOne' => ['dev'],

            'Docs\Content\getAll' => ['dev', 'guest'],
            'Docs\Content\getOne' => ['dev', 'guest'],
            'Docs\Content\addOne' => ['dev'],
            'Docs\Content\updateOne' => ['dev'],
            'Docs\Content\deleteOne' => ['dev'],//+本人uid

            'Docs\Project\getAll' => ['dev', 'guest'],

            'Docs\Label\getAll' => ['dev', 'guest'],
            'Docs\Label\addOne' =>  ['dev'],
            'Docs\Label\updateSort' =>  ['dev'],

            'Docs\Version\getAll' =>   ['dev', 'guest'],
            'Docs\Version\addOne' =>  ['admin'],
            'Docs\Version\generateDoc' =>  ['admin'],
        );

        $key = $api_path . '\\' . $api_function;
        if (isset($api_role_list[$key]) && in_array($user_role, $api_role_list[$key])) {
            return true;
        } else {
            return false;
        }
    }
}