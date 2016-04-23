
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }

    export class Material{
        materials:Array<render.Bitmap>;
        constructor() {

            this.materials = [];
        }
        public addMaterial(material:render.Bitmap){
            this.materials.push(material);
        }


        
    }
    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;
        public walkable: boolean;
        public material: render.Bitmap;

        constructor() {
            super();
        }

        public setWalkable(value) {
            this.color = value ? "#0000FF" : "#FF0000";
            this.walkable=value==0?true:false;
        }
        public setMaterial(materials:Material,index:number){
           this.material=materials.materials[index];
           
        }
        public toString():string{
            if(this.material.name
            ){
            return "row:"+this.ownedRow+" col:"+this.ownedCol+" walkable:"+this.walkable+" material:"+this.material.name;}
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();
            var button = new ui.Button();
            button.text = "Hello";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = ()=> {
                alert(111);
            }
        }
        
    }
}
