---
layout:     post
title:      "妙味课堂——快速排序"
date:       2016-09-12
author:     "赵祎鑫"
header-img: "img/post-bg-js-version.jpg"
tags:
    - 笔记
---

快速排序

1、找一个基准点

2、建立两个数组，分别存储左边和右边的数

3、利用递归进行下次比较

```
function quickSort(){
    if(arr.length == 1){
        return arr;
    }
    
    var num = Math.floor(arr.length/2);
    
    var numValue = arr.splice(num,1);
    
    var left = [];
    var right = [];
    
    for(var i=0;i<arr.length;i++){
        if(arr[i]<numValue){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    
    return quickSort(left).concat([numValue],quickSort(right));
}

quickSort([12,5,37,6,22,40]);
```








