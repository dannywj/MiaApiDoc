<?php
/**
 * 配置类
 * Created by DannyWang
 * 2015-07-20
 */
namespace ApiDocs\Core;

class Config {
    /**
     * 获取配置文件配置
     * @param string $file
     * @return mixed
     * @throws Exception\ServerException
     */
    public static function get($file = '') {
        static $configs;
        if (!isset($configs[$file])) {
            $path = SYSTEM_PATH . 'Config/' . $file . '.php';
            if (is_file($path)) {
                $configs[$file] = include $path;
                if (isset($configs[$file]['online'])) {
                    $configs[$file] = $configs[$file][ENV];
                }
            } else {
                throw new \ApiDocs\Core\Exception\ServerException('Invalid config file');
            }
        }
        return $configs[$file];
    }

    /**
     * 获取配置文件指定key的配置
     * @param $file
     * @param $key
     * @return null
     * @throws Exception\ServerException
     */
    public static function getValue($file, $key) {
        $config = self::get($file);
        return isset($config[$key]) ? $config[$key] : null;
    }
}