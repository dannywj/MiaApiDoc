<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */

namespace ApiDocs\Api\Docs;

class Struct extends \ApiDocs\Api\Base\ApiBase {
    public function getAllList() {
        $sql = "SELECT * FROM struct_info ORDER BY name ASC ";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }

    public function getOneByName() {
        $name = $this->checkParam('name');
        $sql = "SELECT * FROM struct_info where name='{$name}' ";
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
        $sql = "DELETE FROM struct_info where id={$id}";
        $db = parent::getDbApiDocs();
        $result = $db->query($sql);
        if ($db->affected_rows === 1) {
            $this->success($result);
        } else {
            $this->error(103);
        }
    }

    public function checkExists() {
        $name = $this->checkParam('name');
        $sql = "SELECT * FROM struct_info where name='{$name}' ";
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
        $struct_data = $this->checkParam('struct_data');
        $arr_struct_data = json_decode($struct_data, true);
        $info = array(
            'name' => $arr_struct_data['struct_name'],
            'desp' => $arr_struct_data['struct_desp'],
            'params' => json_encode($arr_struct_data['params']),
            'create_user' => $this->user_info['username'],
            'add_time' => date('Y-m-d H:i:s'),
        );
        $db = parent::getDbApiDocs();
        $id = $db->Insert($info, 'struct_info');
        if ($id) {
            $this->success($id);
        } else {
            $this->error(103);
        }
    }

    public function updateOne() {
        $this->checkLogin();
        $struct_data = $this->checkParam('struct_data');
        $arr_struct_data = json_decode($struct_data, true);
        $id = $arr_struct_data['id'];
        $name = $arr_struct_data['struct_name'];
        $desp = $arr_struct_data['struct_desp'];
        $params = json_encode($arr_struct_data['params']);

        $last_modify_user = $this->user_info['username'];
        $update_time = date('Y-m-d H:i:s');

        $sql = "update struct_info set name='{$name}',desp='{$desp}',params='{$params}',
                last_modify_user='{$last_modify_user}',update_time='{$update_time}'
                where id={$id}";
        $db = parent::getDbApiDocs();
        $result = $db->query($sql);
        if ($db->affected_rows === 1) {
            $this->success($result);
        } else {
            $this->error(103);
        }
    }
}