<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */

namespace ApiDocs\Api\Docs;

class Version extends \ApiDocs\Api\Base\ApiBase {
    public function getAll() {
        $sql = "SELECT * FROM version_info ORDER BY id DESC ";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }


    public function addOne() {
        $this->checkLogin('admin');
        $version = $this->checkParam('version');
        $info = array(
            'version' => $version,
            'create_time' => date('Y-m-d H:i:s'),
        );
        $db = parent::getDbApiDocs();
        $id = $db->Insert($info, 'version_info');
        if ($id) {
            $this->success($id);
        } else {
            $this->error(103);
        }
    }

    public function generateDoc() {
        $this->checkLogin('admin');
        $version = $this->checkParam('version');
        $gen_api_sql = "create table api_info_gen_{$version} select * from api_info";
        $gen_struct_sql = "create table struct_info_gen_{$version} select * from struct_info";
        $db = parent::getDbApiDocs();
        $result = $db->query($gen_api_sql);
        if (!$result) {
            $this->error(103);
        }
        $result = $db->query($gen_struct_sql);
        if (!$result) {
            $this->error(103);
        }
        $this->success(true);
    }

}