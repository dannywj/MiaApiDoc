/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-24 11:06:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for label_info
-- ----------------------------
DROP TABLE IF EXISTS `label_info`;
CREATE TABLE `label_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label_name` varchar(100) DEFAULT NULL COMMENT '标签名称',
  `sort` int(11) DEFAULT NULL COMMENT '标签排序 越大越靠前',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label_info
-- ----------------------------
INSERT INTO `label_info` VALUES ('1', '会员', '1');
INSERT INTO `label_info` VALUES ('2', '首页', '9');
INSERT INTO `label_info` VALUES ('3', '团购', '3');
