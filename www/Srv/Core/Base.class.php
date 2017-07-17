<?php
/**
 * API核心类
 * 处理类的自动加载及统一错误处理
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-20
 */
namespace ApiDocs\Core;

class Base {
    public static function init() {
        spl_autoload_register('ApiDocs\Core\Base::autoload');
        set_exception_handler('ApiDocs\Core\Base::catchExceptionCallback');
        register_shutdown_function('ApiDocs\Core\Base::fatalErrorCallback');
    }

    public static function autoload($class) {
        $class = str_replace('ApiDocs\\', '', $class);
        $path = SYSTEM_PATH . str_replace('\\', '/', $class) . '.class.php';
        if (is_file($path)) {
            include $path;
        }
    }

    public static function catchExceptionCallback($e) {
        $code = $e->getCode() === 0 ? 500 : $e->getCode();
        $result = array(
            'status' => $code,
            'msg' => \ApiDocs\Core\ErrorCode::getMessage($code),
            'data' => DEBUG ? ($e->getMessage() . ' ' . $e->__toString()) : '',
        );
        \ApiDocs\Core\Log::error("catchExceptionCallback!", $result);
        self::json($result);
    }

    public static function fatalErrorCallback() {
        if ($e = error_get_last()) {
            switch ($e['type']) {
                case E_ERROR:
                case E_PARSE:
                case E_CORE_ERROR:
                case E_COMPILE_ERROR:
                case E_USER_ERROR:
                    $result = array(
                        'status' => 500,
                        'msg' => \ApiDocs\Core\ErrorCode::getMessage(500),
                        'data' => DEBUG ? array(
                            'message' => $e['message'],
                            'file' => $e['file'],
                            'line' => $e['line'],
                        ) : '',
                    );
                    \ApiDocs\Core\Log::error("fatalErrorCallback!", $result);
                    self::json($result);
            }
        }
    }

    public static function json($result) {
        $callback = isset($_GET['callback']) ? trim($_GET['callback']) : '';
        header('Content-Type: application/json; charset=utf-8');
        if (empty($callback)) {
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        } else {
            echo $callback . '(' . json_encode($result, JSON_UNESCAPED_UNICODE) . ')';
        }
        exit;
    }
}
