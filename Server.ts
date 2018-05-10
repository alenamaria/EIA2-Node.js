// Node.js hat ein eingebautes Modul (HTTP), das Node.js erlaubt Daten �ber das 
// "Hyper Text Transfer Protocol" (HTTP) zu �bertragen
// URL-Modul: Teilt eine Web-Adresse in lesbare Abschnitte

import * as Http from "http";
// Bindet das HTTP Modul ein
import * as Url from "url";
// Bindet URL Modul ein

namespace Server {
    interface AssocStringString {
        // homogenes assoziatives Array, bei dem Daten vom Typ string dem "key" zugeordnet wird
        // Interface: Assoziatives Array mit key als Schl�ssel
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
    // wenn Programm l�uft - sprich auf etwas "geh�rt wird", dann Funktionsaufruf von handleListen
    server.addListener("request", handleRequest);
    // Server beibringen auf etwas zu h�ren
    server.listen(port);

    function handleListen(): void {
        console.log("Ich h�re?");
        // Ausgabe auf der Konsole bzw. im Terminal
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    // handleRequest hat automatisch zwei Parameter, ohne R�ckgabewert
        console.log("Ich h�re Stimmen!");
        // Ausgabe in der Konsole bzw. im Terminal
        // Server h�rt, wenn localhost:8100 im Browser ge�ffnet ist;
        // dann erscheint im Terminal "Ich h�re Stimmen"

        let query: AssocStringString = Url.parse(_request.url, true).query;
        // umwandeln von /?a=10&b=20 in ein JavaScript-Objekt
        let a: number = parseInt(query["a"]);
        // definieren von a als Variable
        let b: number = parseInt(query["b"]);
        // definieren von b als Variable

        for (let key in query) 
        // key als Schl�ssel
            console.log(query[key]);

        _response.setHeader("content-type", "text/html; charset=utf-8");
        // um das Umlautproblem im Browser zu l�sen, �ndert aber auch die Schriftart, 
        // weil angenommen wird, es handle sich um ein html-Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // f�r alle zug�nglich gemacht
        _response.write("Ich habe dich geh�rt<br/>");
        // Text erscheint auch im Browserfenster
        _response.write("Das Ergebnis ist: " + (a + b));
        // "Das Ergebnis ist: " und die L�sung der Rechnung erscheinen im Browserfenster

        _response.end();
        // "abschicken" - erscheint �ber http im Browserfenster
    }
}