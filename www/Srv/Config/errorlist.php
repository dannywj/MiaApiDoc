<?php
/**
 * 错误代码配置说明
 * message：友好的提示信息
 * info：系统提示信息，方便出错调试和定位
 *
 * Created by DannyWang
 * 2015-07-24
 */
return [
    //======1xx类错误：参数类错误======
    101 => [
        'message' => '输入信息为空',
        'info' => '',
    ],
    102 => [
        'message' => 'JSON格式参数错误',
        'info' => 'Invalid JSON Format',
    ],
    103 => [
        'message' => '操作失败',
        'info' => 'Operation Failure',
    ],


    //======2xx类错误：用户授权相关======
    201 => [
        'message' => '用户请求非法,请登录',
        'info' => 'Invalid request.',
    ],
    202 => [
        'message' => '用户名或密码错误',
        'info' => 'Invalid user or password.',
    ],
    203 => [
        'message' => '没有操作权限',
        'info' => 'Invalid permission.',
    ],
    204 => [
        'message' => '旧密码错误',
        'info' => 'Invalid old password.',
    ],
    //======3xx类错误：数据相关======
    301 => [
        'message' => '没有指定的数据',
        'info' => 'Empty Data.',
    ],

    //======5xx类错误：服务器错误======
    500 => [
        'message' => '服务器错误',
        'info' => 'Server Error(Auto Throw)',
    ],
    501 => [
        'message' => '服务器错误',
        'info' => 'Server Error',
    ],
];