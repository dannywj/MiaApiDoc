<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */

namespace ApiDocs\Api\Docs;

class Struct extends \ApiDocs\Api\Base\ApiBase{
    public function getAllList(){
        $sql = "SELECT * FROM struct_info";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }
}