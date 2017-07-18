<?php
/**
 * API基类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015/8/27
 */

namespace ApiDocs\Api\Base;

use ApiDocs\Core\Exception\ApiException;

class ApiBase {
    /**
     * 获取数据库连接
     * @return mixed
     */
    public function getDbApiDocs() {
        return \ApiDocs\Core\Db::get('ApiDocs');
    }

    /**
     * 参数验证&获取
     * @param $key
     * @param null $default_value
     * @return null|string
     * @throws ApiException
     */
    public function checkParam($key, $default_value = null) {
        $result = isset($_REQUEST[$key]) ? trim($_REQUEST[$key]) : "";
        if (empty($result)) {
            if ($default_value === null) {
                throw new ApiException("Invalid arguments:{$key}.");
            } else {
                return $default_value;
            }
        } else {
            return $result;
        }
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