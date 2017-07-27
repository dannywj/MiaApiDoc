<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */

namespace ApiDocs\Api\Docs;

class Project extends \ApiDocs\Api\Base\ApiBase {
    public function getAll() {
        $sql = "SELECT * FROM project_info";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }

}