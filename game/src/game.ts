
module game {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    
export class WorldMap extends render.DisplayObjectContainer {

        public grid: astar.Grid;
        private cache: HTMLCanvasElement;
        public stroke:render.Bitmap;
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
        material:render.Bitmap;
        walkable:number;
        constructor(source:string,name:string,walkable:number) {
            this.material=new render.Bitmap(source,name);
            this.walkable=walkable;

        }
        public setWalkable(walkable:number){
            this.walkable=walkable;
        }
        public IsWalkableMaterial():number{
            return this.walkable;
        }

        
    }
    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        public walkable: number;
        public material: Material;


        constructor() {
            super("Red.jpg","Tile");
        }

        public setWalkable(value) {
           
           
            this.walkable=value;
        }
        public setMaterial(material:Material){
           this.material=material;
          
           this.source=this.material.material.source;

           
        }
        public toString():string{
            if(this.material.material.name
            ){
            return "row:"+this.ownedRow+"\ncol:"+this.ownedCol+"\nwalkable:"+this.walkable+"\nmaterial:"+this.material.material.name;}
        }
    }
    
    
   
}
