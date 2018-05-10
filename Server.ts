// Node.js hat ein eingebautes Modul (HTTP), das Node.js erlaubt Daten über das 
// "Hyper Text Transfer Protocol" (HTTP) zu übertragen
// URL-Modul: Teilt eine Web-Adresse in lesbare Abschnitte

import * as Http from "http";
// Bindet das HTTP Modul ein
import * as Url from "url";
// Bindet URL Modul ein

namespace Server {
    interface AssocStringString {
        // homogenes assoziatives Array, bei dem Daten vom Typ string dem "key" zugeordnet wird
        // Interface: Assoziatives Array mit key als Schlüssel
        [key: string]: string;
    }

    let port: number = process.env.PORT;
    // Globale Variable - representiert den Systemumgebungs-Status der Applikation, wenn sie startet
    if (port == undefined)
    // wenn der Port undefined ist, dann:  
        port = 8100;
        // soll port 8100 sein
    
    let server: Http.Server = Http.createServer();
    // erzeugt Server-Objekt, mit dem weiter gearbeitet werden kann
    server.addListener("listening", handleListen);
    // wenn Programm läuft - sprich auf etwas "gehört wird", dann Funktionsaufruf von handleListen
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu hören
    server.listen(port);

    function handleListen(): void {
        console.log("Ich höre?");
        // Ausgabe auf der Konsole bzw. im Terminal
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    // handleRequest hat automatisch zwei Parameter, ohne Rückgabewert
        console.log("Ich höre Stimmen!");
        // Ausgabe in der Konsole bzw. im Terminal
        // Server hört, wenn localhost:8100 im Browser geöffnet ist;
        // dann erscheint im Terminal "Ich höre Stimmen"

        let query: AssocStringString = Url.parse(_request.url, true).query;
        // umwandeln von /?a=10&b=20 in ein JavaScript-Objekt
        let a: number = parseInt(query["a"]);
        // definieren von a als Variable
        let b: number = parseInt(query["b"]);
        // definieren von b als Variable

        for (let key in query) 
        // key als Schlüssel
            console.log(query[key]);

        _response.setHeader("content-type", "text/html; charset=utf-8");
        // um das Umlautproblem im Browser zu lösen, ändert aber auch die Schriftart, 
        // weil angenommen wird, es handle sich um ein html-Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // für alle zugänglich gemacht
        _response.write("Ich habe dich gehört<br/>");
        // Text erscheint auch im Browserfenster
        _response.write("Das Ergebnis ist: " + (a + b));
        // "Das Ergebnis ist: " und die Lösung der Rechnung erscheinen im Browserfenster

        _response.end();
        // "abschicken" - erscheint über http im Browserfenster
    }
}