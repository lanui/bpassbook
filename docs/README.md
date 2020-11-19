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
- fixed 输入干扰问题

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
