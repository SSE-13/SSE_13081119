
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap("head.png", -40, -50, 1, 1, 0);
var trunk = new render.Bitmap("trunk.png", 0, 0, 1, 1, 0);
var righthand = new render.Bitmap("righthand.png", 15, 10, 1, 1, 0);
var lefthand = new render.Bitmap("lefthand.png", 15, 10, 1, 1, 0);
var rightleg = new render.Bitmap("rightleg.png", -5, 70, 1, 1, 0);
var leftleg = new render.Bitmap("leftleg.png", -5, 70, 1, 1, 0);

humanContainer.addChild(head);
humanContainer.addChild(trunk);
humanContainer.addChild(righthand);
humanContainer.addChild(lefthand);
humanContainer.addChild(rightleg);
humanContainer.addChild(leftleg);

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["lefthand.png", "leftleg.png", "trunk.png", "head.png", "rightleg.png", "righthand.png"]);

class HumanBody extends Body {
    
    rotatespeed:number =2;
    rotatetemp:number=this.rotatespeed;
    vx:number = 5;
    vxtemp:number=this.vx;
    vy:number = 5;
    vytemp:number=this.vy;
    HandRotate:number=2;
    LegRotate:number=2;
    stand:boolean=false;
    onTicker(duringTime: number) {
        this.x += this.vx*duringTime;
        this.y += this.vy*duringTime;
        this.rotation+=this.rotatespeed;

        
        if((lefthand.rotation + this.HandRotate > 10 && this.HandRotate>0) ||(lefthand.rotation + this.HandRotate < -10 && this.HandRotate < 0) ){
            this.HandRotate=-this.HandRotate;
            
        }
        if((leftleg.rotation + this.LegRotate > 10 && this.LegRotate>0)||( leftleg.rotation + this.LegRotate < -10 && this.LegRotate < 0 )){
            this.LegRotate=-this.LegRotate;
        }
        lefthand.rotation += this.HandRotate*duringTime;
        righthand.rotation += -this.HandRotate*duringTime;
        leftleg.rotation += this.LegRotate*duringTime;
        rightleg.rotation += -this.LegRotate*duringTime;

        
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if(localPoint.IsRange(35,0,67,61)){
    return true;}
}
var legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if(localPoint.IsRange(0,0,74,156)){
    return true;}
}

var headOnClick = () => {
    if(!body.stand){
    body.rotatespeed=-body.rotatespeed;}
    else{

        body.rotatespeed=body.rotatetemp;
        body.vx=body.vxtemp;
        body.vy=body.vytemp;
        body.stand=false;
    }
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}
var legOnClick = () => {
    body.rotatespeed=0;
    body.vx=0;
    body.vy=0;
    body.stand=true;
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(leftleg,legHitTest,legOnClick);
eventCore.register(rightleg,legHitTest,legOnClick);











