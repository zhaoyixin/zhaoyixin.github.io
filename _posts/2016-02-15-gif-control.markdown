---
layout:     post
title:      "转：CSS或JS实现gif动态图片的停止与播放"
date:       2016-02-15
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 技术
---

## CSS或JS实现gif动态图片的停止与播放

该篇文章是在看前端大神[张鑫旭](http://www.zhangxinxu.com/)的BLOG时发现的，之前在我的工作中涉及到gif图的播放及暂停，所以就转到自己BLOG上加以学习~

#### 一、gif图片自己可控前提下的方法一：多img资源控制处理

假如说，我们希望暂停的gif是自己(开发人员)传上去的，不是用户可以随机上传不可控的gif. 我们可以这么处理，就是准备2套图片，一个是gif动态图片，还有一个是只有一帧的静止的图片。然后使用JS来回切换`<img>`的`src`值为这两张图片地址就好了。

```
img.src="animate.gif";
// 或者呈现的是
img.src="static.png";
```

这个方法最大的优点就是兼容性强，所有浏览器都可以实现停止效果。然而，这种方法有个局限，就是，暂停时候呈现的图片永远是同一张。基本上可以说是停止，而不是暂停。

#### 二、gif图片自己可控前提下的方法二：CSS3 animation控制

也就是我们看到的gif效果并不是一个真正的gif图片，而是使用CSS3的animation属性控制形成的逐帧动态图片效果。说穿了就是animation控制Sprites图片的background-position值模拟gif效果。

[查看例子](http://www.zhangxinxu.com/study/201512/gif-stop-and-play-by-css3-animation.html)

此方法好是好，但是也有弊端

1.IE10+等支持CSS3 animation的浏览器才行；2.最大的问题是图片需要是自己控制，如果想控制用户上传的真正意义的gif图片，只能……

#### 三、自己无法控制的gif图片的停止与播放

[查看例子](http://www.zhangxinxu.com/study/201512/gif-stop-and-play-by-js-canvas.html)

那么，如何使用呢？

[张鑫旭](http://www.zhangxinxu.com/)对HTMLImageElement原型进行了扩展，增加了stop()和play()两个方法，大家只要在页面中自己的JS文件中复制上面的代码，然后直接调用方法即可~

```
if ('getContext' in document.createElement('canvas')) {
    HTMLImageElement.prototype.play = function() {
        if (this.storeCanvas) {
            // 移除存储的canvas
            this.storeCanvas.parentElement.removeChild(this.storeCanvas);
            this.storeCanvas = null;
            // 透明度还原
            image.style.opacity = '';
        }
        if (this.storeUrl) {
            this.src = this.storeUrl;    
        }
    };
    HTMLImageElement.prototype.stop = function() {
        var canvas = document.createElement('canvas');
        // 尺寸
        var width = this.width, height = this.height;
        if (width && height) {
            // 存储之前的地址
            if (!this.storeUrl) {
                this.storeUrl = this.src;
            }
            // canvas大小
            canvas.width = width;
            canvas.height = height;
            // 绘制图片帧（第一帧）
            canvas.getContext('2d').drawImage(this, 0, 0, width, height);
            // 重置当前图片
            try {
                this.src = canvas.toDataURL("image/gif");
            } catch(e) {
                // 跨域
                this.removeAttribute('src');
                // 载入canvas元素
                canvas.style.position = 'absolute';
                // 前面插入图片
                this.parentElement.insertBefore(canvas, this);
                // 隐藏原图
                this.style.opacity = '0';
                // 存储canvas
                this.storeCanvas = canvas;
            }
        }
    };
}
```

```
var image = document.getElementsByTagName("img")[0];
// 停止gif图片
image.stop();
// 播放gif图片
image.play();
```