

function createMapgame() {
    var world = new game.WorldMap();
    
    var onLoadDataComplete = () => {
        
        var mapData = data.Storage.getInstance().mapData;
        var rows = mapData.length;
        var cols = mapData[0].length;
        world.grid=new astar.Grid(rows,cols);
        for (var col = 0; col < rows; col++) {

            for (var row = 0; row < cols; row++) {
                var tile = new game.Tile();

                tile.setMaterial(new game.Material(mapData[col][row].material, "aaa", 0));
                tile.setWalkable(mapData[col][row].walkable);
                tile.x = col * game.GRID_PIXEL_WIDTH;
                tile.y = row * game.GRID_PIXEL_HEIGHT
                tile.ownedCol = col;
                tile.ownedRow = row;
                tile.width = game.GRID_PIXEL_WIDTH;
                tile.height = game.GRID_PIXEL_HEIGHT;
                world.addChild(tile);
                eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);

            }

        }
    }
    
    data.Storage.getInstance().readFile(onLoadDataComplete)
    



    return world;

}


var green = new game.Material("Green.jpg", "green", 0);
var black = new game.Material("Black.jpg", "black", 0);
var red = new game.Material("Red.jpg", "red", 0);
var materials = new Array<game.Material>();
materials.push(green);
materials.push(black);
materials.push(red);


var currenttile: game.Tile;

var  grid:astar.Grid;
var start:math.Point;
var end:math.Point;

function onTileClick(tile: game.Tile) {
    start.x=0;
    start.y=0
    end.x=tile.x/game.GRID_PIXEL_WIDTH;
    end.y=tile.y/game.GRID_PIXEL_HEIGHT;
    alert (tile.ownedCol + "," + tile.ownedRow);
    body.run(mapgame.grid,start,end);
   
    
    

}

    export class BoyShape extends render.DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(game.GRID_PIXEL_WIDTH / 2, game.GRID_PIXEL_HEIGHT / 2, Math.min(game.GRID_PIXEL_WIDTH, game.GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {

        path;
        steps=1;
        width=game.GRID_PIXEL_WIDTH;
        height=game.GRID_PIXEL_HEIGHT;
        
        public run(grid:astar.Grid,startnode:math.Point,endnode:math.Point) {
            grid.setStartNode(startnode.x,startnode.y);
            this.x=grid.startNode.x*this.width;
            this.y=grid.startNode.y*this.height;    
            grid.setEndNode(endnode.x,endnode.y);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            this.path = findpath._path;
            console.log(this.path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
 if(this.steps < this.path.length-1){
        var targetx=this.path[this.steps].x*this.width;
        var targety=this.path[this.steps].y*this.height;
        if(this.x < targetx){
        this.x=(this.x+this.vx*duringTime>targetx)?targetx:(this.x+this.vx*duringTime);
    }
        if(this.y < targety){
        this.y=(this.y+this.vy*duringTime>targety)?targety:(this.y+this.vy*duringTime);
    }
        if(this.x==targetx && this.y==targety){
        this.steps+=1;
    }
    console.log(this.x,this.y,this.steps);
        }
    }
}



var boyShape = new BoyShape();
var body = new BoyBody(boyShape);






var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var mapgame = createMapgame();

var stage = new render.DisplayObjectContainer();
stage.addChild(mapgame);

var ticker = new Ticker();
ticker.start([body,boyShape]);



renderCore.start(stage, ["Black.jpg", "Red.jpg", "Green.jpg", "Stroke.png"]);
