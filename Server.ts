/*
Aufgabe: Aufgabe 6
Name: Alena Hurst
Matrikel: 257742
Datum: 27.05.18
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. 
Er wurde nicht kopiert und auch nicht diktiert.
*/

/******************************************
Server.ts wird auf Heroku irgendwie nicht aktualisiert, auch wenn ich einen Manual Deploy mache, 
sodass die Daten aus diesem TypeScript-Dokument nicht mit den anderen Dateien von Aufgabe 6 verknüpft werden. 
In der Konsole wird beim Öffnen der Heroku-App folgendes angezeigt:
"Fehler beim Laden der folgenden Adresse: Could not load the source for https://eia2-node-alenamaria.herokuapp.com/."
******************************************/

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
        [matrikel: string]: Studi;
    }
    
    interface Object {
        [key: string]: string;
    }
    
    let studiHomoAssoc: Studis = {};
    // let studis: Studis = {};

    let port: number = process.env.PORT;
    // Globale Variable - representiert den Systemumgebungs-Status der Applikation, wenn sie startet
    if (port == undefined)
    // wenn der Port undefined ist, dann:  
        port = 8100;
        // soll port 8100 sein
    
    let server: Http.Server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    }
    
    /*let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu hören
    server.listen(port);*/

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    // handleRequest hat automatisch zwei Parameter, ohne Rückgabewert
        // console.log("Ich höre Stimmen!");
        let query: Object = Url.parse(_request.url, true).query;
        console.log(query["order"]);

        if (query["order"]) {
            switch (query["order"]) {
            // Switch Statement: query["order"] wird mit den Werten aus den einzelnen cases verglichen
                
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
            
            let object: Studi = JSON.parse(query["data"]);
            // durch JSON.parse wird JSON in JavaScript geparst
            
            let _name: string = object.name;
            let _firstname: string = object.firstname;  
            let matrikel: string = object.matrikel.toString(); 
            let _age: number = object.age;
            let _gender: boolean = object.gender;
            let _studyPath: string = object.studyPath; 
             
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
            // Datensatz im assoziativen Array unter der Matrikelnummer speichern
            
            _response.write("Data received");
        }
    
        function refresh(_response: Http.ServerResponse): void {
            
            console.log(studiHomoAssoc);
            
            for (let matrikel in studiHomoAssoc) {
            // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female"; 
            _response.write(line + "\n");                                          
            }
        } 
    
        function search(query: Object, _response: Http.ServerResponse): void {
            
            let studi: Studi = studiHomoAssoc[query["searchFor"]];
            if (studi) {
                let line: string = query["searchFor"] + ": ";
                line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
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