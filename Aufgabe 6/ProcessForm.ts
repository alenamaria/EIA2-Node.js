/*    Aufgabe: Aufgabe 6
      Name: Alena Hurst
      Matrikel: 257742
      Datum: 17.05.18
    
      Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/

namespace Client {
    
    window.addEventListener("load", init);
    let adress: string = "http://localhost:8100";

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("search");
        
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }

    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        let studyPath: HTMLSelectElement = <HTMLSelectElement>document.getElementById("select");  //Studiengang
        let matrikel: string = inputs[2].value;
        // let studi: Studi;
        
        let studi: string = JSON.stringify ({
            name: inputs[0].value,
            firstname: inputs[1].value,
            studyPath: studyPath.value,          
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked
        });

        console.log(studi);
        
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=inserts&studi=" + studi, true);
        xhr.send();
    }
    
    function refresh(_event: Event): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        output.value = "";
        // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
        
        /*for (let matrikel in AssocStringString) { 
            let studi: Studi = AssocStringString[matrikel];
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.studyPath + ", ";                            // Studiengang ausgeben nach refresh drücken
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }*/
        
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=refresh", true);
        xhr.send();
    }

    function search(_event: Event): void {
        let output: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textarea2");
        output.value = "";
        let matrikel: number = parseInt((<HTMLInputElement>document.getElementById("matrikelNr")).value);
        let studi: Studi = studiHomoAssoc[matrikel];
        
        if (typeof studi === "undefined") {
            output.value += "Kein Suchergebnis gefunden";
        }
        
        else {
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
            line += studi.studyPath + ", ";                            
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
    }
    
   

}