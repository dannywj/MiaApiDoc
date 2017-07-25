<?php
/**
 * 错误代码处理类
 * Created by DannyWang
 * 2015-07-24
 */
namespace ApiDocs\Core;

class ErrorCode {
    /**
     * 根据错误代码获取友好的提示信息
     * @param $code
     * @return mixed
     */
    public static function getMessage($code) {
        $config=\ApiDocs\Core\Config::getValue('errorlist',$code);
        return $config['message'];
    }

    /**
     * 根据错误代码获取系统提示信息
     * @param $code
     * @return mixed
     */
    public static function getInfo($code) {
        $config=\ApiDocs\Core\Config::getValue('errorlist',$code);
        return $config['info'];
    }

}

?>