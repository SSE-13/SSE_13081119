"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function createMapgame() {
    var world = new game.WorldMap();
    var onLoadDataComplete = function () {
        var mapData = data.Storage.getInstance().mapData;
        var rows = mapData.length;
        var cols = mapData[0].length;
        world.grid = new astar.Grid(rows, cols);
        for (var col = 0; col < rows; col++) {
            for (var row = 0; row < cols; row++) {
                var tile = new game.Tile();
                tile.setMaterial(new game.Material(mapData[col][row].material, "aaa", 0));
                tile.setWalkable(mapData[col][row].walkable);
                tile.x = col * game.GRID_PIXEL_WIDTH;
                tile.y = row * game.GRID_PIXEL_HEIGHT;
                tile.ownedCol = col;
                tile.ownedRow = row;
                tile.width = game.GRID_PIXEL_WIDTH;
                tile.height = game.GRID_PIXEL_HEIGHT;
                world.addChild(tile);
                eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
            }
        }
    };
    data.Storage.getInstance().readFile(onLoadDataComplete);
    return world;
}
var green = new game.Material("Green.jpg", "green", 0);
var black = new game.Material("Black.jpg", "black", 0);
var red = new game.Material("Red.jpg", "red", 0);
var materials = new Array();
materials.push(green);
materials.push(black);
materials.push(red);
var currenttile;
var grid;
var start;
var end;
function onTileClick(tile) {
    start.x = 0;
    start.y = 0;
    end.x = tile.x / game.GRID_PIXEL_WIDTH;
    end.y = tile.y / game.GRID_PIXEL_HEIGHT;
    alert(tile.ownedCol + "," + tile.ownedRow);
    body.run(mapgame.grid, start, end);
}
var BoyShape = (function (_super) {
    __extends(BoyShape, _super);
    function BoyShape() {
        _super.apply(this, arguments);
    }
    BoyShape.prototype.render = function (context) {
        context.beginPath();
        context.fillStyle = '#00FFFF';
        context.arc(game.GRID_PIXEL_WIDTH / 2, game.GRID_PIXEL_HEIGHT / 2, Math.min(game.GRID_PIXEL_WIDTH, game.GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    };
    return BoyShape;
}(render.DisplayObject));
exports.BoyShape = BoyShape;
var BoyBody = (function (_super) {
    __extends(BoyBody, _super);
    function BoyBody() {
        _super.apply(this, arguments);
        this.steps = 1;
        this.width = game.GRID_PIXEL_WIDTH;
        this.height = game.GRID_PIXEL_HEIGHT;
    }
    BoyBody.prototype.run = function (grid, startnode, endnode) {
        grid.setStartNode(startnode.x, startnode.y);
        this.x = grid.startNode.x * this.width;
        this.y = grid.startNode.y * this.height;
        grid.setEndNode(endnode.x, endnode.y);
        var findpath = new astar.AStar();
        findpath.setHeurisitic(findpath.diagonal);
        var result = findpath.findPath(grid);
        var path = findpath._path;
        this.path = findpath._path;
        console.log(this.path);
        console.log(grid.toString());
    };
    BoyBody.prototype.onTicker = function (duringTime) {
        if (this.steps < this.path.length - 1) {
            var targetx = this.path[this.steps].x * this.width;
            var targety = this.path[this.steps].y * this.height;
            if (this.x < targetx) {
                this.x = (this.x + this.vx * duringTime > targetx) ? targetx : (this.x + this.vx * duringTime);
            }
            if (this.y < targety) {
                this.y = (this.y + this.vy * duringTime > targety) ? targety : (this.y + this.vy * duringTime);
            }
            if (this.x == targetx && this.y == targety) {
                this.steps += 1;
            }
            console.log(this.x, this.y, this.steps);
        }
    };
    return BoyBody;
}(Body));
exports.BoyBody = BoyBody;
var boyShape = new BoyShape();
var body = new BoyBody(boyShape);
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var mapgame = createMapgame();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapgame);
var ticker = new Ticker();
ticker.start([body, boyShape]);
renderCore.start(stage, ["Black.jpg", "Red.jpg", "Green.jpg", "Stroke.png"]);
