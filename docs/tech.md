

# 邻动体适能小程序 技术设计文档



| 文档版本 | 修改日期       | 修改人   | 修改内容                     |
| ---- | ---------- | ----- | ------------------------ |
| V1.0 | 2026-03-20 | 技术负责人 | 基于PRD V1.6创建，适配微信小程序技术框架 |



## 1. 技术架构概述



### 1.1 整体架构

本系统采用微信小程序 + 自建后端RESTful API架构，主要组件如下：



* **前端**：微信小程序（原生开发），负责用户交互、页面渲染、调用微信原生能力（登录、支付、分享、定位）。

* **后端**：Node.js + Express（推荐）或Java Spring Boot，提供业务API接口，处理业务逻辑、数据持久化、与微信服务器交互。

* **数据库**：MySQL 8.0+，存储用户、课程、拼团、订单、公告等业务数据。

* **缓存**：Redis 6.0+，用于存储热点数据（如课程列表、拼团状态）、实现分布式锁（防止并发开团）。

* **对象存储**：腾讯云COS/阿里云OSS，存储课程图片、教练证书等静态资源。

* **部署环境**：腾讯云/阿里云云服务器，配置HTTPS证书，保证接口安全。



### 1.2 技术选型建议

| 组件   | 推荐技术栈             | 说明              |
| ---- | ----------------- | --------------- |
| 前端   | 微信小程序原生框架         | 性能最佳，直接调用微信API  |
| 后端   | Node.js + Express | 轻量、开发效率高，便于快速迭代 |
| 数据库  | MySQL 8.0+        | 关系型数据，支持事务      |
| 缓存   | Redis 6.0+        | 支持分布式锁、缓存热点数据   |
| 对象存储 | 腾讯云COS            | 与微信生态集成度高       |
| 部署   | 腾讯云CVM + Nginx    | HTTPS代理，负载均衡    |



### 1.3 核心业务流程

1. **课程配置**：运营后台录入课程，写入 `course` 表。

2. **用户登录**：小程序调用 `wx.login` 获取code，后端换取openid，生成token返回。

3) **开团**：用户发起开团，后端检查课程是否已有进行中拼团（`group` 表 `course_id` 且 `status=0`），若无则创建拼团和订单，返回支付参数；若有则返回错误。

4) **参团**：用户加入已有拼团，创建订单并返回支付参数。

5. **支付**：用户调起微信支付，支付结果通过回调通知后端，更新订单状态和拼团人数，若达到成团人数则更新拼团状态为已成团。

6. **拼团状态检查**：定时任务扫描进行中的拼团，若超过截止时间未成团则自动退款。

7) **我的拼团**：用户查看参与的拼团列表及详情。



## 2. 数据库设计



### 2.1 数据表清单

| 表名             | 说明        |
| -------------- | --------- |
| `user`         | 用户表       |
| `course`       | 课程表       |
| `group`        | 拼团表（拼团实例） |
| `order`        | 订单表       |
| `banner`       | 首页Banner表 |
| `announcement` | 公告表       |
| `admin`        | 后台管理员表    |



### 2.2 表结构详情



#### 2.2.1 `user`（用户表）

| 字段名          | 类型           | 约束                          | 说明                      |
| ------------ | ------------ | --------------------------- | ----------------------- |
| id           | bigint       | PRIMARY KEY AUTO\_INCREMENT | 用户ID                    |
| openid       | varchar(64)  | UNIQUE NOT NULL             | 微信openid                |
| unionid      | varchar(64)  |                             | 微信unionid（可选）           |
| nick\_name   | varchar(64)  |                             | 微信昵称                    |
| avatar\_url  | varchar(255) |                             | 头像URL                   |
| phone        | varchar(20)  |                             | 手机号（授权后获取）              |
| session\_key | varchar(64)  |                             | 微信session\_key（用于解密手机号） |
| create\_time | datetime     | NOT NULL                    | 注册时间                    |
| update\_time | datetime     | NOT NULL                    | 更新时间                    |



#### 2.2.2 `course`（课程表）

