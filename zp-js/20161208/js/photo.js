(function () {
    
//---------------------------------------------------------
// 初始化数据
    var data = dataList,len = data.length;

    createPhotos(data);

    var n = 0;

//---------------------------------------------------------
// 基本逻辑
    M('.shade .start').addEventListener('click',function() {
        addClass(M('.shade'),'hide');
        M('.photo').style.opacity = 1;
        addClass(M(`#photo_0`),'center');
        setTimeout(function(){
            sortImgs(n);
        }, 200);
    });

    M('.nav_i').forEach((item,i)=>{
        item.onclick = function(){
            turnImg(M(`#photo_${i}`));
        };
    });

//---------------------------------------------------------
// 需求函数化

// 需求1：利用数据生成所有html结构
    function createPhotos(data) {
        var photo_html = M('.photo').innerHTML.split('{{split}}')[0].trim(),
            nav_html = M('.nav').innerHTML.trim();

        var photos = [],nav = [];

        data.forEach((item,i)=>{
            var photoTemp = photo_html.replace(/{{id}}/,i)
                                      .replace(/{{src}}/,'src')
                                      .replace(/{{img}}/,item.img)
                                      .replace(/{{caption}}/,item.caption)
                                      .replace(/{{desc}}/,item.desc),
                navTemp = nav_html.replace(/{{id}}/,i);

            photos.push(photoTemp);
            nav.push(navTemp);
        });
        photos.push(`<div class="nav">${nav.join('')}</div>`);
        M('.photo').innerHTML = photos.join('');
    }
    
    // 需求2:给所有的图片排序
    function sortImgs(n) {
        var photos = M('.photo_i');

        initPhotos(photos);

        var center = photos.splice(n,1)[0];
        addClass(center,'center');
        addClass(M(`#nav_${n}`),'active');

        // center.addEventListener('click', function(e){
        //     turnImg(this);
        // });

        center.onclick = function () {
            turnImg(this);
        };

        // 对剩余的图片进行随机排序
        photos.sort(()=>{
            return 0.5 - Math.random();
        })

        var rP = scope(); //返回左右两侧范围 从 x - y

        // 分成左侧和右侧两部分
        var left = photos.splice(0,Math.ceil((len-1)/2)),
            right = photos;

        left.forEach((item,i)=>{
            item.style.zIndex = rn([0,len]);
            item.style.left = rn(rP.L.x) + 'px';
            item.style.top = rn(rP.L.y) + 'px';
            item.style.transform = `translate(0,0) scale(.9) rotate(${rn([-2160,2160])}deg)`;
        });
        right.forEach((item,i)=>{
            item.style.zIndex = rn([0,len]);
            item.style.left = rn(rP.R.x) + 'px';
            item.style.top = rn(rP.R.y) + 'px';
            item.style.transform = `translate(0,0) scale(.9) rotate(${rn([-2160,2160])}deg)`;
        });
    }

    // 需求3 编写某个区间的随机整数
    function rn(arr) {
        var max = Math.max.apply(null,arr),
            min = Math.min.apply(null,arr);
        var p = Math.round(Math.random() * (max - min) + min);
        //?;
        return p;
    }

    // 需求4 计算随机的范围
    function scope() {
        var outer = M('.photo_wall');
        var pic = M(`#photo_${rn([0,len-1])}`);
        var W = outer.clientWidth,
            H = outer.clientHeight,
            w = pic.offsetWidth,
            h = pic.offsetHeight;
            console.log(W,w);
        var data = {
            L:{
                x:[-w/3,W/2 - w/2 - w],
                y:[-h/3,H - h*2/3]
            },
            R:{
                x:[W/2 + w/2,W - w*2/3],
                y:[-h/3,H - h*2/3]

            }
        }
        return data;
    }

    // 需求5：控制图片翻转
    function turnImg(ele) {
        var cur = ele.id.split('_')[1];
        var nav = M(`#nav_${cur}`);

        if(!hasClass(ele,'center')){ //如果点的不是当前对应的按钮就重新排序
            return sortImgs(cur)
        }

        if(hasClass(ele,'front')){
            //翻转到背面
            console.log('现在是正面准备移除front');
            addClass(ele,'back');
            console.log(ele.className);
            rmClass(ele,'front');
            console.log(ele.className);
            addClass(nav,'back');
        }else{
            //翻转到正面
            console.log('现在是反面准备移除back');
            addClass(ele,'front');
            console.log(ele.className);
            rmClass(ele,'back');
            console.log(ele.className);
            rmClass(nav,'back')
        }
    }

    // 需求6 初始化所有样式
    function initPhotos(objs) {
        objs.forEach((item,i)=>{
            if(hasClass(item,'center')){
                var nav = M(`#nav_${i}`);
                rmClass(item,'center');
                rmClass(item,'back');
                addClass(item,'front');
                rmClass(nav,'active');
                rmClass(nav,'back');
                item.onclick = null;
            }
            item.style.left = '';
            item.style.top = '';
            item.style.zIndex = '';
            item.style.transform = `translate(-50%,-50%) scale(1.1) rotate(0deg)`;
        });
    }
    
})()