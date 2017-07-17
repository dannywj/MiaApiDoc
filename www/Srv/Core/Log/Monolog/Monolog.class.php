<?php
/**
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2014-11-27
 */
namespace ApiDocs\Core\Log\Monolog;

/**
 * 文件日志类
 * Class Monolog
 * @package ApiDocs\Core\Log\Monolog
 */
class Monolog {
    private $_log;
    static private $_logName;

    public function __construct() {
        require(__DIR__ . '/autoload.php');
        $this->_log = new \Monolog\Logger(self::$_logName);
        $path = \ApiDocs\Core\Config::getValue('log', 'log_root_path') . self::$_logName . '.log';
        $this->_log->pushHandler(new \Monolog\Handler\StreamHandler($path, \Monolog\Logger::DEBUG));
    }

    private function _log($level, $info, $dataArr) {
        if ($level == 'info') {
            $this->_log->addInfo($info, $dataArr);
        }
        if ($level == 'error') {
            $this->_log->addError($info, $dataArr);
        }
        if ($level == 'debug') {
            $this->_log->addDebug($info, $dataArr);
        }
    }

    static function getInstance($loger_name) {
        self::$_logName = $loger_name;
        return new Monolog();
    }

    public function info($info, $dataArr = array()) {
        $this->_log('info', $info, $dataArr);
    }

    public function error($info, $dataArr = array()) {
        $this->_log('error', $info, $dataArr);
    }

    public function debug($info, $dataArr = array()) {
        $this->_log('debug', $info, $dataArr);
    }
}

?>