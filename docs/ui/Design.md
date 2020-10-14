# Design

# Fill and popup PassItem

## Sence 1

> BPassword 中没有匹配账号时(hostname)

### Sence 1.1 界面输入框(username) 无内容时

> > focus username 不弹出
> > focus password 不弹出

### Sence 1.2 界面输入框(username ) 有内容时

> > focus username 不弹出添加到 BPassword 提示
> > focus password 弹出添加到 BPassword 提示

## Sence 2

> BPassword 中有匹配账号时(hostname)

### Sence 2.1 界面输入框(username) 无内容时

> > focus username 弹出账号选择
> > focus password 弹出账号选择

### Sence 2.1 界面输入框(username ) 有内容时

匹配过滤 username ==>> ()

> > focus username 弹出账号选择

### Sence 2.2 界面输入框(password ) 有内容时

> > focus password 不弹出账号选择

## Program STORE Design

> contentscript hold website items
> contentscript communication with backend items changed
