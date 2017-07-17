/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-17 17:57:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for api_info
-- ----------------------------
DROP TABLE IF EXISTS `api_info`;
CREATE TABLE `api_info` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `desp` varchar(255) DEFAULT NULL,
  `input_params` text,
  `output_params` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of api_info
-- ----------------------------
INSERT INTO `api_info` VALUES ('1', '会员专区模板', '/member/template/', '会员信息desp', '[{\"id\":1,\"name\":\"content_type\",\"type\":\"string\",\"desp\":\"请求的内容类型：template-模板信息，member-会员信息，为空返回全部\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[{\"id\":1,\"name\":\"member_info\",\"type\":\"member_info\",\"desp\":\"会员信息\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":false}},{\"id\":2,\"name\":\"template_info\",\"type\":\"template_info\",\"desp\":\"内容模板信息\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":false}}]');
INSERT INTO `api_info` VALUES ('2', '会员信息test', 'member/info', '会员信息desp', '[{\"id\":2,\"name\":\"name2\",\"type\":\"string\",\"desp\":\"desp2\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":false}},{\"id\":3,\"name\":\"name3\",\"type\":\"float\",\"desp\":\"desp3\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1,\"name\":\"name1\",\"type\":\"int\",\"desp\":\"desp1 [[add by 4.5]]\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}}]', '[{\"id\":1,\"name\":\"k1\",\"type\":\"member_info\",\"desp\":\"desp1[[red font]]\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}},{\"id\":1494388290723,\"name\":\"k2\",\"type\":\"string\",\"desp\":\"sss\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":false}}]');
INSERT INTO `api_info` VALUES ('15', '用户首页信息', 'account/index', '', '[]', '[{\"id\":1495073354279,\"name\":\"background_pic\",\"type\":\"img_pic\",\"desp\":\"顶部背景图片\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495073362658,\"name\":\"member_icon_tag\",\"type\":\"string\",\"desp\":\"会员图标角标文字\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495073368430,\"name\":\"user_asset_info\",\"type\":\"user_asset_info\",\"desp\":\"用户资产信息结构体，未登录为空\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1495073460986,\"name\":\"my_groupon_icon_tag\",\"type\":\"string\",\"desp\":\"我的拼团角标文字[[add in 5.5]]\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]');
INSERT INTO `api_info` VALUES ('16', '团长免单优惠券列表', 'groupon/freeCouponList', '', '[{\"id\":1495101810398,\"name\":\"page\",\"type\":\"int\",\"desp\":\"当前页码，从1开始\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]', '[{\"id\":1495074138137,\"name\":\"rule_banner\",\"type\":\"new_banner_info\",\"desp\":\"免单规则图片banner\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}},{\"id\":1495074375367,\"name\":\"free_coupon_list\",\"type\":\"free_coupon\",\"desp\":\"免单券列表 (见：[wiki:v5.5结构体])\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}},{\"id\":1495074456801,\"name\":\"get_tips\",\"type\":\"string\",\"desp\":\"如何获得弹出文案\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":false}}]');
INSERT INTO `api_info` VALUES ('18', '我的拼团', 'groupon/myGrouponList/', '', '[{\"id\":1495074950838,\"name\":\"groupon_status\",\"type\":\"int\",\"desp\":\"拼团状态 （0-全部，1-拼团中，2-拼团成功，3-拼团失败）\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495074953803,\"name\":\"page\",\"type\":\"int\",\"desp\":\"当前页码\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}}]', '[{\"id\":1495074971578,\"name\":\"my_groupon_list\",\"type\":\"my_groupon_info\",\"desp\":\"我的拼团列表 [[update in 5.5]]\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}}]');
INSERT INTO `api_info` VALUES ('20', '参团详情', 'groupon/info/', '', '[{\"id\":1495076453446,\"name\":\"groupon_son_id\",\"type\":\"int\",\"desp\":\"子团id\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}}]', '[{\"id\":1495076468756,\"name\":\"groupon_info\",\"type\":\"groupon_info\",\"desp\":\"参团信息\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495076474488,\"name\":\"share_info\",\"type\":\"groupon_share_info\",\"desp\":\"分享信息 [[update in 5.6]]\",\"is_array\":{\"state\":false},\"is_required\":{\"state\":true}},{\"id\":1495076475310,\"name\":\"button_info_list\",\"type\":\"groupon_button\",\"desp\":\"底部按钮\",\"is_array\":{\"state\":true},\"is_required\":{\"state\":true}}]');
