# 支付流程

<img src="http://zhongxk.com/blogImg/小程序支付流程.png" alt="小程序支付流程" />

### 说明

1. 用户点击支付按钮，会调用服务端接口，并传入用户的openId、商品ID、数量等金额信息。
2. 服务端接口返回timeStamp、nonceStr、package、sign等参数给前端。
3. 前端使用微信提供的API，调用wx.requestPayment方法，传入timeStamp、nonceStr、package、sign等参数。
4. 微信支付后台收到请求， 调用wx.requestPayment方法，验证签名。