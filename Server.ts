import * as Http from "http";
// Bindet das HTTP Modul ein
import * as Url from "url";
// Bindet URL Modul ein

namespace Aufgabe6 {
    
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
        [matrikel: string]: Studi;
    }
    
    interface Object {
        [key: string]: string;
    }
    
    let studiHomoAssoc: Studis = {};
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
    });
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu hören
    server.listen(port);

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    // handleRequest hat automatisch zwei Parameter, ohne Rückgabewert
        console.log("Ich höre Stimmen!");
        let query: Object = Url.parse(_request.url, true).query;
        console.log(query["order"]);

        if (query["order"]) {
            switch (query["order"]) {
                
                case "insert":
                    insert (query, _response);
                    break;
                
                case "refresh":
                    refresh (_response);
                    break;
                    
                case "search":
                    search (query, _response);
                    break;
                    
                default: error();
            }
        }
        
        _response.end();
        }
        
        function insert(query: Object, _response: Http.ServerResponse): void {
            
            let obj: Studi = JSON.parse(query["data"]);
            
            let _name: string = obj.name;
            let _firstname: string = obj.firstname;  
            let matrikel: string = obj.matrikel.toString(); 
            let _age: number = obj.age;
            let _gender: boolean = obj.gender;
            let _studyPath: string = obj.studyPath; 
             
            let studi: Studi;
            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(matrikel),
                age: _age,
                gender: _gender,
                studyPath: _studyPath
            };  
            
            studiHomoAssoc[matrikel] = studi;
            _response.write("Daten empfangen");
        }
    
        function refresh(_response: Http.ServerResponse): void {
            
            console.log(studiHomoAssoc);
            
            for (let matrikel in studiHomoAssoc) {  
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "male" : "female"; 
            _response.write(line + "\n");                                          
            }
        } 
    
        function search(query: Object, _response: Http.ServerResponse): void {
            
            let studi: Studi = studiHomoAssoc[query["searchFor"]];
            if (studi) {
                let line: string = query["searchFor"] + ": ";
                line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
                line += studi.gender ? "male" : "female";
                _response.write(line);
            } else {
                _response.write("No search result");    
            }    
}
        
        function error(): void {
            alert("Error");
        }
}