| 字段名                 | 类型            | 约束                          | 说明                |
| ------------------- | ------------- | --------------------------- | ----------------- |
| id                  | bigint        | PRIMARY KEY AUTO\_INCREMENT | 课程ID              |
| title               | varchar(100)  | NOT NULL                    | 课程名称              |
| cover               | varchar(255)  |                             | 封面图URL            |
| images              | text          |                             | 轮播图JSON数组         |
| description         | text          |                             | 课程介绍（富文本）         |
| age\_range          | varchar(20)   |                             | 适用年龄，如“3-6岁”      |
| original\_price     | int           | NOT NULL                    | 原价（分）             |
| group\_price        | int           | NOT NULL                    | 拼团价（分）            |
| target\_count       | int           | NOT NULL                    | 成团人数              |
| start\_time         | datetime      | NOT NULL                    | 上课开始时间            |
| end\_time           | datetime      | NOT NULL                    | 上课结束时间            |
| location\_district  | varchar(50)   |                             | 所在区域（如“南山区”）      |
| location\_community | varchar(50)   |                             | 小区名称              |
| location\_detail    | varchar(100)  |                             | 详细地点              |
| longitude           | decimal(10,7) |                             | 经度（用于距离计算）        |
| latitude            | decimal(10,7) |                             | 纬度                |
| deadline            | datetime      | NOT NULL                    | 报名截止时间            |
| coach\_name         | varchar(50)   |                             | 教练姓名              |
| coach\_intro        | text          |                             | 教练简介              |
| coach\_cert         | text          |                             | 教练证书图片JSON数组      |
| status              | tinyint       | NOT NULL DEFAULT 0          | 0-待开始,1-进行中,2-已结束 |
| create\_time        | datetime      | NOT NULL                    | 创建时间              |
| update\_time        | datetime      | NOT NULL                    | 更新时间              |



#### 2.2.3 `group`（拼团表）

| 字段名            | 类型       | 约束                          | 说明                           |
| -------------- | -------- | --------------------------- | ---------------------------- |
| id             | bigint   | PRIMARY KEY AUTO\_INCREMENT | 拼团ID                         |
| course\_id     | bigint   | FOREIGN KEY (course.id)     | 关联课程ID                       |
| current\_count | int      | NOT NULL DEFAULT 1          | 当前参团人数（包含第一个支付用户）            |
| target\_count  | int      | NOT NULL                    | 成团人数（冗余course.target\_count） |
| status         | tinyint  | NOT NULL DEFAULT 0          | 0-进行中,1-已成团,2-已失败            |
| deadline       | datetime | NOT NULL                    | 报名截止时间（冗余course.deadline）    |
| create\_time   | datetime | NOT NULL                    | 创建时间                         |
| update\_time   | datetime | NOT NULL                    | 更新时间                         |



**索引**：`(course_id, status)` 联合索引，用于快速查询课程是否有进行中拼团。



#### 2.2.4 `order`（订单表）

| 字段名             | 类型           | 约束                          | 说明                       |
| --------------- | ------------ | --------------------------- | ------------------------ |
| id              | bigint       | PRIMARY KEY AUTO\_INCREMENT | 订单ID                     |
| order\_no       | varchar(32)  | UNIQUE NOT NULL             | 订单号（业务生成，如时间戳+随机数）       |
| user\_id        | bigint       | FOREIGN KEY (user.id)       | 用户ID                     |
| course\_id      | bigint       | FOREIGN KEY (course.id)     | 课程ID                     |
| group\_id       | bigint       | FOREIGN KEY (group.id)      | 拼团ID                     |
| amount          | int          | NOT NULL                    | 支付金额（分）                  |
| status          | tinyint      | NOT NULL DEFAULT 0          | 0-待支付,1-已支付,2-已退款,3-支付失败 |
| pay\_time       | datetime     |                             | 支付时间                     |
| refund\_time    | datetime     |                             | 退款时间                     |
| refund\_reason  | varchar(255) |                             | 退款原因                     |
| out\_trade\_no  | varchar(64)  |                             | 微信支付商户订单号（微信侧生成）         |
| transaction\_id | varchar(64)  |                             | 微信支付交易号                  |
| create\_time    | datetime     | NOT NULL                    | 创建时间                     |
| update\_time    | datetime     | NOT NULL                    | 更新时间                     |



