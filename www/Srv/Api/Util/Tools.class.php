<?php
namespace ApiDocs\Api\Util;
/**
 * 工具类
 * Created by DannyWang
 * jue.wang@yulore.com
 * 2015-06-23
 */
class Tools {
    public static function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    /**
     * CURL请求方法
     * @param $url 请求URL
     * @param string $method 请求方式[GET,POST,PUT,DELETE]
     * @param array $headers 请求头数组
     * @param array $data 请求数据数组
     * @param string $data_type 数据类型[query_string,json,raw]
     * @param array $cookie_arr cookie信息数组
     * @return mixed|string
     */
    public static function curl($url, $method = 'GET', $headers = array(), $data = array(), $data_type = 'query_string', $cookie_arr = null, $timeout = 5) {
        $handle = curl_init();
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($handle, CURLOPT_TIMEOUT, $timeout);

        //set header
        if (!empty($headers)) {
            curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
        }
        //set cookie
        if (!empty($cookie_arr)) {
            $cookiestr = array();
            foreach ($cookie_arr as $cname => $cvalue) {
                $cookiestr[] = "$cname=$cvalue";
            }
            curl_setopt($handle, CURLOPT_COOKIE, implode(';', $cookiestr));
        }
        //set data
        if (!empty($data)) {
            if ($data_type == 'json') {
                $post_data = json_encode($data);
            } elseif ($data_type == 'raw') {
                $post_data = $data;
            } else {
                $post_data = http_build_query($data);
            }
        }

        switch (strtoupper($method)) {
            case 'GET':
                break;
            case 'POST':
                curl_setopt($handle, CURLOPT_POST, true);
                if (!empty($data)) {
                    curl_setopt($handle, CURLOPT_POSTFIELDS, $post_data);
                }
                break;
            case 'PUT':
                curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'PUT');
                if (!empty($data)) {
                    curl_setopt($handle, CURLOPT_POSTFIELDS, $post_data);
                }
                break;

            case 'DELETE':
                curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
                break;
        }
        $output = curl_exec($handle);
        $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        if ($code != 200) {
            $output = 'curl http request error.code:' . $code . ' response info' . $output;
        }

        if($errno = curl_errno($handle)) {
            \ApiDocs\Core\Log::error('CURL异常：url:'.$url.', method:'.$method);
            \ApiDocs\Core\Log::error('CURL异常：curl_error:' .curl_error($handle). ', error_no:' .$errno. ' - ['. \ApiDocs\Api\Util\Http::$curl_strerror[$errno] .']');
        }
        curl_close($handle);
        return $output;
    }

    /**
     * 添加url参数（get）
     * @param $url 原始url
     * @param $params_arr 添加的参数数组
     * @return string 添加后的url
     */
    public static function  addUrlTail($url, $params_arr) {
        if (is_array($params_arr) && count($params_arr) > 0) {
            $url_tail = http_build_query($params_arr);
            if (strpos($url, '?') !== false) {
                $url .= '&' . $url_tail;
            } else {
                $url .= '?' . $url_tail;
            }
        }
        return $url;
    }

    public static function checkSign($apikey, $apisecret, $params_arr, $request_sig) {
        $params_string = $apikey;
        //按key字典排序
        ksort($params_arr);
        //以key-value的形式将参数拼成url参数字符串
        foreach ($params_arr as $key => $value) {
            if (in_array($key, array('s', 'f', 'sig'))) {
                continue;
            }
            $params_string .= $key . $value;
        }
        $params_string .= $apisecret;
        $signed_params_string = strtoupper(sha1(mb_convert_encoding($params_string, 'utf8')));
        if ($signed_params_string !== $request_sig) {
            if (isset($_GET['debug'])) {
                echo "sign is:[$signed_params_string]";
            }
        }
        return $signed_params_string == $request_sig;
    }

    public static function getSign($apikey, $apisecret, $params_arr) {
        $params_string = $apikey;
        //按key字典排序
        ksort($params_arr);
        //以key-value的形式将参数拼成url参数字符串
        foreach ($params_arr as $key => $value) {
            $params_string .= $key . $value;
        }
        $params_string .= $apisecret;
        $signed_params_string = strtoupper(sha1(mb_convert_encoding($params_string, 'utf8')));
        return $signed_params_string;
    }

    /**
     * 旧版黄页接口签名方法验证
     * @param $str 加密前拼接参数
     * @param $sig 生成的签名
     * @param $st 起始位数
     * @param $l 长度
     * @param $alg 加密方式 sha1
     */
    public static function checkSignature($str, $sig, $st, $l, $alg) {
        if ($alg == 'sha1') {
            $svrsig = substr(sha1($str), $st, $l);
        } else {
            $svrsig = '';
        }
        if ($sig != $svrsig) {
            if (isset($_GET['debug'])) {
                echo "sign is:[$svrsig]";
            }
            return false;
        } else {
            return true;
        }
    }

    /**
     * 旧版黄页获取签名方法
     * @param $str 加密前拼接参数
     * @param $st 起始位数
     * @param $l 长度
     * @param $alg 加密方式 sha1
     * @return string 生成的签名
     */
    public static function getSignature($str, $st, $l, $alg) {
        if ($alg == 'sha1') {
            $svrsig = substr(sha1($str), $st, $l);
        } else {
            $svrsig = '';
        }
        return $svrsig;
    }

    /**
     * 检查提交参数是否为空
     * @param $param
     * @return bool
     */
    public static function checkRequestEmpty($param) {
        if (!isset($_REQUEST[$param]) || $_REQUEST[$param] == "") {
            return false;
        } else {
            return true;
        }
    }

}
