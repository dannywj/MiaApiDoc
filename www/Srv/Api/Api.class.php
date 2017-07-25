<?php
/**
 * API初始化类
 * Created by DannyWang
 * 2015-07-15
 */

namespace ApiDocs\Api;

include __DIR__ . '/Config.php';

class Api {

    private $_api_path;
    private $_api_function;

    /**
     * 初始化
     * @throws \ApiDocs\Core\Exception\ServerException
     */
    public function init() {
        $this->_checkApi();
        $this->_loadApiClass();
    }

    /**
     * 检查API系统级参数
     * @throws \ApiDocs\Core\Exception\ServerException
     */
    private function _checkApi() {
        $service = isset($_GET['s']) ? trim($_GET['s']) : '';
        $function = isset($_GET['f']) ? trim($_GET['f']) : '';
        if (empty($service)) {
            throw new \ApiDocs\Core\Exception\ServerException('Invalid service');
        }
        if (empty($function)) {
            throw new \ApiDocs\Core\Exception\ServerException('Invalid function');
        }

        // 过滤..和首尾的/
        $service = str_replace('.', '', $service);
        $service = trim($service, '/\\');
        $service = str_replace('/', '\\', $service);
        // 过滤f参数格式
        if (!ereg("^[0-9a-zA-Z\_]*$", $function)) {
            throw new \ApiDocs\Core\Exception\ServerException('Invalid function value');
        }
        $this->_api_path = $service;
        $this->_api_function = $function;
    }

    /**
     * 加载执行API子类,方法
     */
    private function _loadApiClass() {
        $clas_name = "\\ApiDocs\\Api\\" . $this->_api_path;
        $class = new $clas_name();
        $func = $this->_api_function;
        $class->$func();
    }
}
