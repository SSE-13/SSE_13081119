module data {
    
    export class Storage {
        
        
        private static _instance:Storage;
        
        public mapData;
        
        
        public static getInstance():Storage{
            if (!Storage._instance){
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }
        
        
        
        readFile(callback){
            
            var xmlhttprequest = new XMLHttpRequest();
            xmlhttprequest.onload = ()=> {
                var mapData = JSON.parse(xmlhttprequest.responseText);
                Storage.getInstance().mapData = mapData;
                
                
                callback();
                
            }
            xmlhttprequest.open("GET","lib/mapsave.json",true);
            xmlhttprequest.send(null);
            
            
        }
        
        
    }
    
    
    
}