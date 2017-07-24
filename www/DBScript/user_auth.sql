/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-24 11:07:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_auth
-- ----------------------------
DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE `user_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `auth_id` varchar(200) NOT NULL COMMENT '登录授权码',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `expire_time` datetime NOT NULL COMMENT '过期时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_auth
-- ----------------------------
INSERT INTO `user_auth` VALUES ('1', '1', 'f7a3a77ccda09cdaafac1f4a49bd9807', '2017-07-20 11:25:48', '2017-07-27 11:25:48');
INSERT INTO `user_auth` VALUES ('2', '1', 'a80034e658bb0a6b6bd46b441693898c', '2017-07-20 11:30:20', '2017-07-27 11:30:20');
INSERT INTO `user_auth` VALUES ('3', '1', 'c1032d01fafb22135ddac61c16b197d0', '2017-07-20 11:36:44', '2017-07-27 11:36:44');
INSERT INTO `user_auth` VALUES ('4', '1', '41e2f364d2a73de3cede196499a5a5a3', '2017-07-20 11:57:18', '2017-07-27 11:57:18');
INSERT INTO `user_auth` VALUES ('5', '1', '696113b1819c439156821a918aade87b', '2017-07-20 11:59:07', '2017-07-27 11:59:07');
INSERT INTO `user_auth` VALUES ('6', '1', '1680b02e733773a161bc5b499f9e44c7', '2017-07-20 12:03:05', '2017-07-27 12:03:05');
INSERT INTO `user_auth` VALUES ('7', '1', 'b419f14e5c118f72fd363307c2e942fe', '2017-07-20 13:18:32', '2017-07-27 13:18:32');
INSERT INTO `user_auth` VALUES ('8', '1', '5587174f2ef2c431630699ba2d6c9f69', '2017-07-20 13:49:24', '2017-07-27 13:49:24');
INSERT INTO `user_auth` VALUES ('9', '1', '4671d66f54366284c093116e9a7d1c35', '2017-07-20 15:18:09', '2017-07-27 15:18:09');
INSERT INTO `user_auth` VALUES ('10', '1', '4e7b960ed7d81e0e1bf888dd02ffaf0a', '2017-07-20 15:25:34', '2017-07-27 15:25:34');
INSERT INTO `user_auth` VALUES ('11', '1', '1f9448e0ffc9b567124f39f605043a50', '2017-07-20 15:55:37', '2017-07-27 15:55:37');
INSERT INTO `user_auth` VALUES ('12', '1', '4a369804cbe6c7ecc6d4e7a98eb47cae', '2017-07-20 16:03:38', '2017-07-27 16:03:38');
INSERT INTO `user_auth` VALUES ('13', '1', 'da4341fb4ed152247cbe6ed568795472', '2017-07-20 16:37:28', '2017-07-27 16:37:28');
INSERT INTO `user_auth` VALUES ('14', '1', 'aca0a2ce1cb04e556a31a0d0f378a016', '2017-07-20 17:18:27', '2017-07-27 17:18:27');
INSERT INTO `user_auth` VALUES ('15', '1', '067dba1814ac26208f7d9f0696a144b3', '2017-07-21 10:39:20', '2017-07-28 10:39:20');
INSERT INTO `user_auth` VALUES ('16', '1', '90a4daadebe0c77cdc13a9f6ef483d28', '2017-07-21 10:39:52', '2017-07-28 10:39:52');
INSERT INTO `user_auth` VALUES ('17', '1', 'c93091ff39609c61aad370226084401d', '2017-07-21 10:39:59', '2017-07-28 10:39:59');
INSERT INTO `user_auth` VALUES ('18', '1', '575af379a5bc0eee11e272e29e196dd1', '2017-07-21 11:13:28', '2017-07-28 11:13:28');
INSERT INTO `user_auth` VALUES ('19', '1', '34df00f3d04a04d65a2639d9c135bc54', '2017-07-21 11:30:18', '2017-07-28 11:30:18');
INSERT INTO `user_auth` VALUES ('20', '2', 'd4545df0b8aeb512091eb4bd85fcafce', '2017-07-24 11:02:03', '2017-07-31 11:02:03');
INSERT INTO `user_auth` VALUES ('21', '1', 'a675a3f8dfa67e52a65cf8acc598fe65', '2017-07-24 11:02:41', '2017-07-31 11:02:41');
