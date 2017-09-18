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

 Date: 18/09/2017 16:17:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of project_info
-- ----------------------------
INSERT INTO `project_info` VALUES (1, 'API');

SET FOREIGN_KEY_CHECKS = 1;