**索引**：`order_no` 唯一索引；`user_id`；`group_id`。



#### 2.2.5 `banner`（Banner表）

| 字段名          | 类型           | 约束                          | 说明                  |
| ------------ | ------------ | --------------------------- | ------------------- |
| id           | int          | PRIMARY KEY AUTO\_INCREMENT |                     |
| image\_url   | varchar(255) | NOT NULL                    | 图片URL               |
| link\_type   | tinyint      |                             | 0-无链接,1-课程详情,2-页面路径 |
| link\_value  | varchar(255) |                             | 课程ID或页面路径           |
| sort         | int          | NOT NULL DEFAULT 0          | 排序                  |
| status       | tinyint      | NOT NULL DEFAULT 1          | 0-隐藏,1-显示           |
| create\_time | datetime     | NOT NULL                    |                     |



#### 2.2.6 `announcement`（公告表）

| 字段名          | 类型           | 约束                          | 说明        |
| ------------ | ------------ | --------------------------- | --------- |
| id           | int          | PRIMARY KEY AUTO\_INCREMENT |           |
| title        | varchar(100) | NOT NULL                    | 标题        |
| content      | text         | NOT NULL                    | 内容        |
| status       | tinyint      | NOT NULL DEFAULT 1          | 0-隐藏,1-显示 |
| create\_time | datetime     | NOT NULL                    |           |



#### 2.2.7 `admin`（管理员表）

| 字段名          | 类型           | 约束                          | 说明           |
| ------------ | ------------ | --------------------------- | ------------ |
| id           | int          | PRIMARY KEY AUTO\_INCREMENT |              |
| username     | varchar(50)  | UNIQUE NOT NULL             | 用户名          |
| password     | varchar(255) | NOT NULL                    | 加密密码（bcrypt） |
| last\_login  | datetime     |                             | 最后登录时间       |
| create\_time | datetime     | NOT NULL                    |              |



## 3. 接口设计



### 3.1 接口规范

* **基础路径**：`https://api.example.com/api/v1`（需配置HTTPS）

* **请求方式**：GET/POST/PUT/DELETE

* **数据格式**：JSON

* **认证方式**：JWT token，在请求头 `Authorization: Bearer <token>` 中传递；token从登录接口获取。

* **响应格式**：



### 3.2 家长端接口



#### 3.2.1 用户登录

* **URL**：`/user/login`

* **Method**：POST

* **请求参数**：

* **响应**：

* **说明**：后端通过code调用微信接口 `jscode2session` 获取openid和session\_key，生成JWT token返回。首次登录自动创建用户记录。



#### 3.2.2 绑定手机号

* **URL**：`/user/bind-phone`

* **Method**：POST

* **请求参数**：

* **响应**：标准返回

* **说明**：使用session\_key解密获取手机号，更新用户表phone字段。可跳过。



#### 3.2.3 获取首页课程列表

* **URL**：`/course/list`

* **Method**：GET

* **请求参数**（Query String）：

  * `tab`：string，`all`（全部课程，默认）或 `recent`（最近开课）

  * `latitude`：number，用户纬度（用于距离计算，全部课程时需要）

  * `longitude`：number，用户经度

  * `page`：int，页码，默认1

  * `size`：int，每页条数，默认10

* **响应**：

* **说明**：只返回报名截止时间未过的课程（`deadline > now`）。`current_count` 通过关联 `group` 表（`course_id` 且 `status=0`）获取，若无则为0。



#### 3.2.4 获取课程详情

* **URL**：`/course/{courseId}`

* **Method**：GET

* **响应**：



#### 3.2.5 开团（创建拼团并下单）

* **URL**：`/group/create`

* **Method**：POST

* **请求参数**：

* **响应**：

* **错误码**：

  * 1001：课程不存在

  * 1002：课程已截止报名

  * 1003：该课程已有进行中拼团，请直接加入

