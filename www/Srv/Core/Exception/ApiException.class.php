<?php
/**
 * Created by DannyWang
 * 2015-07-15
 */
namespace ApiDocs\Core\Exception;
class ApiException extends \Exception {
    public function __construct($message = "", $status = "") {
        parent::__construct($message, 101);
    }
}