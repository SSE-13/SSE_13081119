var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.HandRotate = 2;
        this.LegRotate = 2;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.y += this.vy * duringTime;
        if ((lefthand.rotation + this.HandRotate > 10 && this.HandRotate > 0) || (lefthand.rotation + this.HandRotate < -10 && this.HandRotate < 0)) {
            this.HandRotate = -this.HandRotate;
        }
        if ((leftleg.rotation + this.LegRotate > 10 && this.LegRotate > 0) || (leftleg.rotation + this.LegRotate < -10 && this.LegRotate < 0)) {
            this.LegRotate = -this.LegRotate;
        }
        lefthand.rotation += this.HandRotate * duringTime;
        righthand.rotation += -this.HandRotate * duringTime;
        leftleg.rotation += this.LegRotate * duringTime;
        rightleg.rotation += -this.LegRotate * duringTime;
        if (this.x >= 200) {
            this.rotation += 2;
        }
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map