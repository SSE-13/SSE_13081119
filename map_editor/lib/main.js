"use strict";
const fs = require('fs');
function readFile(path) {
    var map_path = __dirname + path;
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile(data) {
    var map_path = __dirname + "/mapsave.json";
    var obj = JSON.stringify(data);
    fs.writeFileSync(map_path, obj, "utf-8");
}
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
function onTileClick(tile) {
    var walkable = mapData[tile.ownedRow][tile.ownedCol] == 0 ? 1 : 0;
    mapData[tile.ownedRow][tile.ownedCol] = walkable;
    tile.setWalkable(walkable);
    //console.log(tile);
}
function onSaveClick() {
    var data = JSON.parse(JSON.stringify(mapData));
    SaveData.push(data);
    writeFile(data);
    alert("保存成功(●'◡'●)");
    console.log(SaveData);
}
function onCancelClick() {
    if (!SaveData.length) {
        alert("没有再可以撤销的了亲(￣▽￣)");
    }
    else {
        mapData = SaveData.pop();
        writeFile(mapData);
        console.log(mapData);
        var rows = mapData.length;
        var cols = mapData[0].length;
        for (var col = 0; col < rows; col++) {
            for (var row = 0; row < cols; row++) {
                editor.children[row * cols + col].setWalkable(mapData[col][row]);
            }
        }
        alert("撤销成功(●'◡'●)");
    }
}
var save = new render.TextField("保存");
save.x = 220;
var cancel = new render.TextField("撤销");
cancel.x = 220;
cancel.y = 40;
var SaveData = new Array();
var mapData = readFile("/map.json");
SaveData.push(JSON.parse(JSON.stringify(mapData)));
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var container = new render.DisplayObjectContainer();
var editor = createMapEditor();
container.addChild(editor);
container.addChild(save);
container.addChild(cancel);
renderCore.start(container);
eventCore.register(save, events.displayObjectTextHitTest, onSaveClick);
eventCore.register(cancel, events.displayObjectTextHitTest, onCancelClick);
