/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-21 11:37:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-开发者 1-管理员',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-正常 1-禁用',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'wangjue@mia.com', '111', '2017-07-20 10:46:55', '1', '0');
