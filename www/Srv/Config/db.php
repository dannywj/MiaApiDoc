<?php
//数据库配置文件
/**
 * 配置文件分为online,test,dev三种（区分环境）
 * 省略则默认为线上配置
 */
return [
    'online'=>[
        'ApiDocs' => [
            'host' => 'localhost',
            'dbname' => 'mia',
            'user' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
            'port' => '3306',
        ]
    ],

//    'dev'=>[
//        'ApiDocs' => [
//            'host' => 'localhost',
//            'dbname' => 'mia',
//            'user' => 'root',
//            'password' => 'root',
//            'charset' => 'utf8',
//            'port' => '3306',
//        ]
//    ]
];
