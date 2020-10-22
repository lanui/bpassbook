# Design

# Fill and popup PassItem

## Sence 1

> BPassword 中没有匹配账号时(hostname)

### Sence 1.1 界面输入框(username) 无内容时

> > focus username 不弹出
> > focus password 不弹出

### Sence 1.2 界面输入框(username ) 有内容时

> > focus username 弹出添加到 BPassword 提示
> > focus password 弹出添加到 BPassword 提示

## Sence 2

> BPassword 中有匹配账号时(hostname)

### Sence 2.1 界面输入框(username) 无内容时

> > focus username 弹出账号选择
> > focus password 弹出账号选择

### Sence 2.1 界面输入框(username ) 有内容时

匹配过滤 username ==>> ()

> > 精确匹配到账号 不弹出选择

> > focus username 弹出账号选择

### Sence 2.2 界面输入框(password ) 有内容时

> > focus password 不弹出账号选择

## Program STORE Design

> contentscript hold website items
> contentscript communication with backend items changed

# 网站登录页面,弹出 BPassword 规则 (v0.4.0)

## 不弹出 BPassword

1. 登录框 name,password 输入值与 BPassword 存储记录中某条完全匹配时,不弹出
2. BPassword 中没有记录,且 name 或 password 为空时,不弹出

## 弹出 BPassword

1. BPassword 存储有记录,name 匹配时弹出
2. BPassword 中没有记录,name 和 password 不为空时弹出

### 弹出页面内容显示规则

> 显示添加按钮

## focusin

> > has name value and password value and exactMatched [popup-add]

> > has name value and subMatched [popup-select]