* **说明**：

  * 需检查课程是否存在且 `deadline > now`。

  * 使用Redis分布式锁（key=`course:lock:{courseId}`）防止并发开团。若获取锁失败，重试或返回错误。

  * 检查 `group` 表中是否有该课程 `status=0` 的拼团，若有则返回错误码1003。

  * 若无，则开启数据库事务：

    * 创建拼团记录（`status=0`, `current_count=0`）。

    * 创建订单记录（`status=0`待支付）。

    * 调用微信统一下单接口，获取prepay\_id。

    * 更新订单的 `out_trade_no`。

    * 提交事务。

  * 返回支付参数。



#### 3.2.6 参团（加入已有拼团并下单）

* **URL**：`/group/join`

* **Method**：POST

* **请求参数**：

* **响应**：同开团接口

* **错误码**：

  * 1004：拼团不存在

  * 1005：拼团已结束（已成团或已失败）

  * 1006：拼团已满员（`current_count >= target_count`）

  * 1007：课程已截止报名

* **说明**：

  * 检查拼团是否存在且 `status=0`，且 `deadline > now`。

  * 若 `current_count >= target_count` 返回错误。

  * 创建订单（待支付），调用统一下单，返回支付参数。

  * 注意：支付成功前，拼团人数未增加，因此无需更新拼团。



#### 3.2.7 支付结果通知（微信服务器回调）

* **URL**：`/pay/notify`（需公网可访问，且为POST）

* **说明**：微信支付结果回调接口，处理支付成功/失败。需验证签名。

* **处理逻辑**：

  * 验证签名，解析通知数据。

  * 根据 `out_trade_no` 查询订单。

  * 若支付成功：

    * 更新订单状态为已支付（`status=1`），记录 `transaction_id` 和支付时间。

    * 更新对应拼团的 `current_count` 加1（使用乐观锁或行锁，防止并发）。

    * 判断更新后的 `current_count` 是否等于 `target_count`，若是则更新拼团状态为已成团（`status=1`），并发送模板消息通知所有团员。

    * 若拼团已是已成团状态（可能因并发导致），则忽略。

  * 若支付失败，更新订单状态为支付失败（`status=3`）。

  * 返回 `SUCCESS` 给微信服务器。



#### 3.2.8 获取拼团详情

* **URL**：`/group/{groupId}`

* **Method**：GET

* **响应**：

* **说明**：返回完整的课程信息（用于拼团详情页展示）和拼团信息。



#### 3.2.9 分享拼团（获取小程序码）

* **URL**：`/group/share/{groupId}`

* **Method**：GET

* **响应**：

* **说明**：后端调用微信接口生成小程序码，并返回URL（可缓存到CDN）。



#### 3.2.10 获取我的拼团列表

* **URL**：`/user/groups`

* **Method**：GET

* **请求参数**（Query）：

  * `status`：string，可选 `all`（默认）、`ongoing`（进行中）、`success`（已成团）、`finished`（已完成）、`failed`（已失败）

  * `page`、`size`

* **响应**：



### 3.3 后台管理接口

（需管理员权限验证，使用独立token）



#### 3.3.1 管理员登录

* **URL**：`/admin/login`

* **Method**：POST

* **请求参数**：`username`, `password`

* **响应**：返回token



#### 3.3.2 课程管理

* **列表**：GET `/admin/courses`（分页、搜索）

* **创建**：POST `/admin/course`（表单数据）

* **编辑**：PUT `/admin/course/{id}`

* **删除/下架**：DELETE `/admin/course/{id}`（软删除或修改状态）



#### 3.3.3 订单管理

* **列表**：GET `/admin/orders`（分页、搜索）

* **详情**：GET `/admin/order/{orderId}`

* **手动退款**：POST `/admin/order/refund`（参数 orderId, reason）



#### 3.3.4 CMS管理

* Banner增删改查

* 公告增删改查



### 3.4 定时任务/内部接口

#### 3.4.1 拼团状态检查任务

* **触发**：每分钟执行一次（cron）

* **逻辑**：

  * 查询 `group` 表 `status=0` 且 `deadline < NOW()` 的拼团。

  * 对每个拼团：

    * 若 `current_count >= target_count`，则更新 `status=1`（已成团），并发送模板消息。

    * 否则，更新 `status=2`（已失败），然后：

      * 查询该拼团下所有 `status=1`（已支付）的订单。

      * 对每个订单调用微信退款接口，更新订单状态为已退款，记录退款时间。

      * 发送模板消息通知用户退款成功。

