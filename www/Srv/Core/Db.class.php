<?php
/**
 * DB获取类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-20
 */
namespace ApiDocs\Core;
class Db {
    public static function get($index) {
        static $mysqli;
        if (empty($mysqli[$index])) {
            $mysqli[$index] = new \ApiDocs\Core\Db\Mysql(self::getDbConfig($index));
        }
        return $mysqli[$index];
    }

    public static function getDbConfig($index) {
        $config = \ApiDocs\Core\Config::get('db');
        return $config[$index];
    }
}