<?php
/**
 * API初始化
 * 环境配置
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-15
 */
//error_reporting(0);
define('SYSTEM_PATH', dirname(__DIR__) . '/');
header('Content-Type: text/html; charset=utf-8');
function_exists('date_default_timezone_set') && date_default_timezone_set('Etc/GMT-8');

include SYSTEM_PATH . "Core/Base.class.php";
ApiDocs\Core\Base::init();