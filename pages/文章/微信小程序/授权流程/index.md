# 微信小程序授权、登录流程

## 登录流程

<img src="https://res.wx.qq.com/wxdoc/dist/assets/img/api-login.2fcc9f35.jpg" alt="登录流程" />

### 说明

1. 进入小程序时，调用wx.login()接口获取临时登录凭证code。
2. 将code发送到服务器，服务器通过auth.code2session()接口换取用户唯一标识OpenID、用户在微信开放平台账号下的唯一标识UnionID（若当前小程序已绑定到微信开放平台账号）和会话密钥session_key
3. 之后服务器可以通过用户标识来生成自定义的登录态（如：Token），并将登录态返回给小程序。
4. 客户端获取到登录态后，将登录态保存在本地，在后续接口请求中可以携带登录态

## 授权流程

<img src="http://zhongxk.com/blogImg/小程序授权流程.png" alt="授权流程" />

### 说明

1. 使用wx.getSettin()获取用户的授权设置。
2. 如果用户已授权，则直接调用相应的接口，否则使用wx.authorize()接口发起授权请求。
3. 授权请求成功，调用相应的接口，否则提示用户打开设置界面，引导用户开启授权，使用wx.openSetting()接口打开设置界面。