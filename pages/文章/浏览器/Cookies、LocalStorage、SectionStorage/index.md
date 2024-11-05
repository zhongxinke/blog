# Cookies、LocalStorage、SectionStorage

## Cookies

Cookies一般用来记录用户的登录信息，在发送请求的时候会带上Cookies。
Cookies的存储空间为4k

## LocalStorage和SectionStorage

两者的区别是生命周期长短和作用域

- LocalStorage是持久化的本地存储，除非手动清除不然会一直保存。不同标签都能共享数据
- SectionStorage是临时的本地存储，当标签关闭时，清除数据。不同标签不能共享数据

他们的存储空间都为5m
