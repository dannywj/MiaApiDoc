<?php
/**
 * Log处理类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-20
 */
namespace ApiDocs\Core;
class Log {
    public static function info($info, $dataArr = array(), $file_name = 'ApiDocsLog') {
        $logger = \ApiDocs\Core\Log\Monolog\Monolog::getInstance($file_name);
        $logger->info($info, $dataArr);

        $db_logger = \ApiDocs\Core\Log\DbLog\DbLog::getInstance('ApiDocs');
        $db_logger->info($info, $dataArr);
    }

    public static function error($info, $dataArr = array(), $file_name = 'ApiDocsLog') {
        $logger = \ApiDocs\Core\Log\Monolog\Monolog::getInstance($file_name);
        $logger->error($info, $dataArr);

        $db_logger = \ApiDocs\Core\Log\DbLog\DbLog::getInstance('ApiDocs');
        $db_logger->error($info, $dataArr);
    }

    public static function debug($info, $dataArr = array(), $file_name = 'ApiDocsLog') {
        $logger = \ApiDocs\Core\Log\Monolog\Monolog::getInstance($file_name);
        $logger->debug($info, $dataArr);

        $db_logger = \ApiDocs\Core\Log\DbLog\DbLog::getInstance('ApiDocs');
        $db_logger->error($info, $dataArr);
    }
}