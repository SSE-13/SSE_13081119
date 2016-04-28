var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (!Storage._instance) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function (callback) {
            var xmlhttprequest = new XMLHttpRequest();
            xmlhttprequest.onload = function () {
                var mapData = JSON.parse(xmlhttprequest.responseText);
                Storage.getInstance().mapData = mapData;
                callback();
            };
            xmlhttprequest.open("GET", "lib/mapsave.json", true);
            xmlhttprequest.send(null);
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
