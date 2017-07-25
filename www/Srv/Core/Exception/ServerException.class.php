<?php
/**
 * Created by DannyWang
 * 2015-07-15
 */
namespace ApiDocs\Core\Exception;
class ServerException extends \Exception {
    public function __construct($message = "") {
        parent::__construct($message, 501);
    }
}