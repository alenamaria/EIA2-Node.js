"use strict";
const Http = require("http");
// Bindet das HTTP Modul ein
const Url = require("url");
// Bindet URL Modul ein
var Server;
(function (Server) {
    let studis = {};
    let port = process.env.PORT;
    // Globale Variable - representiert den Systemumgebungs-Status der Applikation, wenn sie startet
    if (port == undefined)
        // wenn der Port undefined ist, dann:  
        port = 8100;
    // soll port 8100 sein
    let server = Http.createServer((_request, _response) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Acces-Control-Allow-Origin", "*");
        _response.end();
    });
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu h�ren
    server.listen(port);
    function handleRequest(_request, _response) {
        // handleRequest hat automatisch zwei Parameter, ohne R�ckgabewert
        let query = Url.parse(_request.url, true).query;
        if (query["action"]) {
            switch (query["action"]) {
                case "insert":
                    insert();
                    break;
                case "refresh":
                    refresh();
                    break;
                case "search":
                    _response.write("Search");
                    break;
                default: error();
            }
        }
        _response.end();
    }
    function insert() {
        console.log("insert");
    }
    function refresh() {
        console.log("refresh");
    }
    function search(_matrikel, _response) {
        if (studis[_matrikel])
            _response.write(studis[_matrikel]);
        else
            _response.write("Kein Suchergebnis");
    }
    function error() {
        alert("Bitte �berpr�fen Sie Ihre Eingabe nochmals");
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map