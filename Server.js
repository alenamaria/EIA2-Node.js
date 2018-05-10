// Node.js hat ein eingebautes Modul (HTTP), das Node.js erlaubt Daten �ber das 
// "Hyper Text Transfer Protocol" (HTTP) zu �bertragen
// URL-Modul: Teilt eine Web-Adresse in lesbare Abschnitte
"use strict";
const Http = require("http");
// Bindet das HTTP Modul ein
const Url = require("url");
// Bindet URL Modul ein
var Server;
(function (Server) {
    let port = process.env.PORT;
    // Globale Variable - representiert den Systemumgebungs-Status der Applikation, wenn sie startet
    if (port == undefined)
        // wenn der Port undefined ist, dann:  
        port = 8100;
    // soll port 8100 sein
    let server = Http.createServer();
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    server.addListener("listening", handleListen);
    // wenn Programm l�uft - sprich auf etwas "geh�rt wird", dann Funktionsaufruf von handleListen
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu h�ren
    server.listen(port);
    function handleListen() {
        console.log("Ich höre?");
        // Ausgabe auf der Konsole bzw. im Terminal
    }
    function handleRequest(_request, _response) {
        // handleRequest hat automatisch zwei Parameter, ohne R�ckgabewert
        console.log("Ich höre Stimmen!");
        // Ausgabe in der Konsole bzw. im Terminal
        // Server h�rt, wenn localhost:8100 im Browser ge�ffnet ist;
        // dann erscheint im Terminal "Ich h�re Stimmen"
        let query = Url.parse(_request.url, true).query;
        // umwandeln von /?a=10&b=20 in ein JavaScript-Objekt
        let a = parseInt(query["a"]);
        // definieren von a als Variable
        let b = parseInt(query["b"]);
        // definieren von b als Variable
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // um das Umlautproblem im Browser zu l�sen, �ndert aber auch die Schriftart, 
        // weil angenommen wird, es handle sich um ein html-Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // f�r alle zug�nglich gemacht
        _response.write("Ich habe dich gehört<br/>");
        // Text erscheint auch im Browserfenster
        for (let key in query)
            // key als Schl�ssel
            // console.log(query[key]);
            _response.write("eingegebene Query-Informationen: " + (query[key]) + "<br>");
        _response.write("Das Ergebnis ist: " + (a + b));
        // "Das Ergebnis ist: " und die L�sung der Rechnung erscheinen im Browserfenster
        _response.end();
        // "abschicken" - erscheint �ber http im Browserfenster
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map