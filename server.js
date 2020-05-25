var express = require('express');
var neo4j = require('neo4j-driver');
var path =require('path')
var bodyParser=require('body-parser');
var fs = require('fs');
var multer = require('multer');
var chemin = '../neo4j-community-4.0.4/import/all.csv';

var app = express();
var driver = neo4j.driver( 'bolt://localhost:7687', neo4j.auth.basic('neo4j', 'hjklhjkl'));
var session =driver.session();
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(express.static(__dirname + '/views'));

let upload = multer({dest: 'Uploads/'});

    function refresh_csv(callback) {
            session
                .run('CALL apoc.export.csv.all(\"all.csv\", {})')
                .catch(function (err) {
                    console.log(err);

                })
        callback();



}
    function refresh_json(callback) {
        var noeud = "{\"nodes\" : [\n";
        var rel = "\"edges\" : [\n";
        fs.readFile(chemin, 'utf8', function (err, data) {
            var dataArray = data.split(/\r?\n/);
            for (let i = 1; i < dataArray.length - 1; i++) {
                var donnee = dataArray[i].split(',');
                console.log(donnee)
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
                }
                else if (donnee[1] == '":OBJECTIF"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[3] + " " + donnee[4];
                    let x = s.replace(',', ' ');
                    x = s.replace('�', 'e');
                    x = s.replace("�", 'e');
                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\"OBJECTIF\"," +
                        "\"nom\":" + x + ",\"color\":{\"background\":\"orange\", \"highlight\":\"blue\"}}\n"
                }
                else if (donnee[1] == '":ACTION"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[3] + " " + donnee[4];
                    let x = s.replace(',', ' ');
                    x = s.replace('�', 'e');
                    x = s.replace("�", 'e');
                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\"ACTION\"," +
                        "\"nom\":" + x + ",\"color\":{\"background\":\"pink\", \"highlight\":\"blue\"}}\n"
                }
                else if (donnee[1] == '":TACHE"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[3] + " " + donnee[4];
                    let x = s.replace(',', ' ');
                    x = s.replace('�', 'e');
                    x = s.replace("�", 'e');
                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\"TACHE\"," +
                        "\"nom\":" + x + ",\"color\":{\"background\":\"yellow\", \"highlight\":\"blue\"}}\n"
                }
                else {
                    if (rel != "\"edges\" : [\n") {
                        rel = rel + ","
                    }
                    rel = rel + "{\"from\":" + donnee[4] + "," +
                        " \"to\":" + donnee[5] + "," +
                        "\"id\":" + donnee[8] +
                        ",\"label\":" + donnee[7] +
                        "}\n"
                }
            }
            data = noeud + "],\n" + rel + "]}";
            console.log(data)

            fs.writeFile('views/doute.json', data, function (err, data) {
                if (err) {
                    return console.log(err)
                }
            });

        });
    callback()
    }





