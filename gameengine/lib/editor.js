var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
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
    editor.WorldMap = WorldMap;
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
    editor.Material = Material;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this, "Red.jpg", "Tile");
        }
        Tile.prototype.setWalkable = function (value) {
            if (value == 0) {
                this.material = new Material("Red.jpg", "red", value);
            }
            else {
                this.material = new Material("Black.jpg", "black", value);
            }
            this.source = this.material.material.source;
            this.name = this.material.material.name;
            this.walkable = value;
        };
        Tile.prototype.setMaterial = function (material) {
            this.material = material;
            this.source = this.material.material.source;
            this.name = this.material.material.name;
            this.walkable = this.material.walkable;
        };
        Tile.prototype.toString = function () {
            if (this.material.material.name) {
                return "row:" + this.ownedRow + " col:" + this.ownedCol + " walkable:" + this.walkable + " material:" + this.material.material.name;
            }
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel(materials) {
            var _this = this;
            _super.call(this);
            var button = new ui.Button();
            button.text = "Green";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = function () {
                /*var radio=document.getElementsByName("material");
                for(var i=0;i < radio.length;i++){
                    if(radio[i].checked){
                        this.currentmaterial=materials[radio[i].value];
                    }
                }*/
                _this.currentmaterial = materials[0];
            };
            var button2 = new ui.Button();
            button2.text = "Black";
            button2.width = 100;
            button2.height = 50;
            button2.y = 60;
            this.addChild(button2);
            button2.onClick = function () {
                /*var radio=document.getElementsByName("material");
                for(var i=0;i < radio.length;i++){
                    if(radio[i].checked){
                        this.currentmaterial=materials[radio[i].value];
                    }
                }*/
                _this.currentmaterial = materials[1];
            };
            var button3 = new ui.Button();
            button3.text = "Red";
            button3.width = 100;
            button3.height = 50;
            button3.y = 120;
            this.addChild(button3);
            button3.onClick = function () {
                /*var radio=document.getElementsByName("material");
                for(var i=0;i < radio.length;i++){
                    if(radio[i].checked){
                        this.currentmaterial=materials[radio[i].value];
                    }
                }*/
                _this.currentmaterial = materials[2];
            };
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
