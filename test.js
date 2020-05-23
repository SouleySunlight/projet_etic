var fs = require('fs');
var chemin = '../neo4j-community-4.0.4/import/all.csv'
var noeud = "{\"nodes\" : [\n";
var rel = "{\"edges\" : [\n";

fs.readFile(chemin, 'utf8', function (err, data) {
    var dataArray = data.split(/\r?\n/);
    for (let i = 1; i < dataArray.length - 1; i++) {
        var donnee = dataArray[i].split(',');
        if (donnee[1] == '":TRANSITION"') {
            if(noeud!="{\"nodes\" : [\n"){
                noeud=noeud+","
            }
            let s = donnee[3] + " " + donnee[4];
            s.replace(",", " ")
            noeud = noeud + "{id:" + donnee[2] + "," +
                " label:\"TRANSITION\"," +
                "nom:" + s + "} \n"
        } else if (donnee[1] == '":ENJEU"') {
            if(noeud!="{\"nodes\" : [\n"){
                noeud=noeud+","
            }
            let s = donnee[3] + " " + donnee[4];
             let x=s.replace(',', ' ');
             console.log(x);
            noeud = noeud + "{id:" + donnee[2] + "," +
                " label:\"ENJEU\"," +
                "nom:" + x + "}\n"
        } else {
            if(rel!="{\"edges\" : [\n"){
                rel=rel+","
            }
            rel = rel + "{from:" + donnee[4] + "," +
                " to:" + donnee[5] + "," +
                "label:" + donnee[7]  +
                "}\n"
        }
    }
    function afficher(a) {
        a="function ok";
    }

    noeud= noeud + "] }";
    rel=rel + "]}";

    console.log(noeud);
    console.log(rel);

  /*  fs.writeFile('Uploads/noeud.json', noeud, function (err, data) {
        if (err) {
            return console.log(err)
        }

    });
    fs.writeFile('Uploads/relation.json', rel, function (err, data) {
        if (err) {
            return console.log(err)
        }

    });*/




})

/*let rawdata = fs.readFileSync('Uploads/noeud.json');
let student = JSON.parse(rawdata);
console.log(student);


*/
