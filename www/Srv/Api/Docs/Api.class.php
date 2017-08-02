<?php

namespace ApiDocs\Api\Docs;
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */
class Api extends \ApiDocs\Api\Base\ApiBase {
    public function getAllList() {
        $order_by = $this->checkParam('order_by', 'id asc');
        $sql = "SELECT a.*,l.label_name,l.sort,l.id as label_id FROM `api_info` a LEFT JOIN label_info l on a.label_id=l.id
                order by sort desc,a.id asc;";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }

    public function getOne() {
        $id = $this->checkParam('id');
        $sql = "SELECT * FROM api_info where id={$id}";
        $db = parent::getDbApiDocs();
        $result = $db->GetOne($sql);
        if (!empty($result)) {
            $this->success($result);
        } else {
            $this->error(301);
        }
    }

    public function deleteOne() {
        $this->checkLogin('admin');
        $id = $this->checkParam('id');
        $sql = "DELETE FROM api_info where id={$id}";
        $db = parent::getDbApiDocs();
        $result = $db->query($sql);
        if ($db->affected_rows === 1) {
            $this->success($result);
        } else {
            $this->error(103);
        }
    }

    public function checkExists() {
        $id = $this->checkParam('id');
        $sql = "SELECT * FROM api_info where id='{$id}' ";
        $db = parent::getDbApiDocs();
        $result = $db->GetOne($sql);
        if (!empty($result)) {
            $this->success(true);
        } else {
            $this->success(false);
        }
    }

    public function addOne() {
        $this->checkLogin();
        $api_data = $this->checkParam('api_data');
        $arr_api_data = json_decode($api_data, true);
        $arr_api_data['api_url'] = trim($arr_api_data['api_url']);
        $arr_api_data['api_url'] = trim($arr_api_data['api_url'], '/');
        $info = array(
            'name' => $arr_api_data['api_name'],
            'url' => $arr_api_data['api_url'],
            'desp' => $arr_api_data['api_desp'],
            'input_params' => json_encode($arr_api_data['input_params'], JSON_UNESCAPED_UNICODE),
            'output_params' => json_encode($arr_api_data['output_params'], JSON_UNESCAPED_UNICODE),
            'create_user' => $this->user_info['username'],
            'add_time' => date('Y-m-d H:i:s'),
            'label_id' => $arr_api_data['label_id'],
        );
        // check url
        $url = strtolower($info['url']);
        $sql = "SELECT * FROM api_info where lower(url)='{$url}' ";
        $db = parent::getDbApiDocs();
        $result = $db->GetOne($sql);
        if (!empty($result)) {
            $this->error(100, 'api: [' . $info['url'] . '] is already exist');
        }

        $id = $db->Insert($info, 'api_info');
        if ($id) {
            $this->success($id);
        } else {
            $this->error(103);
        }
    }

    public function updateOne() {
        $this->checkLogin();
        $api_data = $this->checkParam('api_data');
        $arr_api_data = json_decode($api_data, true);
        $id = $arr_api_data['id'];
        $name = $arr_api_data['api_name'];
        $url = $arr_api_data['api_url'];
        $desp = $arr_api_data['api_desp'];
        $input_params = json_encode($arr_api_data['input_params'], JSON_UNESCAPED_UNICODE);
        $output_params = json_encode($arr_api_data['output_params'], JSON_UNESCAPED_UNICODE);
        $label_id = intval($arr_api_data['label_id']);

        $url = trim($url);
        $url = trim($url, '/');

        $last_modify_user = $this->user_info['username'];
        $update_time = date('Y-m-d H:i:s');

        $db = parent::getDbApiDocs();

        $set_info=array(
            'name'=>$name,
            'url'=>$url,
            'desp'=>$desp,
            'input_params'=>$input_params,
            'output_params'=>$output_params,
            'last_modify_user'=>$last_modify_user,
            'update_time'=>$update_time,
            'label_id'=>$label_id,
        );
        $where="id={$id}";

        $result = $db->Update($set_info,$where,'api_info');

        if ($db->affected_rows === 1) {
            $this->success($result);
        } else {
            $this->error(103);
        }
    }

    public function getAllLabel() {
        $sql = "SELECT * FROM `label_info`;";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }
}