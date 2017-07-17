<?php
namespace ApiDocs\Api\Docs;
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */
class Api extends \ApiDocs\Api\Base\ApiBase  {
    public function getAllList(){
        $sql = "SELECT * FROM api_info";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }
}