var fs = require('fs');
var chemin = '../../neo4j-community-4.0.4/import/all.csv'
var noeud = "{\"nodes\" : [\n";
var rel = "\"edges\" : [\n";

    fs.readFile(chemin, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);
        for (let i = 1; i < dataArray.length - 1; i++) {
            var donnee = dataArray[i].split(',');
            console.log(donnee);
            if (donnee[1] == '":TRANSITION"') {
                if (noeud != "{\"nodes\" : [\n") {
                    noeud = noeud + ","
                }
                let s = donnee[3] + " " + donnee[4];
                s.replace(",", " ");
                x = s.replace('�', 'e');
                x = s.replace("�", 'e');
                noeud = noeud + "{\"id\":" + donnee[0] + "," +
                    " \"label\":\"TRANSITION\"," +
                    "\"nom\":" + s + "} \n"
            } else if (donnee[1] == '":ENJEU"') {
                if (noeud != "{\"nodes\" : [\n") {
                    noeud = noeud + ","
                }
                let s = donnee[3] + " " + donnee[4];
                let x = s.replace(',', ' ');
                x = s.replace('�', 'e');
                x = s.replace("�", 'e');
                noeud = noeud + "{\"id\":" + donnee[0] + "," +
                    " \"label\":\"ENJEU\"," +
                    "\"nom\":" + x + ",\"color\":{\"background\":\"green\", \"highlight\":\"blue\"}}\n"
            } else {
                if (rel != "\"edges\" : [\n") {
                    rel = rel + ","
                }
                rel = rel + "{\"from\":" + donnee[4] + "," +
                    " \"to\":" + donnee[5] + "," +
                    "\"label\":" + donnee[7] +
                    "}\n"
            }
        }
        data = noeud + "],\n" + rel + "]}";

        fs.writeFile('data.json', "J'ecris ici", function (err, data) {
            if (err) {
                return console.log(err)
            }
        });


    });



