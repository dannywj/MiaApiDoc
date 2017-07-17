<?php
/**
 * 数据库日志记录类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-30
 */
namespace ApiDocs\Core\Log\DbLog;

class DbLog {
    private $_log_conn;
    static private $_logName;

    public function __construct() {
        $this->_log_conn = \ApiDocs\Core\Db::get('ApiDocs');
    }

    private function _log($level, $info, $dataArr) {
        if (is_array($dataArr)) {
            $dataArr = json_encode($dataArr, JSON_UNESCAPED_UNICODE);
        }
        $info = addslashes($info);
        $sql = "insert into api_log(`type`,`level`,`content`,`debug`,`create_time`) values ('" . self::$_logName . "','$level','$info','$dataArr',now())";
        $this->_log_conn->query($sql);
    }

    static function getInstance($loger_name) {
        self::$_logName = $loger_name;
        return new DbLog();
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