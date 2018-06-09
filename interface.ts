/*    
Aufgabe: Aufgabe 2 - Memory
Name: Alena Hurst
Matrikel: 257742
Datum: 25.05.18

Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. 
Er wurde nicht kopiert und auch nicht diktiert.
*/

// Struktur des heterogenen assoziativen Arrays als Datensatz fÃ¼r eine studierende Person
interface Studi {
    name: string;
    firstname: string;
    studyPath: string;
    matrikel: number;
    age: number;
    gender: boolean;
}

interface AssocStringString {
    [key: string]: string;
}

// Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
interface Studis {
    // Datentyp ist nur Studi => nur ein einziger Datentyp - homogenes assoziatives Array
    [matrikel: string]: Studi;
    // einzelne Studenten werden mit der Matrikelnummer als Schlüssel gespeichert       
}

// Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
let studiHomoAssoc: Studis = {};
