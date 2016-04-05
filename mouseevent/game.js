var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.rotatespeed = 2;
        this.rotatetemp = this.rotatespeed;
        this.vx = 5;
        this.vxtemp = this.vx;
        this.vy = 5;
        this.vytemp = this.vy;
        this.HandRotate = 2;
        this.LegRotate = 2;
        this.stand = false;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.y += this.vy * duringTime;
        this.rotation += this.rotatespeed;
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
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.IsRange(35, 0, 67, 61)) {
        return true;
    }
};
var legHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.IsRange(0, 0, 74, 156)) {
        return true;
    }
};
var headOnClick = function () {
    if (!body.stand) {
        body.rotatespeed = -body.rotatespeed;
    }
    else {
        body.rotatespeed = body.rotatetemp;
        body.vx = body.vxtemp;
        body.vy = body.vytemp;
        body.stand = false;
    }
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
};
var legOnClick = function () {
    body.rotatespeed = 0;
    body.vx = 0;
    body.vy = 0;
    body.stand = true;
};
eventCore.register(head, headHitTest, headOnClick);
eventCore.register(leftleg, legHitTest, legOnClick);
eventCore.register(rightleg, legHitTest, legOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCxJQUFJLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRSxJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRSxJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFaEUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixjQUFjLENBQUMsUUFBUSxDQUFD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