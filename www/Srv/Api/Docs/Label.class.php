<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */

namespace ApiDocs\Api\Docs;

class Label extends \ApiDocs\Api\Base\ApiBase {
    public function getAll() {
        $sql = "SELECT * FROM label_info ORDER BY sort ASC ";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }


    public function addOne() {
        $this->checkLogin();
        $label_name = $this->checkParam('label_name');
        $info = array(
            'label_name' => $label_name,
            'sort' => 0,
        );
        $db = parent::getDbApiDocs();
        $id = $db->Insert($info, 'label_info');
        if ($id) {
            $this->success($id);
        } else {
            $this->error(103);
        }
    }

    public function updateSort() {
         $this->checkLogin();
        $ids = $this->checkParam('ids');
        $id_arr = explode(',', $ids);
        //print_r($id_arr);
        $db = parent::getDbApiDocs();
        if (!empty($id_arr) && is_array($id_arr)) {
            $count = count($id_arr);
            foreach ($id_arr as $k => $v) {
                $sort = $count - $k;
                $id = (int)$v;
                $sql = "update label_info set sort={$sort} where id={$id}";
                $result = $db->query($sql);
            }
            $this->success(true);
        } else {
            $this->error(103);
        }


    }
}