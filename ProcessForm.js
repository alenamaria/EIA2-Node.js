/*    Aufgabe: Aufgabe 6
      Name: Alena Hurst
      Matrikel: 257742
      Datum: 17.05.18
    
      Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
      Dieser Code wurde zusammen mit Franziska Hei� und Sofia Gschwend erarbeitet.
*/
var interfaceAufgabe6;
(function (interfaceAufgabe6) {
    window.addEventListener("load", init);
    let adress = "http://localhost:8100";
    function init(_event) {
        console.log("Init");
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("searchButton");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let studyPath = document.getElementById("select"); //Studiengang
        let matrikel = inputs[2].value;
        // let studi: Studi;
        let studi = JSON.stringify({
            name: inputs[0].value,
            firstname: inputs[1].value,
            studyPath: studyPath.value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked
        });
        console.log(studi);
        let xhr = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=inserts&studi=" + studi, true);
        xhr.send();
        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        // studiHomoAssoc[matrikel] = studi;
    }
    /*function sendRequestWithStudiData(_studi: Studi): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?name=" + _studi.name + "&firstname=" + _studi.firstname + "&studyPath=" + _studi.studyPath + "&matrikel=" + _studi.matrikel + "&age=" + _studi.age + "&gender=" + _studi.gender, true);
        xhr.send();
    }*/
    function refresh(_event) {
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        // for-in-Schleife iteriert �ber die Schl�ssel des assoziativen Arrays
        for (let matrikel in interfaceAufgabe6.studiHomoAssoc) {
            let studi = interfaceAufgabe6.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.studyPath + ", "; // Studiengang ausgeben nach refresh dr�cken
            line += studi.gender ? "m�nnlich" : "weiblich";
            output.value += line + "\n";
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=refresh", true);
        xhr.send();
    }
    function search(_event) {
        let output = document.getElementById("textarea2");
        output.value = "";
        let matrikel = parseInt(document.getElementById("matrikelNr").value);
        let studi = interfaceAufgabe6.studiHomoAssoc[matrikel];
        if (typeof studi === "undefined") {
            output.value += "Kein Suchergebnis gefunden";
        }
        else {
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
            line += studi.studyPath + ", ";
            line += studi.gender ? "m�nnlich" : "weiblich";
            output.value += line + "\n";
        }
    }
})(interfaceAufgabe6 || (interfaceAufgabe6 = {}));
//# sourceMappingURL=ProcessForm.js.map