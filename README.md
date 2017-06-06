Mia API Docs——让你的API文档书写更简单，高效，有乐趣。
=====================================================

项目介绍
--------

**Mia API Docs**是一款基于web的API文档生成工具，相比于传统的文档书写体验，此工具无论是易用性还是高效性均有明显提高。通过表单形式的API参数录入，使其可以方便的生成指定格式的文档而且便于维护和迁移。此外，该工具还可以一键生成示例返回值，方便将多方联调时间前置。

功能简介
--------

-   API接口，参数表单形式录入，更新。支持参数的多属性选择（如是否必选，是否是数组结构）

-   API参数结构体支持。支持除基本数据类型以外的用户自定义结构体类型参数管理

-   结果同步预览。支持所见即所得的API文档预览功能。

-   一键生成wiki code。方便一键导出wiki格式的文档代码，支持表格控件展示

-   一键生成返回值json示例。一键可生成API接口的返回值JSON结构，其中的示例数据为根据参数定义的数据类型的随机值，方便客户端前期联调。

-   支持参数属性高亮提示。使用特殊符号“[[ ]]”将需要标红的说明文字包围，即可生成带有高亮信息的代码片段。

使用说明
--------

该工具全部Html5静态化处理，无需部署服务端环境，浏览器直接可以运行。

tips：由于使用了WebSQL技术，建议使用Chrome浏览器运行，防止出现兼容性问题。

页面说明
--------

*list.html*

API及结构体列表，以及新建API，新建Struct的功能。
![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/list.png)

*api.html*

API文档录入，管理页面。
![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/new%20api.png)
*struct.html*

API结构体录入，管理页面。
![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/new%20struct.png)

轻松上手
--------
![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/api1.png)

![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/api2.png)

![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/api3.png)

![](https://raw.githubusercontent.com/dannywj/MiaApiDoc/master/demo%20image/api4.png)


技术说明&环境要求
-----------------

前端技术：vue.js jquery WebSQL

其中需要使用支持WebSQL的浏览器运行，如chrome，Safari，Opera

版本信息
--------

### Ver1.0
完成基本功能

### Ver1.5
添加PHP代码生成

type自动提示，包括自定义结构体

列表页增加结构体搜索功能

文档自动保存提示

type增加默认值：string

bugfix：新建页面重复点击save会生成多个记录

### Ver1.6
随机数算法调整，生成不同数值

去除全局域名配置，改为相对路径跳转

不支持的浏览器错误提示优化

