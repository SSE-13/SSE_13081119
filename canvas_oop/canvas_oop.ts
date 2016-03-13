/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    content = "";
    render(context: CanvasRenderingContext2D) {
        context.font = "20px Arial";
        context.fillStyle = '#000000';
        context.fillText(this.content, 0, 20);
    }
    
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var P1hp = new Rect();
P1hp.width = 350;
P1hp.height = 30;
P1hp.x = 120;
P1hp.y=50;
P1hp.color = '#00FF00'


var P2hp = new Rect();
P2hp.width = 350;
P2hp.height = 30;
P2hp.x = 500;
P2hp.y = 50;
P2hp.color = '#00FF00'

var textp1 = new TextField();
textp1.x = 130;
textp1.y = 80;
textp1.content = "1000"
var textp2 = new TextField();
textp2.x =800;
textp2.y = 80;
textp2.content = "1000"

var P1bc = new Rect();
P1bc.width=120;
P1bc.height=15;
P1bc.x=70;
P1bc.y=500;
P1bc.color = '#00FFFF'
var P1hd = new Rect();
P1hd.width=70;
P1hd.height=15;
P1hd.x=120;
P1hd.y=515;
P1hd.color ='#BFC7C9' 

var P2bc = new Rect();
P2bc.width=120;
P2bc.height=15;
P2bc.x=780;
P2bc.y=500;
P2bc.color = '#00FFFF'

var P2hd = new Rect();
P2hd.width=70;
P2hd.height=15;
P2hd.x=780;
P2hd.y=515;
P2hd.color ='#BFC7C9' 

var bg = new Bitmap();
bg.source = 'bg.jpg';
var head = new Bitmap();
head.source = 'head.png';
head.x = 37;
var character = new Bitmap();
character.source = 'character.png';
character.x = 200;
character.y = 250;


//渲染队列
var renderQueue = [bg,head,character,P1hp,P2hp,textp1,textp2,P1bc,P1hd,P2bc,P2hd];
//资源加载列表
var imageList = ['bg.jpg','head.png','character.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


