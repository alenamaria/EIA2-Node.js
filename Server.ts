import * as Http from "http";
// Bindet das HTTP Modul ein
import * as Url from "url";
// Bindet URL Modul ein

namespace Server {
    
    interface Studi {
        name: string;
        firstname: string;
        studyPath: string;         
        matrikel: number;
        age: number;
        gender: boolean;
    }
    
    interface Studis {
        // homogenes assoziatives Array, bei dem Daten vom Typ string dem "matrikel" zugeordnet wird
        // Interface: Assoziatives Array mit "matrikel" als Schlüssel
        [matrikel: string]: string;
    }
    
    interface Object {
        [key: string]: string
    }
    
    let studis: Studis = {};

    let port: number = process.env.PORT;
    // Globale Variable - representiert den Systemumgebungs-Status der Applikation, wenn sie startet
    if (port == undefined)
    // wenn der Port undefined ist, dann:  
        port = 8100;
        // soll port 8100 sein
    
    let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Acces-Control-Allow-Origin", "*");
        _response.end();
    });
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu hören
    server.listen(port);

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    // handleRequest hat automatisch zwei Parameter, ohne Rückgabewert
        let query: Object = Url.parse(_request.url, true).query;

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
        
        function insert(): void {
            console.log("insert");
        }
    
        function refresh(): void {
            console.log("refresh");
        }
    
        function search(_matrikel: string, _response: Http.ServerResponse): void {
            if (studis[_matrikel])
                _response.write(studis[_matrikel]);
            else
                _response.write("Kein Suchergebnis");
        }
        
        function error(): void {
            alert("Bitte überprüfen Sie Ihre Eingabe nochmals");
        }
}