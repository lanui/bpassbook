# Development

## Configuration

### deveployment env file

> {basedir}/ci/secret.env.js

```javascript
module.exports = {
  INFURA_PROJECTID: 'xxxx',
  INFURA_SECRET: 'xxxx',
};
```

# Features

## V0.0.x

- 实现网站账号密码保存在插件本地存储功能
- 实现 BPassword 账号的创建共能
- 设计 Popup 管理账号密码 CURD 的界面功能

## V0.1.x

- 实现已保存的账号和密码可以自动填入到网站
- fixed 输入干扰问题(参考 Chrome 浏览器自带密码管理工具实现逻辑)
-

## V1.x

> 发布到 Chrome WebStore

- 解决输入干扰问题
- 解决新浪输入框动态创建未识别到的问题

### V0.1.x BPassword Support Websites Test Pass

> 测试

#### Test pass

1. [京东](https://passport.jd.com/)
2. [淘宝](https://login.taobao.com/)
3. [国美](https://login.gome.com.cn/)
4. [寺库](https://passport.secoo.com/)
5. [唯品会](https://passport.vip.com/)
6. [蘑菇街](https://portal.mogu.com/)
7. [新浪微博](https://weibo.com/)
8. [Sina](https://www.sina.com.cn/)
9. [苏宁](https://passport.suning.com/)
10. [马蜂窝](https://passport.mafengwo.cn/)
11. [百度](https://www.baidu.com/)

#### Test no pass

1. [蓝湖](https://lanhuapp.com/) : 未定位到原因
2. [天猫](https://login.tmall.com/) : 读取不到 input,无法回填.
3. [163.com](https://www.163.com/) : 点击登录才创建登录 iframe ,
4. [阿里云](https://account.aliyun.com/) :跨域 iframe
5. [腾讯](https://*.qq.com/) : 跨域

## V2.x

> 2.0 版本 代码架构重构,解决类似腾讯内嵌输入 iframe 大小限制,导致弹出页不能完全显示问题

> 解决 V1.x 网站不能识别问题

### 优化网站输入框自动提示逻辑

> 插件解锁情况下

- (username && password && exactMatched) 用户名,密码均有值并且在 BPassword 有对应账号时 不弹出提示页面
- (username && password && !exactMatched) 用户名,密码均有值并且在 BPassword 没有对应账号时, 光标聚焦在密码框时,弹出提示添加页面.光标在用户名时,不弹出提示页面
- (username && password && !exactMatched) 用户名,密码均有值并且在 BPassword 有对应用户名相同的账号但密码不一致时,弹出修改密码提示页面.
- ((username && !password) && exactMatched) 用户名或密码没有值,并且在 BPassword 有对应用户名相似(一输入框用户名与 BPassword 列表中的用户名前匹配或有记录时)账号时,弹出账号列表选择页面
- ((username && !password) && exactMatched) 用户名或密码没有值,并且在 BPassword 有对应对应域名的账号时,弹出账号列表选择页面

> 插件未解锁情况下

- ((username && password) || matchedNum) :当用户名和密码均已输入值 或 BPassword 插件中有对应记录时,弹出解锁提示界面
