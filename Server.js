/*
Aufgabe: Aufgabe 6
Name: Alena Hurst
Matrikel: 257742
Datum: 27.05.18
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe.
Er wurde nicht kopiert und auch nicht diktiert.
*/
"use strict";
const Http = require("http");
// Bindet das HTTP Modul ein
const Url = require("url");
// Bindet URL Modul ein
var Server;
(function (Server) {
    let studiHomoAssoc = {};
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
    });
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu h�ren
    server.listen(port);
    function handleRequest(_request, _response) {
        // handleRequest hat automatisch zwei Parameter, ohne R�ckgabewert
        console.log("Ich h�re Stimmen!");
        let query = Url.parse(_request.url, true).query;
        console.log(query["order"]);
        if (query["order"]) {
            switch (query["order"]) {
                // Switch Statement: query["order"] wird mit den Werten aus den einzelnen cases verglichen
                case "insert":
                    insert(query, _response);
                    break;
                case "refresh":
                    refresh(_response);
                    break;
                case "search":
                    search(query, _response);
                    break;
                default: error();
            }
        }
        _response.end();
    }
    function insert(query, _response) {
        let object = JSON.parse(query["data"]);
        // durch JSON.parse wird JSON in JavaScript geparst
        let _name = object.name;
        let _firstname = object.firstname;
        let matrikel = object.matrikel.toString();
        let _age = object.age;
        let _gender = object.gender;
        let _studyPath = object.studyPath;
        let studi;
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
        _response.write("Daten empfangen");
    }
    function refresh(_response) {
        console.log(studiHomoAssoc);
        for (let matrikel in studiHomoAssoc) {
            // for-in-Schleife iteriert �ber die Schl�ssel des assoziativen Arrays
            let studi = studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age;
            line += studi.gender ? "male" : "female";
            _response.write(line + "\n");
        }
    }
    function search(query, _response) {
        let studi = studiHomoAssoc[query["searchFor"]];
        if (studi) {
            let line = query["searchFor"] + ": ";
            line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age;
            line += studi.gender ? "male" : "female";
            _response.write(line);
        }
        else {
            _response.write("No search result");
        }
    }
    function error() {
        alert("Error");
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map