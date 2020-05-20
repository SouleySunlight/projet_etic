var express = require('express');
var neo4j = require('neo4j-driver');
var path =require('path')
var bodyParser=require('body-parser');
var fs = require('fs');
var multer = require('multer');

var app = express();
var driver = neo4j.driver( 'bolt://localhost:7687', neo4j.auth.basic('neo4j', 'hjklhjkl'));
var session =driver.session();
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(express.static(__dirname + '/views'));

let upload = multer({dest: 'Uploads/'});

app.get('/test', function(req,res){
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

    console.log(name);


    session
        .run('CREATE(n:' + nature + ' {nom : $nameParam, identifiant:""}) RETURN n.nom',{nameParam: name})

        .then(function(result){
                res.redirect('/');
            })

        .catch(function(err){
            console.log(err);
        }
        );

    console.log(name);
    console.log(nature);

});

app.post('/ajout/relation', function(req, res){
    var depart = req.body.ptdepart;
    var arr = req.body.ptarr;
    var cost = req.body.cout;

    session
        .run('MATCH (a),(b) WHERE a.identifiant = $departParam AND b.identifiant=$arrParam CREATE (a)-[:LIEN {cout: $costParam}]->(b)',
            {departParam : parseInt(depart, 10), arrParam :parseInt(arr, 10), costParam : cost})
        .then(function(result){
            res.redirect('/');
        })
        .catch(function(err){
            console.log(err);
        })

});
app.post('/supp/noeud', function(req, res){
    var noeud = req.body.noeud_a_supprimer;
    session
        .run('MATCH(a) WHERE a.identifiant = $supParam DETACH DELETE a', {supParam: parseInt(noeud, 10)})
        .then(function(result){
            res.redirect('/')
        })
        .catch(function (err) {
            console.log(err);
        })

});
app.post('/supp/relation', function(req, res){
    var noeud = req.body.rel_a_supprimer;
    session
        .run('MATCH()-[r]->() WHERE r.identifiant = $supParam DELETE r', {supParam: parseInt(noeud, 10)})
        .then(function(result){
            res.redirect('/')
        })
        .catch(function (err) {
            console.log(err);
        })

});

app.post('/import/enjeux', upload.single("Chosir un fichier"), function(req, res) {
    var file = req.file;
    chemin = file.path;
    let result= "";

    fs.readFile(chemin, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);

        let n = "noeud"
        for (let i = 1; i < dataArray.length - 1; i++) {
            donnee = dataArray[i].split(";");

            result = result + "MERGE(" + n +i +":ENJEU {identifiant : " + donnee[1] + " ,nom : \"" + donnee[2] + "\"}) "

                }
    session
        .run(result)

        .catch(function (err) {
            console.log(err);
        })

    });
    res.redirect('/')

});
app.post('/import/transitions', upload.single("Chosir un fichier"), function(req, res) {
    var file = req.file;
    chemin = file.path;
    let result = "";

    fs.readFile(chemin, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);
        let e= "enjeu"
        let n = "noeud"
        let r= "relation";
        for (let i = 1; i < dataArray.length - 1; i++) {
            donnee = dataArray[i].split(";");
            temp_session = driver.session();
            result= "MATCH (enjeu1:ENJEU),(enjeu2:ENJEU),(enjeu3:ENJEU),(enjeu4:ENJEU),(enjeu5:ENJEU),(enjeu6:ENJEU),(enjeu7:ENJEU),(enjeu8:ENJEU),(enjeu9:ENJEU)\n" +
                "WHERE enjeu1.identifiant=1 AND enjeu2.identifiant=2 AND enjeu3.identifiant=3 AND enjeu4.identifiant=4 AND enjeu5.identifiant=5 AND enjeu6.identifiant=6 AND enjeu7.identifiant=7" +
                " AND enjeu8.identifiant=8 AND enjeu9.identifiant=9\n" +
                "MERGE(" + n+i +":TRANSITION {identifiant : "+donnee[1]+ ", nom: \"" + donnee[2]+ "\"}) \n"
            for(let j =1; j<donnee.length-2; j++){
                result= result+ "CREATE(" + n+i +")-["+r+j+":LIEN {cout:" + donnee[2+j] + "}]->("+e+j+")\n";
            }

            console.log(result);
            temp_session
                .run(result)
                .then(
                )
                .catch(function (err) {
                    console.log(err);

                })

        }

    });
    res.redirect('/');
});
/*app.post('/import/propositions', upload.single("Chosir un fichier"), function(req, res) {
    var file = req.file;
    chemin = file.path;
    let result = "";

    fs.readFile(chemin, 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);
        let e = "enjeu"
        let n = "noeud"
        let r = "relation";
        let type = "";
        for (let i = 1; i < dataArray.length - 1; i++) {
            donnee = dataArray[i].split(";");
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
                donnee[36] + "\", moins:\"" + donnee[37] + "\", qui:\"" + donnee[39] + "\", comment:\"" + donnee[40] +
                "\", quand:\"" + donnee[41] + "\", nomPersonnel:\"" + donnee[53] + "\", prenomPersonnel:\"" + donnee[54]
                + "\", mail:\"" + donnee[55] + "\", departement:\"" + donnee[56] + "\", remarques:\"" + donnee[57] + "})";
            console.log(result);
        }
    })
})
*/

app.listen(8080);
console.log("Serveur démarré sur le port 8080!");




