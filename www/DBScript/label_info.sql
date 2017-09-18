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

 Date: 18/09/2017 16:17:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for label_info
-- ----------------------------
DROP TABLE IF EXISTS `label_info`;
CREATE TABLE `label_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签名称',
  `sort` int(11) NULL DEFAULT NULL COMMENT '标签排序 越大越靠前',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of label_info
-- ----------------------------
INSERT INTO `label_info` VALUES (0, '其它', 7);
INSERT INTO `label_info` VALUES (1, '会员', 16);
INSERT INTO `label_info` VALUES (2, '首页', 15);
INSERT INTO `label_info` VALUES (3, '团购', 14);
INSERT INTO `label_info` VALUES (4, '会员plus', 18);
INSERT INTO `label_info` VALUES (5, '秒杀', 10);
INSERT INTO `label_info` VALUES (6, '商品详情', 11);
INSERT INTO `label_info` VALUES (7, '购物车', 12);
INSERT INTO `label_info` VALUES (8, '订单', 13);
INSERT INTO `label_info` VALUES (9, '频道页', 9);
INSERT INTO `label_info` VALUES (11, '注册登录', 8);
INSERT INTO `label_info` VALUES (14, '售后', 5);
INSERT INTO `label_info` VALUES (16, '列表', 4);
INSERT INTO `label_info` VALUES (17, '提现', 17);
INSERT INTO `label_info` VALUES (18, '结算下单', 3);
INSERT INTO `label_info` VALUES (19, '支付', 2);
INSERT INTO `label_info` VALUES (22, '分类', 0);

SET FOREIGN_KEY_CHECKS = 1;
