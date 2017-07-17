<?php
/**
 * 错误代码配置说明
 * message：友好的提示信息
 * info：系统提示信息，方便出错调试和定位
 *
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-24
 */
return [
    //======1xx类错误：参数类错误======
    101 => [
        'message' => '输入信息为空',
        'info' => '',
    ],
    102 => [
        'message' => 'app 为空',
        'info' => 'Invalid app name',
    ],
    103 => [
        'message' => 'uid 为空',
        'info' => 'Invalid user ID',
    ],
    104 => [
        'message' => 'auth 为空',
        'info' => 'Invalid auth',
    ],
    105 => [
        'message' => 'time 值错误',
        'info' => 'Invalid time',
    ],
    106 => [
        'message' => 'apikey 为空',
        'info' => 'Invalid apikey',
    ],
    107 => [
        'message' => '不支持的验证方式',
        'info' => 'Invalid auth type',
    ],
    108 => [
        'message' => '验证码发送失败',
        'info' => 'Send sms error',
    ],
    110 => [
        'message' => '签名错误',
        'info' => 'Invalid Request(sign error)',
    ],
    120 => [
        'message' => 'JSON格式参数错误',
        'info' => 'Invalid JSON Format',
    ],


    //======2xx类错误：用户授权相关======
    201 => [
        'message' => '用户请求非法',
        'info' => 'Invalid request. Apikey empty',
    ],
    202 => [
        'message' => '用户授权失败',
        'info' => 'Invalid user account',
    ],
    211 => [
        'message' => '用户未登录',
        'info' => 'Account not login',
    ],
    212 => [
        'message' => '用户创建失败',
        'info' => 'Account insert error',
    ],
    213 => [
        'message' => '用户激活失败',
        'info' => 'Account activation error',
    ],

    //======3xx类错误：订单相关======
    301 => [
        'message' => '服务接口异常',
        'info' => 'CP Api Error',
    ],

    //======4xx类错误：订单相关======
    401 => [
        'message' => '订单信息为空',
        'info' => 'order info null',
    ],
    402 => [
        'message' => '未设置订单数量及订单信息',
        'info' => 'Count,order is invalid format',
    ],
    403 => [
        'message' => '订单数错误',
        'info' => 'Order count is invalid',
    ],
    404 => [
        'message' => '未设置订单必传信息',
        'info' => 'Order info is invalid',
    ],
    405 => [
        'message' => '订单格式错误',
        'info' => 'Order is invalid format',
    ],
    406 => [
        'message' => '订单格式错误',
        'info' => 'Order info is not json',
    ],
    407 => [
        'message' => '订单号为空',
        'info' => 'Order id is null',
    ],
    408 => [
        'message' => '获取订单详情失败',
        'info' => 'Order detail null',
    ],
    410 => [
        'message' => '添加订单历史记录失败',
        'info' => 'Add transaction history error',
    ],
    411 => [
        'message' => '订单信息错误',
        'info' => 'Order info error',
    ],
    412 => [
        'message' => '无权限查看该订单',
        'info' => 'Invalid user',
    ],
    413 => [
        'message' => '订单删除失败',
        'info' => 'Delete order error',
    ],

    //======42x类错误：支付相关======
    420 => [
        'message' => '不支持的支付方式',
        'info' => 'Invalid Payment Request',
    ],
    421 => [
        'message' => '支付参数非法',
        'info' => 'Invalid Payment Params',
    ],
    422 => [
        'message' => '当前订单状态不允许支付',
        'info' => 'Order status error',
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