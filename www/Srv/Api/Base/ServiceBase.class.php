<?php
/**
 * 服务API基类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-07-15
 */
namespace ApiDocs\Api\Base;
use ApiDocs\Core\Log;

class ServiceBase {
    static $db_ApiDocs;
    static $db_yule;

    private $_apikey;
    private $_auth_id;
    private $_temp_auth_id;
    private $_account_id;
    private $_from;
    protected $is_login = false;

    /**
     * 构造函数
     * apikey及账号授权验证
     */
    function __construct($check_auth = true) {
        //init db
        $this->initDb();

        if ($check_auth) {
            //check apikey ,auth_id
            if (empty($_COOKIE['apikey'])) {
                $this->error(201);
            }
            if (!empty($_COOKIE['auth_id'])) {
                $this->_auth_id = $_COOKIE['auth_id'];
            }
            $this->_apikey = $_COOKIE['apikey'];
            $this->_temp_auth_id = isset($_COOKIE['temp_auth_id']) ? $_COOKIE['temp_auth_id'] : '';
            $this->_from = isset($_COOKIE['stat_ApiDocs_from']) ? $_COOKIE['stat_ApiDocs_from'] : '';

            //check account
            $this->checkAccount($this->_apikey, $this->_auth_id);
        }
    }

    /**
     * 初始化数据库
     */
    private function initDb() {
        self::$db_ApiDocs = \ApiDocs\Core\Db::get('ApiDocs');
    }

    /**
     * 验证账号信息
     * @param $apikey
     * @param $auth_id
     */
    protected function checkAccount($apikey, $auth_id) {
        if (!empty($apikey) && empty($auth_id)) {
            $this->_account_id = 0;
        } else {
            //valid $apikey, $auth_id
            $re = $this->getAccountByAuthid($apikey, $auth_id);
            if (empty($re)) {
                $this->error(202);
            } else {
                $this->_account_id = $re['id'];
                $this->is_login = true;
            }
        }
    }

    /**
     * 账号是否登录
     * @return bool
     */
    protected function isAccountLogin() {
        $re = $this->getAccountByAuthid($this->_apikey, $this->_auth_id);
        if (!empty($re)) {
            return true;
        } else {
            return false;
        }
    }


    public function getApikey() {
        return $this->_apikey;
    }

    /**
     * 获取ApikeyId
     * @return mixed
     */
    public function getApikeyId() {
        $sql = "SELECT id from admin_apikey where apikey='{$this->_apikey}'";
        $result = self::$db_yule->ypGetOne($sql);
        return $result['id'];
    }

    public function getSvckeyId($svckey) {
        $sql = "SELECT id from admin_svckey where svckey='{$svckey}'";
        $result = self::$db_yule->ypGetOne($sql);
        return $result['id'];
    }

    public function getSvckey($svckeyid) {
        $sql = "SELECT svckey from admin_svckey where id='{$svckeyid}'";
        $result = self::$db_yule->ypGetOne($sql);
        return $result['svckey'];
    }

    public function getAuthId() {
        return $this->_auth_id;
    }

    public function getTempAuthId() {
        return $this->_temp_auth_id;
    }

    public function getAccountId() {
        return $this->_account_id;
    }

    public function getFrom(){
        return $this->_from;
    }

    private function getAccountByAuthid($apikey, $auth_id) {
        $sql = "SELECT a.id,a.account,a.apikeyid FROM dict_user_accounts a LEFT JOIN dict_user_accounts_auth au ON a.id=au.accountid
              WHERE au.apikeyid=(SELECT id from admin_apikey where apikey='{$apikey}')
              AND au.authid='{$auth_id}'";
        Log::info("check sql:$sql");
        $result = self::$db_yule->ypGetOne($sql);
        return $result;
    }

    public function getAccountByUid($account_id) {
        $sql = "SELECT au.authid as auth_id,a.apikey FROM  dict_user_accounts_auth au
                left JOIN admin_apikey  a on a.id=au.apikeyid
                where au.accountid={$account_id}
                LIMIT 1";
        $result = self::$db_yule->ypGetOne($sql);
        return $result;
    }

    public function getDbApiDocs() {
        return self::$db_ApiDocs;
    }

    public function getDbYule() {
        return self::$db_yule;
    }

    /**
     * API成功返回
     * @param $data
     * @param string $msg
     */
    public function success($data, $msg = 'success') {
        $result = array(
            'status' => 0,
            'msg' => $msg,
            'data' => $data,
        );
        \ApiDocs\Core\Base::json($result);
    }

    /**
     * API失败返回
     * @param $code 错误代码。需在Config/errorlist.php定义信息
     * @param string $msg 优先读取调用传递过来的值，后读取配置文件的值（该值为返回给前端的信息）
     * @param string $data 其他需要输出的信息
     */
    public function error($code, $msg = '', $data = '') {
        if (empty($msg)) {
            $define_msg = \ApiDocs\Core\ErrorCode::getMessage($code);
            if (empty($define_msg)) {
                $msg_info = '服务器接口异常';
            } else {
                $msg_info = $define_msg;
            }
        } else {
            $msg_info = $msg;
        }

        if (empty($data)) {
            $define_info = \ApiDocs\Core\ErrorCode::getInfo($code);
            if (empty($define_info)) {
                $data_info = '';
            } else {
                $data_info = $define_info;
            }
        } else {
            $data_info = $data;
        }

        $result = array(
            'status' => intval($code),
            'msg' => $msg_info,
            'data' => $data_info,
        );
        \ApiDocs\Core\Base::json($result);
    }
}