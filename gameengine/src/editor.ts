
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
            if(value==0){
                this.material=new Material("Red.jpg","red",value);
            }
            else{
                this.material=new Material("Black.jpg","black",value);
            }
            this.source=this.material.material.source;
            this.name=this.material.material.name;
            this.walkable=value;
        }
        public setMaterial(material:Material){
           this.material=material;
          
           this.source=this.material.material.source;
           this.name=this.material.material.name;
           this.walkable=this.material.walkable;
           
        }
        public toString():string{
            if(this.material.material.name
            ){
            return "row:"+this.ownedRow+" col:"+this.ownedCol+" walkable:"+this.walkable+" material:"+this.material.material.name;}
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {

        currentmaterial;
        constructor(materials:editor.Material[]){
            super();
            var button = new ui.Button();
            button.text = "Green";
            button.width = 100;
            button.height = 50;
            this.addChild(button);
            button.onClick = ()=> {
                /*var radio=document.getElementsByName("material");
                for(var i=0;i < radio.length;i++){
                    if(radio[i].checked){
                        this.currentmaterial=materials[radio[i].value];
                    }
                }*/
                this.currentmaterial=materials[0];
                }
             var button2 = new ui.Button();
            button2.text = "Black";
            button2.width = 100;
            button2.height = 50;
            button2.y=60;
            this.addChild(button2);
            button2.onClick = ()=> {
                /*var radio=document.getElementsByName("material");
                for(var i=0;i < radio.length;i++){
                    if(radio[i].checked){
                        this.currentmaterial=materials[radio[i].value];
                    }
                }*/
                 this.currentmaterial=materials[1];
                }
            var button3 = new ui.Button();
            button3.text = "Red";
            button3.width = 100;
            button3.height = 50;
            button3.y=120;
            this.addChild(button3);
            button3.onClick = ()=> {
                /*var radio=document.getElementsByName("material");
                for(var i=0;i < radio.length;i++){
                    if(radio[i].checked){
                        this.currentmaterial=materials[radio[i].value];
                    }
                }*/
                 this.currentmaterial=materials[2];
                }
            
        }
    
        
    }
}
