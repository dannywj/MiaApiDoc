<?php
/**
 * Created by DannyWang
 * wangjue@mia.com
 * 2017/7/17
 */

namespace ApiDocs\Api\Docs;

class Content extends \ApiDocs\Api\Base\ApiBase {
    public function getAll() {
        $sql = "SELECT * FROM content_info";
        $db = parent::getDbApiDocs();
        $result = $db->Select($sql);
        $this->success($result);
    }

    public function addOne() {
        $this->checkLogin();
        $title = $this->checkParam('title');
        $content = $this->checkParam('content');
        $project_id = $this->checkParam('project_id');

        $title = addslashes($title);
        $content = addslashes($content);

        $info = array(
            'title' => $title,
            'content' => $content,
            'project_id' => $project_id,
            'create_user' => $this->user_info['username'],
            'last_modify_user' => '',
            'add_time' => date('Y-m-d H:i:s'),
            'update_time' => '',
        );
        $db = parent::getDbApiDocs();
        $id = $db->Insert($info, 'content_info');
        if ($id) {
            $this->success($id);
        } else {
            $this->error(103);
        }
    }

    public function getOne() {
        $id = $this->checkParam('id');
        $sql = "SELECT * FROM content_info where id={$id}";
        $db = parent::getDbApiDocs();
        $result = $db->GetOne($sql);
        $this->success($result);
    }

    public function updateOne() {
        $this->checkLogin();
        $id = $this->checkParam('id');
        $title = $this->checkParam('title');
        $content = $this->checkParam('content');
        $project_id = $this->checkParam('project_id');

        $last_modify_user = $this->user_info['username'];
        $update_time = date('Y-m-d H:i:s');

        $title = addslashes($title);
        $content = addslashes($content);
        $sql = "update content_info set title='{$title}',content='{$content}',project_id='{$project_id}',
                last_modify_user='{$last_modify_user}',update_time='{$update_time}' where id={$id}";
        $db = parent::getDbApiDocs();

        $result = $db->query($sql);
        if ($db->affected_rows === 1) {
            $this->success($result);
        } else {
            $this->error(103);
        }
    }

    public function deleteOne() {
        $this->checkLogin('admin');
        $id = $this->checkParam('id');
        $sql = "DELETE FROM content_info where id={$id}";
        $db = parent::getDbApiDocs();
        $result = $db->query($sql);
        if ($db->affected_rows === 1) {
            $this->success($result);
        } else {
            $this->error(103);
        }
    }
}