var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    game.GRID_PIXEL_WIDTH = 50;
    game.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    game.WorldMap = WorldMap;
    var Material = (function () {
        function Material(source, name, walkable) {
            this.material = new render.Bitmap(source, name);
            this.walkable = walkable;
        }
        Material.prototype.setWalkable = function (walkable) {
            this.walkable = walkable;
        };
        Material.prototype.IsWalkableMaterial = function () {
            return this.walkable;
        };
        return Material;
    }());
    game.Material = Material;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this, "Red.jpg", "Tile");
        }
        Tile.prototype.setWalkable = function (value) {
            this.walkable = value;
        };
        Tile.prototype.setMaterial = function (material) {
            this.material = material;
            this.source = this.material.material.source;
        };
        Tile.prototype.toString = function () {
            if (this.material.material.name) {
                return "row:" + this.ownedRow + "\ncol:" + this.ownedCol + "\nwalkable:" + this.walkable + "\nmaterial:" + this.material.material.name;
            }
        };
        return Tile;
    }(render.Bitmap));
    game.Tile = Tile;
})(game || (game = {}));
