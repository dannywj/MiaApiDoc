/*
 Navicat Premium Data Transfer

 Source Server         : 【Api-doc】172.16.104.207
 Source Server Type    : MySQL
 Source Server Version : 50627
 Source Host           : 172.16.104.207:3307
 Source Schema         : mia_api_docs

 Target Server Type    : MySQL
 Target Server Version : 50627
 File Encoding         : 65001

 Date: 18/09/2017 16:17:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `type` tinyint(4) NOT NULL DEFAULT 0 COMMENT '用户类型 0-开发者 1-管理员',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '用户状态 0-正常 1-禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, 'wangjue@mia.com', '605ed4a95ec3f8573d1011e54d2ccd5d', '2017-07-20 10:46:55', 1, 0);
INSERT INTO `user_info` VALUES (3, 'hepeng@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (4, 'lijunshuai@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (5, 'lizhaoyang@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (6, 'maming1@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (7, 'wangxin@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (8, 'wengxuejie@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (9, 'wangyibo@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (10, 'yulei1@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (11, 'yangxiaobo@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (12, 'zhangliyong@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);
INSERT INTO `user_info` VALUES (13, 'zhangzhensheng@mia.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-07-25 10:46:55', 0, 0);

SET FOREIGN_KEY_CHECKS = 1;
