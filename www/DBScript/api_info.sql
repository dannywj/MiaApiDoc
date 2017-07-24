/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-24 11:06:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for api_info
-- ----------------------------
DROP TABLE IF EXISTS `api_info`;
CREATE TABLE `api_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT 'API中文名称',
  `url` varchar(255) DEFAULT NULL COMMENT '接口URL',
  `desp` varchar(255) DEFAULT NULL COMMENT 'API补充描述（暂未使用）',
  `input_params` text COMMENT '输入参数JSON',
  `output_params` text COMMENT '输出参数JSON',
  `label_id` int(11) DEFAULT NULL COMMENT 'API标签id，标识不同业务类型',
  `version` varchar(20) DEFAULT NULL COMMENT '版本',
  `create_user` varchar(50) DEFAULT NULL COMMENT '创建者',
  `last_modify_user` varchar(50) DEFAULT NULL COMMENT '上次修改用户',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_info
-- ----------------------------
INSERT INTO `api_info` VALUES ('1', '会员专区模板', 'member/template', '会员信息desp', '[{\"id\":1,\"name\":\"content_type\",\"type\":\"string\",\"desp\":\"请求的内容类型：template-模板信息，member-会员信息，为空返回全部\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[{\"id\":1,\"name\":\"member_info\",\"type\":\"member_info\",\"desp\":\"会员信息\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":false}},{\"id\":2,\"name\":\"template_info\",\"type\":\"template_info\",\"desp\":\"内容模板信息\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":false}}]', '1', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-21 14:54:57');
INSERT INTO `api_info` VALUES ('15', '用户首页信息', 'account/index', '', '[]', '[{\"id\":1495073354279,\"name\":\"background_pic\",\"type\":\"img_pic\",\"desp\":\"顶部背景图片\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495073362658,\"name\":\"member_icon_tag\",\"type\":\"string\",\"desp\":\"会员图标角标文字\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495073368430,\"name\":\"user_asset_info\",\"type\":\"user_asset_info\",\"desp\":\"用户资产信息结构体，未登录为空\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1495073460986,\"name\":\"my_groupon_icon_tag\",\"type\":\"string\",\"desp\":\"我的拼团角标文字[[add in 5.5]]\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '2', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-24 10:17:39');
INSERT INTO `api_info` VALUES ('16', '团长免单优惠券列表', 'groupon/freeCouponList', '', '[{\"id\":1495101810398,\"name\":\"page\",\"type\":\"int\",\"desp\":\"当前页码，从1开始\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[{\"id\":1495074138137,\"name\":\"rule_banner\",\"type\":\"new_banner_info\",\"desp\":\"免单规则图片banner\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1495074375367,\"name\":\"free_coupon_list\",\"type\":\"free_coupon\",\"desp\":\"免单券列表 (见：[wiki:v5.5结构体])\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}},{\"id\":1495074456801,\"name\":\"get_tips\",\"type\":\"string\",\"desp\":\"如何获得弹出文案\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '3', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-21 14:54:54');
INSERT INTO `api_info` VALUES ('18', '我的拼团', 'groupon/myGrouponList/', '', '[{\"id\":1495074950838,\"name\":\"groupon_status\",\"type\":\"int\",\"desp\":\"拼团状态 （0-全部，1-拼团中，2-拼团成功，3-拼团失败）\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495074953803,\"name\":\"page\",\"type\":\"int\",\"desp\":\"当前页码\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}}]', '[{\"id\":1495074971578,\"name\":\"my_groupon_list\",\"type\":\"my_groupon_info\",\"desp\":\"我的拼团列表 [[update in 5.5]]\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}}]', '3', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-21 14:54:54');
INSERT INTO `api_info` VALUES ('20', '参团详情', 'groupon/info/', '', '[{\"id\":1495076453446,\"name\":\"groupon_son_id\",\"type\":\"int\",\"desp\":\"子团id\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}}]', '[{\"id\":1495076468756,\"name\":\"groupon_info\",\"type\":\"groupon_info\",\"desp\":\"参团信息\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495076474488,\"name\":\"share_info\",\"type\":\"groupon_share_info\",\"desp\":\"分享信息 [[update in 5.6]]\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495076475310,\"name\":\"button_info_list\",\"type\":\"groupon_button\",\"desp\":\"底部按钮\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}}]', '3', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-21 14:54:54');
INSERT INTO `api_info` VALUES ('22', '测试中', 'test', '', '[{\"id\":1500862167517,\"name\":\"bbbb\",\"type\":\"free_groupon\",\"desp\":\"爱爱爱\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1500449496883,\"name\":\"aaa\",\"type\":\"free_coupon\",\"desp\":\"我们\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[]', '2', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-24 10:15:35');
INSERT INTO `api_info` VALUES ('26', '生生世世', 'aaaa', '', '[{\"id\":1500537827843,\"name\":\"ffff\",\"type\":\"free_groupon\",\"desp\":\"\\u4e8b\\u5b9e\\u4e0a\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[]', '1', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 14:54:54', '2017-07-21 14:54:54');
INSERT INTO `api_info` VALUES ('28', '噩噩噩噩噩', 'eee', '', '[{\"id\":1500628344741,\"name\":\"eee\",\"type\":\"dd\",\"desp\":\"u55d6u55d6u55d6\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[]', '3', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-21 17:12:44', '2017-07-21 17:32:58');
INSERT INTO `api_info` VALUES ('29', '新测试', 'new test', '', '[{\"id\":1500862851915,\"name\":\"bbb\",\"type\":\"int\",\"desp\":\"参数2\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1500862837515,\"name\":\"aaa\",\"type\":\"free_coupon\",\"desp\":\"参数1\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}}]', '[{\"id\":1500862865550,\"name\":\"cc\",\"type\":\"group_modular_info\",\"desp\":\"参数3\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '1', null, 'wangjue@mia.com', 'wangjue@mia.com', '2017-07-24 10:21:31', '2017-07-24 10:22:00');