app.get('/test', function(req,res) {

        res.render('test');
});
app.get('/', function(req,res){
           res.render('index');

});
app.get('/filtrer', function(req,res){
    res.render('filtrer');

});
app.post('/ajout/noeud', function(req, res){
    var name = req.body.name;
    var nature = req.body.noeud;
    console.log(nature)
    console.log(name)


    session
        .run('CREATE(n:' + nature + ' {nom : $nameParam, identifiant:""}) RETURN n.nom',{nameParam: name})

        .then(function(){
            refresh_csv(function () {
                setTimeout(function(){
                    refresh_json(function () {
                        res.redirect('/')
                })
                },300)


                });

            })






        .catch(function(err){
            console.log(err);
        }
        );

    console.log(name);
    console.log(nature);

});
app.post('/creation/relation', function(req, res){
    var id1 = req.body.id1;
    var id2 = req.body.id2;
    var cost = req.body.cout;


    session
        .run('MATCH (a),(b) WHERE id(a) = $departParam AND id(b)=$arrParam CREATE (a)-[r:LIEN {cout: $costParam}]->(b)\n ' +
            'SET r.identifiant=id(r)',
            {departParam : parseInt(id1, 10), arrParam :parseInt(id2, 10), costParam : parseInt(cost,10)})
        .then(function(){
            refresh_csv(function () {
                setTimeout(function(){
                    refresh_json(function () {
                        res.redirect('/')
                    })
                },300)


            });

        })
        .catch(function(err){
            console.log(err);
        })

});
app.post('/supp/noeud', function(req, res){
    var noeud = req.body.id_a_supp
    console.log(noeud)
    session
        .run('MATCH(a) WHERE id(a) = $supParam DETACH DELETE a', {supParam: parseInt(noeud,10)})
        .then(function(){
                refresh_csv(function () {
                    setTimeout(function(){
                        refresh_json(function () {
                            res.redirect('/')
                        })
                    },300)


                });

            })


        .catch(function (err) {
            console.log(err);
        });

});
app.post('/modif/noeud', function (req, res) {
    var noeud = req.body.id_a_modif;
    var nom = req.body.nom;
    console.log("noeud = "+noeud)
    console.log(nom)
    session
        .run('MATCH(n) WHERE id(n)= $idParam SET n.nom =$nomParam', {idParam: parseInt(noeud,10), nomParam: nom})
        .then(function(){
            refresh_csv(function () {
                setTimeout(function(){
                    refresh_json(function () {
                        res.redirect('/')
                    })
                },300)


            });

        })
        .catch(function(err){
            console.log(err)
        })

});
app.post('/supp/relation', function(req, res){
    var noeud = req.body.rel_a_supp;
    session
        .run('MATCH()-[r]->() WHERE r.identifiant = $supParam DELETE r', {supParam: parseInt(noeud, 10)})
        .then(function(){
            refresh_csv(function () {
                setTimeout(function(){
                    refresh_json(function () {
                        res.redirect('/')
                    })
                },300)


            });

        })
        .catch(function (err) {
            console.log(err);
        })

});
app.post('/import/enjeux', upload.single("Chosir un fichier"), function(req, res) {
    var file = req.file;
    lien = file.path;
    let result= "";

    fs.readFile(lien, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);

        let n = "noeud"
        for (let i = 1; i < dataArray.length - 1; i++) {
            donnee = dataArray[i].split(";");

            result = result + "MERGE(" + n +i +":ENJEU {identifiant : " + donnee[1] + " ,nom : \"" + donnee[2] + "\"}) "
            console.log(result)

                }
    session
        .run(result)
        .then(function() {
            setTimeout(function () {
                refresh_csv(function () {
                    setTimeout(function () {
                        refresh_json(function () {

                            res.redirect('/')
                        })
                    }, 500)


                });

            }, 500)
        })
        .catch(function (err) {
            console.log(err);
        })

    });

});
app.post('/import/transitions', upload.single("Chosir un fichier"), function(req, res) {
    var file = req.file;
    lien = file.path;
    let result = "";

    fs.readFile(lien, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);
        let e = "enjeu"
        let n = "noeud"
        let r = "relation";
        for (let i = 1; i < dataArray.length - 1; i++) {
            donnee = dataArray[i].split(";");
            temp_session = driver.session();
            result = "MATCH (enjeu1:ENJEU),(enjeu2:ENJEU),(enjeu3:ENJEU),(enjeu4:ENJEU),(enjeu5:ENJEU),(enjeu6:ENJEU),(enjeu7:ENJEU),(enjeu8:ENJEU),(enjeu9:ENJEU)\n" +
                "WHERE enjeu1.identifiant=1 AND enjeu2.identifiant=2 AND enjeu3.identifiant=3 AND enjeu4.identifiant=4 AND enjeu5.identifiant=5 AND enjeu6.identifiant=6 AND enjeu7.identifiant=7" +
                " AND enjeu8.identifiant=8 AND enjeu9.identifiant=9\n" +
                "MERGE(" + n + i + ":TRANSITION {identifiant : " + donnee[1] + ", nom: \"" + donnee[2] + "\"}) \n"
            for (let j = 1; j < donnee.length - 2; j++) {
                result = result + "CREATE(" + n + i + ")-[" + r + j + ":LIEN {cout:" + donnee[2 + j] + "}]->(" + e + j + ")\n";
                result = result + "SET " + r + j + ".identifiant= id(" + r + j + ")\n"
                console.log(result)
            }

            console.log(result);
            temp_session
                .run(result)
                .catch(function (err) {
                    console.log(err);

                })

        }
        setTimeout(function () {
            refresh_csv(function () {
                setTimeout(function () {
                    refresh_json(function () {

                        res.redirect('/')

                    })
                },1000)
            })
        },1000)
    })
})

    app.post('/import/propositions', upload.single("Chosir un fichier"), function (req, res) {
        var file = req.file;
        lien = file.path;
        let result = "";

        fs.readFile(lien, 'utf8', function (err, data) {
            var dataArray = data.split(/\r\n/);
            let e = "enjeu"
            let n = "noeud"
            let r = "relation";
            let type = "";
            for (let i = 1; i < dataArray.length - 1; i++) {
                console.log(dataArray.length)
                donnee = dataArray[i].split(";");
                for (let i = 0; i < donnee.length; i++) {
                    donnee[i] = donnee[i].replace(',', ' ')
                    donnee[i] = donnee[i].replace('"', ' ')
                    donnee[i] = donnee[i].replace('\'', ' ')
                    donnee[i] = donnee[i].replace('\n', ' ')


                }
                temp_session = driver.session();
                result = "MATCH (enjeu1:ENJEU),(enjeu2:ENJEU),(enjeu3:ENJEU),(enjeu4:ENJEU),(enjeu5:ENJEU),(enjeu6:ENJEU),(enjeu7:ENJEU),(enjeu8:ENJEU),(enjeu9:ENJEU)\n" +
                    "WHERE enjeu1.identifiant=1 AND enjeu2.identifiant=2 AND enjeu3.identifiant=3 AND enjeu4.identifiant=4 AND enjeu5.identifiant=5 AND enjeu6.identifiant=6 AND enjeu7.identifiant=7" +
                    " AND enjeu8.identifiant=8 AND enjeu9.identifiant=9\n";
                switch (donnee[1]) {
                    case 'T':
                        type = "TACHE";
                        break;
                    case 'O' :
                        type = "OBJECTIF";
                        break;
                    case 'A':
                        type = "ACTION";
                        break
                }
                result = result + "MERGE(n:" + type + "{nom:\"" + donnee[3] + "\", quoi:\"" + donnee[4]
                    + "\", attachement:\"" + donnee[5] + "\", pourquoi\":" + donnee[6] + "\", plus:\"" +
                    donnee[36] + "\", moins:\"" + donnee[37] + "\", qui:\"" + donnee[38] + "\", comment:\"" + donnee[39] +
                    "\", quand:\"" + donnee[40] + "\", nomPersonnel:\"" + donnee[52] + "\", prenomPersonnel:\"" + donnee[53]
                    + "\", mail:\"" + donnee[54] + "\", departement:\"" + donnee[55] + "\", remarques:\"" + donnee[56] + "})\n";
                /* if(donnee[9]=="" &&donnee[10]=="" &&donnee[11]=="" &&donnee[12]=="" &&donnee[13]=="" &&donnee[14]=="" &&donnee[15]=="" &&donnee[16]=="" &&donnee[17]==""){

                 }*/
                /*temp_session
                    .run(result)
                    .catch(function (err) {
                        console.log(err)
                    });*/

                console.log(result);
            }

        })
        res.redirect('/')
    })

    app.listen(8080);
    console.log("Serveur démarré sur le port 8080!");