* **注意**：需处理退款失败情况（重试机制）。



## 4. 关键业务流程实现



### 4.1 开团并发控制

**问题**：多个用户同时为同一课程开团，可能导致创建多个进行中拼团，违反业务规则。

**解决方案**：使用Redis分布式锁 + 数据库唯一约束。

* 伪代码：



### 4.2 支付回调处理并发

支付回调可能同时到达，需保证拼团人数更新的原子性。

* 使用数据库行锁：`SELECT ... FOR UPDATE` 锁定拼团记录，然后更新 `current_count`。

示例（行锁）：



### 4.3 退款流程

* 在定时任务中，对每个失败的拼团，循环其订单列表。

* 调用微信退款接口（需双向证书），记录退款结果。

* 若退款失败（如余额不足），记录错误并人工介入。



### 4.4 用户定位处理

* 前端通过 `wx.getLocation` 获取用户经纬度，传递给后端接口用于距离排序。

* 后端预存课程经纬度（`course.longitude`, `course.latitude`），计算距离时使用 Haversine 公式或数据库内置函数。



## 5. 第三方服务集成



### 5.1 微信小程序

* **登录**：`https://api.weixin.qq.com/sns/jscode2session`

* **获取手机号**：使用 session\_key 解密 `encryptedData`。

* **模板消息**：通过 `https://api.weixin.qq.com/cgi-bin/message/subscribe/send` 发送，需用户订阅。

* **小程序码**：通过 `https://api.weixin.qq.com/wxa/getwxacodeunlimit` 生成。

* **定位**：前端调用 `wx.getLocation`，需用户授权。



### 5.2 微信支付

* **统一下单**：`https://api.mch.weixin.qq.com/pay/unifiedorder`（V2）或V3接口。

* **支付回调**：配置回调URL为 `/pay/notify`。

* **退款**：`https://api.mch.weixin.qq.com/secapi/pay/refund`，需双向证书。



### 5.3 对象存储

* 使用腾讯云COS SDK，前端直接上传图片（需后端生成临时密钥）。



### 5.4 企业微信二维码

* 客服二维码为静态图片，直接放置在小程序代码中（如 `images/kefu.png`），无需后端接口。弹窗使用原生 `wx.showModal` 或自定义弹窗展示图片。



## 6. 部署与安全要求



### 6.1 部署架构

* 前端：微信小程序代码上传至微信平台。

* 后端：部署在云服务器，使用PM2或Docker运行，Nginx反向代理，配置HTTPS。

* 数据库：使用云数据库RDS，定期备份。

* Redis：使用云Redis或自建。

* 文件存储：使用云对象存储。



### 6.2 安全要求

* 所有API必须使用HTTPS。

* 用户敏感数据加密存储（如openid，手机号）。

* 防止SQL注入：使用ORM或参数化查询。

* 防止XSS：对用户输入进行过滤。

* 接口限流：对敏感接口（如开团、支付）进行频率限制。

* JWT token设置合理过期时间（如7天），并提供刷新机制。



### 6.3 环境配置

* 开发环境、测试环境、生产环境分离。

* 微信小程序配置：AppID、AppSecret。

* 微信支付配置：商户号、API密钥、证书路径。



## 7. 错误码定义

| 错误码  | 说明               |
| ---- | ---------------- |
| 1001 | 课程不存在            |
| 1002 | 课程已截止报名          |
| 1003 | 该课程已有进行中拼团，请直接加入 |
| 1004 | 拼团不存在            |
| 1005 | 拼团已结束            |
| 1006 | 拼团已满员            |
| 1007 | 课程已截止报名          |
| 2001 | 订单不存在            |
| 2002 | 订单状态异常           |
| 3001 | 微信支付调用失败         |
| 4001 | 用户未登录            |
| 4002 | token无效或过期       |
| 5000 | 系统内部错误           |



## 8. 附录



### 8.1 数据字典

详见数据库设计部分。



### 8.2 接口示例（略）



***



**文档结束**
