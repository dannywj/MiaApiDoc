/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-24 11:07:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户类型 0-开发者 1-管理员',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户状态 0-正常 1-禁用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'wangjue@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-20 10:46:55', '1', '0');
INSERT INTO `user_info` VALUES ('2', 'test@111.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-24 11:01:17', '0', '0');
