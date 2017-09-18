<?php
/**
 * API入口文件
 * Created by DannyWang
 * 2015-07-20
 */
define('ENV', 'online');
define('DEBUG', true);
require(__DIR__ . '/Core/Init.php');
$api = new  ApiDocs\Api\Api();
$api->init();
