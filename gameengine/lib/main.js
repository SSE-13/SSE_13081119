function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var green = new editor.Material("Green.jpg", "green", 0);
var black = new editor.Material("Black.jpg", "black", 0);
var red = new editor.Material("Red.jpg", "red", 0);
green.setWalkable(0);
var materials = new Array();
materials.push(green);
materials.push(black);
materials.push(red);
function onTileClick(tile) {
    tile.setMaterial(panel.currentmaterial);
    console.log(tile.toString());
}
var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var mapEditor = createMapEditor();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var panel = new editor.ControlPanel(materials);
panel.x = 300;
stage.addChild(panel);
renderCore.start(stage, ["Black.jpg", "Red.jpg", "Green.jpg"]);
