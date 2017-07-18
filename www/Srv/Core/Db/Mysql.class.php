<?php
/**
 * Mysql操作类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-15
 */
namespace ApiDocs\Core\Db;

class Mysql extends \mysqli {
    public function __construct($config) {
        parent::__construct($config['host'], $config['user'], $config['password'], $config['dbname'], $config['port']);
        if ($this->connect_error) {
            throw new \ApiDocs\Core\Exception\ServerException('databases[' . $config['dbname'] . '] ' . $this->connect_errno . ' [' . $this->connect_error . '] ');
        }
        $this->set_charset($config['charset']);
    }

    public function Select($sql, $key = '') {
        $result = $this->query($sql);
        if ($result === false) {
            throw new \ApiDocs\Core\Exception\ServerException('databases error:' . $this->error);
        }
        $lists = [];
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            if (!empty($key)) {
                $lists[$row[$key]] = $row;
            } else {
                $lists[] = $row;
            }
        }
        $result->free();
        return $lists;
    }

    public function GetOne($sql) {
        $lists = $this->Select($sql);
        return isset($lists[0]) ? $lists[0] : null;
    }

    public function Insert($lists, $table) {
        $this->BatchInsert($lists, $table);
        return $this->insert_id;
    }

    public function BatchInsert($lists, $table) {
        $info = [];
        if (!isset($lists[0]) || !is_array($lists[0])) {
            $info[] = $lists;
        } else {
            $info = $lists;
        }

        $key = array_keys($info[0]);
        $key = '(`' . implode('`,`', $key) . '`)';
        $values = [];
        foreach ($info as $var) {
            $values[] = "('" . implode("','", array_map('addslashes', $var)) . "')";
        }
        $value = implode(',', $values);

        $sql = "INSERT INTO `" . $table . "` " . $key . " VALUES " . $value;
        \ApiDocs\Core\Log::info('insert sql:' . addslashes($sql));
        $this->query($sql);
        return $this->insert_id;
    }
}
