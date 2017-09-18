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

 Date: 18/09/2017 16:17:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for version_info
-- ----------------------------
DROP TABLE IF EXISTS `version_info`;
CREATE TABLE `version_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '版本号',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of version_info
-- ----------------------------
INSERT INTO `version_info` VALUES (1, '5_7', '2017-09-14 20:26:49');
INSERT INTO `version_info` VALUES (2, '5_8', '2017-09-15 20:14:19');

SET FOREIGN_KEY_CHECKS = 1;
