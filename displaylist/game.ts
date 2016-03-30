module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap("head.png", -30, -75, 1, 1, 20);
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

//head.x=200;

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["lefthand.png", "leftleg.png", "trunk.png", "head.png", "rightleg.png", "righthand.png"]);


class HumanBody extends Body {

    HandRotate=2;
    LegRotate=2;
    onTicker(duringTime: number) {
       
        this.x += this.vx*duringTime;
        this.y += this.vy*duringTime;
        

        
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
        if(this.x>=200){
        this.rotation+=2;}
 
    }
}
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);











