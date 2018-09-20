var yyy =document.getElementById('driss');
var context =yyy.getContext('2d');
var lineWidth=5;
autoSetSize(yyy)
listenToUser(yyy);

// 橡皮擦与笔刷切换功能
var eraserEnable=false;
eraser.onclick=function(){
    eraserEnable=true;
    eraser.classList.add('active');
    pen.classList.remove('active');
}
pen.onclick=function(){
    eraserEnable=false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
//监听用户动作
function listenToUser(canvas){
    var using=false
    var lastPoint={x:undefined,y:undefined}
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart=function(aaa){
            using=true
            var x=aaa.touches[0].clientX;
            var y=aaa.touches[0].clientY;
            console.log('启动引擎');
            
            lastPoint={x:x,y:y}
            if(eraserEnable){
                context.clearRect(x,y,10,10)
            }
        }
        canvas.ontouchmove=function(aaa){
            var x=aaa.touches[0].clientX;
            var y=aaa.touches[0].clientY;
            if(!using){return}
            else{
                if(eraserEnable){
                    context.clearRect(x,y,10,10)
                }else{
                    var newPoint={x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint=newPoint
                }
            } 
            console.log('S弯漂移')
            console.log(aaa);
        }
        canvas.ontouchend=function(aaa){
            using=false
            console.log('熄火')
            console.log(aaa);
        }
    }
    else{
        canvas.onmousedown=function(aaa){
            using=true
            var x=aaa.clientX;
            var y=aaa.clientY;
            console.log('启动引擎');
            console.log(aaa);
            lastPoint={x:x,y:y}
            if(eraserEnable){
                context.clearRect(x,y,10,10)
            }
        }
        canvas.onmousemove=function(aaa){
            var x=aaa.clientX;
            var y=aaa.clientY;
            if(!using){return}
            else{
                if(eraserEnable){
                    context.clearRect(x,y,10,10)
                }else{
                    var newPoint={x:x,y:y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint=newPoint
                }
            } 
            console.log('S弯漂移')
            console.log(aaa);
        }
        canvas.onmouseup=function(aaa){
            using=false
            console.log('熄火')
            console.log(aaa);
        }
    }
}
    
// 画一条线
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.lineWidth=lineWidth;
    context.moveTo(x1,y1)
    context.lineTo(x2,y2)
    context.stroke();
    context.closePath()
}

//获取屏幕大小
function autoSetSize(canvas){
    getScreenSize()
    window.onresize=function(){
        getScreenSize();
    }
    function getScreenSize(){
        var pageWidth=document.documentElement.clientWidth;
        var pageHeight=document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

//切换笔刷颜色
black.onclick=function(){
    context.strokeStyle='black';
    context.fillStyle='black'
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active')
}
red.onclick=function(){
    context.strokeStyle='red';
    context.fillStyle='red'
    red.classList.add('active');
    black.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active')
}
green.onclick=function(){
    context.strokeStyle='green';
    context.fillStyle='green';
    green.classList.add('active');
    red.classList.remove('active');
    black.classList.remove('active');
    blue.classList.remove('active')
}
blue.onclick=function(){
    context.strokeStyle='blue';
    context.fillStyle='blue';
    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active')
}

//切换笔刷型号
thin.onclick=function(){
    lineWidth=5;
}
thick.onclick=function(){
    lineWidth=10;
}

//清屏功能
clear.onclick=function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}

//保存当前图片
save.onclick=function(){
    var url=yyy.toDataURL();
    console.log(url);
    var a=document.createElement('a')
    document.body.appendChild(a);
    a.href=url;
    a.download="保存图片";
    a.click();
}