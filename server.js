var express = require('express');
var neo4j = require('neo4j-driver');
var path =require('path')
var bodyParser=require('body-parser');
var fs = require('fs');
var multer = require('multer');
var encoding = require('encoding')
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
                if (donnee[1] == '":TRANSITION"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[6];
                    let f;
                    let x=s.replace(",", " ");
                    if(x.length>12){
                    f =x.substr(1, 10)+"..."}
                    else{
                        f=x.substr(1,x.length-2);}


                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\""+f+"\"," +
                        "\"nom\":" + x +","+
                        "\"attachement\":\"\"," +
                        "\"comment\":\"\"," +
                        "\"identifiant\":" +donnee[4] +","+
                        "\"moins\":\"\"," +
                        "\"plus\":\"\"," +
                        "\"pourquoi\":\"\"," +
                        "\"proposeur\":\"\"," +
                        "\"quand\":\"\"," +
                        "\"qui\":\"\"," +
                        "\"quoi\":\"\"," +
                        "\"remarques\":\"\"," +
                        "\"type\":\"TRANSITION\"," +
                        "\"z1\":\"\", " +
                        "\"z2\":\"\", " +
                        "\"z3\":\"\", " +
                        "\"z4\":\"\", " +
                        "\"z5\":\"\", " +
                        "\"z6\":\"\", " +
                        "\"z7\":\"\", " +
                        "\"z8\":\"\", " +
                        "\"z9\":\"\", " +
                        "\"z10\":\"\" " +
                        ",\"color\":{\"highlight\":\"blue\"}" +
                        "} \n"
                    for(let i=0; i<donnee.length;i++){

                    }
                }
                else if (donnee[1] == '":ENJEU"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[6];
                    let x = s.replace(',', ' ');
                    let f
                    if(x.length>12){
                        f =x.substr(1, 10)+"..."}
                    else{
                        f=x.substr(1,x.length-2);}
                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\""+f+"\"," +
                        "\"nom\":" + x +","+
                        "\"attachement\":\"\"," +
                        "\"comment\":\"\"," +
                        "\"identifiant\":" +donnee[4] +","+
                        "\"moins\":\"\"," +
                        "\"plus\":\"\"," +
                        "\"pourquoi\":\"\"," +
                        "\"proposeur\":\"\"," +
                        "\"quand\":\"\"," +
                        "\"qui\":\"\"," +
                        "\"quoi\":\"\"," +
                        "\"remarques\":\"\"," +
                        "\"type\":\"ENJEU\"," +
                        "\"z1\":\"\", " +
                        "\"z2\":\"\", " +
                        "\"z3\":\"\", " +
                        "\"z4\":\"\", " +
                        "\"z5\":\"\", " +
                        "\"z6\":\"\", " +
                        "\"z7\":\"\", " +
                        "\"z8\":\"\", " +
                        "\"z9\":\"\", " +
                        "\"z10\":\"\" " +
                        ",\"color\":{\"background\":\"green\", \"highlight\":\"blue\"}" +

                        "}\n"
                }
                else if (donnee[1] == '":OBJECTIF"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[6];
                    let f
                    let x = s.replace(',', ' ');
                    if(x.length>12){
                        f =x.substr(1, 10)+"..."}
                    else{
                        f=x.substr(1,x.length-2);}
                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\""+f+"\"," +
                        "\"nom\":" + x + "," +
                        "\"attachement\":" + donnee[2] +","+
                        "\"comment\":"+ donnee[3] +","+
                        "\"identifiant\":" +donnee[4] +","+
                        "\"moins\":" + donnee[5] +","+
                        "\"plus\":" + donnee[7] +","+
                        "\"pourquoi\":" + donnee[8] +","+
                        "\"proposeur\":" + donnee[9] +","+
                        "\"quand\":" + donnee[10] +","+
                        "\"qui\":" + donnee[11] +","+
                        "\"quoi\":" + donnee[12] +","+
                        "\"remarques\":" + donnee[13] +","+
                        "\"type\":\"ORIENTATION\"," +
                        "\"z1\":"+donnee[14]+", " +
                        "\"z2\":"+donnee[16]+", " +
                        "\"z3\":"+donnee[17]+", " +
                        "\"z4\":"+donnee[18]+", " +
                        "\"z5\":"+donnee[19]+", " +
                        "\"z6\":"+donnee[20]+", " +
                        "\"z7\":"+donnee[21]+", " +
                        "\"z8\":"+donnee[22]+", " +
                        "\"z9\":"+donnee[23]+", " +
                        "\"z10\":"+donnee[15]+", " +
                        "\"color\":{\"background\":\"orange\", \"highlight\":\"blue\"}}\n"
                    for(let i=0; i<donnee.length;i++){
                        console.log(i+"="+donnee[i])

                    }
                }
                else if (donnee[1] == '":ACTION"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[6];
                    let x = s.replace(',', ' ');
                    let f
                    if(x.length>12){
                        f =x.substr(1, 10)+"..."}
                    else{
                        f=x.substr(1,x.length-2);}

                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\""+f+"\"," +
                        "\"nom\":" + x + "," +
                        "\"attachement\":" + donnee[2] +","+
                        "\"comment\":"+ donnee[3] +","+
                        "\"identifiant\":" +donnee[4] +","+
                        "\"moins\":" + donnee[5] +","+
                        "\"plus\":" + donnee[7] +","+
                        "\"pourquoi\":" + donnee[8] +","+
                        "\"proposeur\":" + donnee[9] +","+
                        "\"quand\":" + donnee[10] +","+
                        "\"qui\":" + donnee[11] +","+
                        "\"quoi\":" + donnee[12] +","+
                        "\"remarques\":" + donnee[13] +","+
                        "\"type\":\"ACTION\"," +
                        "\"z1\":"+donnee[14]+", " +
                        "\"z2\":"+donnee[16]+", " +
                        "\"z3\":"+donnee[17]+", " +
                        "\"z4\":"+donnee[18]+", " +
                        "\"z5\":"+donnee[19]+", " +
                        "\"z6\":"+donnee[20]+", " +
                        "\"z7\":"+donnee[21]+", " +
                        "\"z8\":"+donnee[22]+", " +
                        "\"z9\":"+donnee[23]+", " +
                        "\"z10\":"+donnee[15]+", " +
                        "\"color\":{\"background\":\"pink\", \"highlight\":\"blue\"}}\n"
                }
                else if (donnee[1] == '":TACHE"') {
                    if (noeud != "{\"nodes\" : [\n") {
                        noeud = noeud + ","
                    }
                    let s = donnee[6];
                    let x = s.replace(',', ' ');
                    let f
                    if(x.length>12){
                        f =x.substr(1, 10)+"..."}
                    else{
                        f=x.substr(1,x.length-2);}
                    noeud = noeud + "{\"id\":" + donnee[0] + "," +
                        " \"label\":\""+f+"\"," +
                        "\"nom\":" + x + "," +
                        "\"attachement\":" + donnee[2] +","+
                        "\"comment\":"+ donnee[3] +","+
                        "\"identifiant\":" +donnee[4] +","+
                        "\"moins\":" + donnee[5] +","+
                        "\"plus\":" + donnee[7] +","+
                        "\"pourquoi\":" + donnee[8] +","+
                        "\"proposeur\":" + donnee[9] +","+
                        "\"quand\":" + donnee[10] +","+
                        "\"qui\":" + donnee[11] +","+
                        "\"quoi\":" + donnee[12] +","+
                        "\"remarques\":" + donnee[13] +","+
                        "\"type\":\"TACHE\"," +
                        "\"z1\":"+donnee[14]+", " +
                        "\"z2\":"+donnee[16]+", " +
                        "\"z3\":"+donnee[17]+", " +
                        "\"z4\":"+donnee[18]+", " +
                        "\"z5\":"+donnee[19]+", " +
                        "\"z6\":"+donnee[20]+", " +
                        "\"z7\":"+donnee[21]+", " +
                        "\"z8\":"+donnee[22]+", " +
                        "\"z9\":"+donnee[23]+", " +
                        "\"z10\":"+donnee[15]+", " +
                        "\"color\":{\"background\":\"yellow\", \"highlight\":\"blue\"}}\n"
                }
                else {
                    if (rel != "\"edges\" : [\n") {
                        rel = rel + ","
                    }
                    rel = rel + "{\"from\":" + donnee[24] + "," +
                        " \"to\":" + donnee[25] + "," +
                        "\"id\":" + donnee[28] +
                        ",\"label\":" + donnee[27] +
                        "}\n"
                }
            }
            data = noeud + "],\n" + rel + "]}";


            fs.writeFile('views/doute.json', data, function (err, data) {
                if (err) {
                    return console.log(err)
                }
            });

        });
    callback()
    }




app.get('/vue/creation', function(req,res) {

    res.render('crea_noeud');
});
app.post('/vue/modif', function(req,res) {
    var noeud = req.body.id_a_modif


    res.render('modif_noeud', {data: {noeud: noeud}})
})

app.get('/', function(req,res){
           res.render('index');

});
app.post('/download', function(req,res){
    res.download(chemin, "content.csv", function (err) {
console.log(err)
    })
})
app.post('/filtrer', function(req,res){
    var noeud=req.body.noeud_a_filtrer
    res.render('filtrer',{noeud:noeud});

});
app.post('/ajout/noeud', function(req, res){
    var name = req.body.name;
    var nature = req.body.noeud;
    var quoi = req.body.quoi
    var pourquoi = req.body.pourquoi
    var qui = req.body.qui
    var quand = req.body.quand
    var comment = req.body.comment
    var plus = req.body.plus
    var moins = req.body.moins
    var proposeur = req.body.proposeur
    var remarque = req.body.remarque
    var attachements = req.body.attachements
    var z1 = req.body.z1
    var z2 = req.body.z2
    var z3= req.body.z3
    var z4 = req.body.z4
    var z5 = req.body.z5
    var z6 = req.body.z6
    var z7 = req.body.z7
    var z8 = req.body.z8
    var z9 = req.body.z9
    var z10 = req.body.z10



    if(!nature) {
        nature = "ENJEU"
    }


    session
        .run('CREATE(n:' + nature + ' {nom : $nameParam, identifiant:"",attachement:$attachementsParam, comment:$commentParam, moins:$moinsParam, plus:$plusParam, pourquoi:$pourquoiParam, proposeur:$proposeurParam,' +
            'quand: $quandParam, qui: $quiParam, quoi:$quoiParam, remarques:$remarquesParam, z1:$z1Param, z2:$z2Param, z3:$z3Param, z4:$z4Param, z5:$z5Param, z6:$z6Param' +
            ', z7:$z7Param, z8:$z8Param, z9:$z9Param, z10:$z10Param, type:\"'+nature+'\"}) RETURN n.nom',{nameParam: name, attachementsParam: attachements, commentParam:comment,
        moinsParam: moins, plusParam:plus, pourquoiParam:pourquoi, proposeurParam : proposeur, quandParam : quand, quiParam: qui,
       quoiParam :quoi, remarquesParam : remarque, z1Param:z1, z2Param:z2,z3Param:z3, z4Param:z4, z5Param:z5, z6Param:z6, z7Param:z7, z8Param:z8, z9Param:z9, z10Param:z10 })

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
    var noeud = req.body.noeud
    var name =req.body.name
    var quoi = req.body.quoi
    var pourquoi = req.body.pourquoi
    var qui = req.body.qui
    var quand = req.body.quand
    var comment = req.body.comment
    var plus = req.body.plus
    var moins = req.body.moins
    var proposeur = req.body.proposeur
    var remarque = req.body.remarque
    var attachements = req.body.attachements
    var z1 = req.body.z1
    var z2 = req.body.z2
    var z3= req.body.z3
    var z4 = req.body.z4
    var z5 = req.body.z5
    var z6 = req.body.z6
    var z7= req.body.z7
    var z8 = req.body.z8
    var z9 = req.body.z9
    var z10 = req.body.z10




    var demande = "MATCH(n) WHERE id(n)= "+noeud+" SET n.nom = \""+name+"\" SET n.attachement=\""+attachements+"\" SET n.comment=\""+comment+"\" SET n.moins=\""+moins+"\" SET n.plus=\""+plus+"\" SET n.pourquoi=\""+pourquoi+"\" SET n.proposeur=\""+proposeur+
    "\" SET n.quand= \""+quand+"\" SET n.qui= \""+qui+"\" SET n.quoi=\""+quoi+"\" SET n.remarques=\""+remarque+"\"SET n.z1=\""+z1+"\"SET n.z2=\""+z2+"\"SET n.z3=\""+z3+"\"" +
        "SET n.z4=\""+z4+"\"SET n.z5=\""+z5+"\"SET n.z6=\""+z6+"\"SET n.z7=\""+z7+"\"SET n.z8=\""+z8+"\"SET n.z9=\""+z9+"\"SET n.z10=\""+z10+"\" RETURN n"
    session
        .run(demande)
        .then(function(){
            console.log(demande)
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
app.post('/reinit', function(req, res){
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

app.post('/filtrer/noeud', function(req,res){
    var noeud = req.body.noeud;
    var a = req.body.saut;
    var s1 =req.body.cout1;
    var s2 =req.body.cout2;
    var s3 =req.body.cout3;
    var s4 =req.body.cout4;
    var s5 =req.body.cout5;
    var tablien = [s1,s2,s3,s4,s5]

    var comp1 =req.body.comp1
    var comp2 =req.body.comp2
    var comp3 =req.body.comp3
    var comp4 =req.body.comp4
    var comp5 =req.body.comp5
    var tabcomp=[comp1,comp2,comp3,comp4,comp5]

    var ndmi1=req.body.ndmi1
    var ndmi2=req.body.ndmi2
    var ndmi3=req.body.ndmi3
    var ndmi4=req.body.ndmi4
    var ndmi5=req.body.ndmi5
    var tabndmi=[ndmi1,ndmi2,ndmi3,ndmi4,ndmi5]

    var tdd1=req.body.tdd1
    var tdd2=req.body.tdd2
    var tdd3=req.body.tdd3
    var tdd4=req.body.tdd4
    var tdd5=req.body.tdd5
    var tabtdd=[tdd1,tdd2,tdd3,tdd4,tdd5]

    var pc1= req.body.pc1
    var pc2= req.body.pc2
    var pc3= req.body.pc3
    var pc4= req.body.pc4
    var pc5= req.body.pc5
    var tabpc=[pc1, pc2, pc3, pc4, pc5]

    var c1 = req.body.c1
    var c2 = req.body.c2
    var c3 = req.body.c3
    var c4 = req.body.c4
    var c5 = req.body.c5
    var tabc=[c1,c2,c3,c4,c5]

    var eg1 = req.body.eg1;
    var eg2= req.body.eg2
    var eg3= req.body.eg3
    var eg4= req.body.eg4
    var eg5= req.body.eg5
    var tabeg=[eg1,eg2,eg3,eg4,eg5]

    var rr1= req.body.rr1
    var rr2= req.body.rr2
    var rr3= req.body.rr3
    var rr4= req.body.rr4
    var rr5= req.body.rr5
    var tabrr=[rr1,rr2,rr3,rr4,rr5]

    var ba1= req.body.ba1
    var ba2= req.body.ba2
    var ba3= req.body.ba3
    var ba4= req.body.ba4
    var ba5= req.body.ba5
    var tabba=[ba1,ba2,ba3,ba4,ba5]

    var cn1=req.body.cn1
    var cn2=req.body.cn2
    var cn3=req.body.cn3
    var cn4=req.body.cn4
    var cn5=req.body.cn5
    var tabcn=[cn1,cn2,cn3,cn4,cn5]

    var cm1=req.body.cm1
    var cm2=req.body.cm2
    var cm3=req.body.cm3
    var cm4=req.body.cm4
    var cm5=req.body.cm5
    var tabcm=[cm1,cm2,cm3,cm4,cm5]




    if(!a){
        a=0;
    }
    console.log(a)
    let demande ="MATCH (n)-[r:LIEN]-(m) WHERE id(n)=$idParam\n" ;
    let collectnoeud = "WITH [n,m"
    let collectrel = ",[r"
    let p ="pont"
    let b ="arrivee"
    let nonvide = 0
    compteur =0
    //LIEN
    for(let a =0; a<5; a++){
        if(!tablien[a]){}
        else{ nonvide=1;
        compteur =compteur +1}
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tablien[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "r.cout =" + parseInt(tablien[i], 10) + " "
                    break
                } else {
                    demande = demande + "r.cout =" + parseInt(tablien[i], 10) + " OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //COMPLEXITE
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabcomp[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabcomp[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z1 =\"" + tabcomp[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z1 =\"" + tabcomp[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //NDMI
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabndmi[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabndmi[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z2 =\"" + tabndmi[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z2 =\"" + tabndmi[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //TDD
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabtdd[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabtdd[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z3 =\"" + tabtdd[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z3 =\"" + tabtdd[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //PC
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabpc[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabpc[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z4=\"" + tabpc[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z4 =\"" + tabpc[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //Cout
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabc[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabc[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z5 =\"" + tabc[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z5 =\"" + tabc[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //EG
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabeg[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabeg[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z6 =\"" + tabeg[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z6 =\"" + tabeg[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //RR
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabrr[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabrr[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z7 =\"" + tabrr[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z7 =\"" + tabrr[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //BA
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabba[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabba[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z8 =\"" + tabba[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z8 =\"" + tabba[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //CN
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabcn[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabcn[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z9 =\"" + tabcn[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z9 =\"" + tabcn[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }
    //CM
    compteur=0
    nonvide =0
    for(let a =0; a<5; a++) {
        if (!tabcm[a]) {
        } else {
            nonvide = 1;
            compteur = compteur + 1
        }
    }
    if(nonvide==1) {
        demande = demande + " AND ("
        for (let i = 0; i < 5; i++) {
            if (!tabcm[i]) {
            } else {
                if (compteur==1) {
                    demande = demande + "m.z10 =\"" + tabcm[i] + "\" "
                    break
                } else {
                    demande = demande + "m.z10 =\"" + tabcm[i] + "\" OR "

                }
                compteur =compteur -1
            }
        }

        demande = demande + ")"

    }




    console.log(demande)
    for(let i=1; i<a; i++){
        demande=demande + " OPTIONAL MATCH (n)";
        for(let j=1; j<=i; j++){
            if(j==1){
                demande =demande + "-"
            }

                demande = demande + "[]-()-"

        }
        demande = demande + "[y"+i+":LIEN]-(z"+i+") WHERE id(n)=$idParam\n";
        collectnoeud = collectnoeud + ",z"+i;
        collectrel = collectrel +",y"+i;

    }
    collect=collectnoeud+"] AS tabnoeud" + collectrel +"] AS tabrel"
    let resultat = demande + collect +"\n UNWIND tabnoeud as noeud UNWIND tabrel as rel\n WITH collect( DISTINCT rel) as relation, collect(DISTINCT noeud) as node\nCALL apoc.export.csv.data(node, relation, \"all.csv\", {})" +
        "\nYIELD file, source, format, nodes, relationships, properties, time, rows, batchSize, batches, done, data\n" +
        "RETURN file, source, format, nodes, relationships, properties, time, rows, batchSize, batches, done, data"


    session
        .run(resultat, {idParam:parseInt(noeud,10)})
        .then(function(){
            refresh_json(function(){
                res.redirect('/')
            })
            })
        .catch(function(err){
            console.log(err)
        })
    })



app.post('/import/enjeux', upload.single("Chosir un fichier"), function(req, res) {
    var file = req.file;
    lien = file.path;
    enc=file.encoding;
    console.log(enc);
    let result= "";

    fs.readFile(lien, 'latin1', function (err, data) {
        var dataArray = data.split(/\r?\n/);

        let n = "noeud"
        for (let i = 1; i < dataArray.length - 1; i++) {
            donnee = dataArray[i].split(";");
            let res= donnee[2].replace(/,/gi, ' ');





            result = result + "MERGE(" + n +i +":ENJEU {identifiant : " + donnee[1] +
                " ,nom : \"" +res + "\"" +
                ",attachement:\"\", " +
                "comment:\"\", " +
                "moins:\"\", " +
                "plus:\"\", " +
                "pourquoi:\"\", " +
                "proposeur:\"\", " +
                "qui:\"\", " +
                "quoi:\"\", " +
                "quand:\"\", " +
                "remarques:\"\"," +
                "z1:\"\", " +
                "z2:\"\", " +
                "z3:\"\", " +
                "z4:\"\", " +
                "z5:\"\", " +
                "z6:\"\", " +
                "z7:\"\", " +
                "z8:\"\", " +
                "z9:\"\", " +
                "z10:\"\" " +
                "}) \n"


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

    fs.readFile(lien, 'latin1', function (err, data) {
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

        fs.readFile(lien, 'latin1', function (err, data) {
            var dataArray = data.split(/\r/);
            let e = "enjeu"
            let n = "noeud"
            let r = "relation";
            let type = "";
            let stake="";

            for (let i = 1; i < dataArray.length - 1; i++) {
                let tab =[]
                donnee = dataArray[i].split(";");


                for(let j=0; j<donnee.length;j++){
                    let a =donnee[j].replace(/"/gi, '');
                    a=a.replace(/\n/gi, ' ');
                    a=a.replace(/,/gi, ' ');
                    a=a.replace(/'/gi, '\'');
                    tab.push(a)
                }

                temp_session = driver.session();
               result = "MATCH (enjeu1:ENJEU),(enjeu2:ENJEU),(enjeu3:ENJEU),(enjeu4:ENJEU),(enjeu5:ENJEU),(enjeu6:ENJEU),(enjeu7:ENJEU),(enjeu8:ENJEU),(enjeu9:ENJEU),(enjeu10:ENJEU)\n" +
                    "WHERE enjeu1.identifiant=1 AND enjeu2.identifiant=2 AND enjeu3.identifiant=3 AND enjeu4.identifiant=4 AND enjeu5.identifiant=5 AND enjeu6.identifiant=6 AND enjeu7.identifiant=7" +
                    " AND enjeu8.identifiant=8 AND enjeu9.identifiant=9 AND enjeu10.identifiant = 10\n";
                switch (tab[1]) {
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
                result = result +"MERGE(noeud:" + type + "{nom:\""+tab[3]+"\", quoi:\""+tab[4]+"\", attachement:\""+tab[5]+"\", pourquoi:\""+tab[6]+"\", plus:\""+tab[36]+"\"" +
                    ", moins:\""+tab[37]+"\", qui:\""+tab[38]+"\", comment:\""+tab[39]+"\",quand:\""+tab[40]+"\", proposeur:\""+tab[52]+ " " + tab[53]+
                    ": "+tab[54]+"(" + tab[55] + ")"+"\", remarques:\""+tab[56]+"\", z1:\""+tab[41]+"\", z2:\""+tab[42]+"\", z3:\""+tab[43]+"\", z4:\""+tab[44]+"\", z5:\""+tab[45]+"\"" +
                    ", z6:\""+tab[46]+"\", z7:\""+tab[47]+"\", z8:\""+tab[48]+"\", z9:\""+tab[49]+"\", z10:\""+tab[50]+"\"})";

                if(tab[7]=="Oui"){
                    for(let k =9; k<=17; k++){
                        if(tab[k]==='') {}
                        else{
                            result = result + "CREATE(" + n + ")-[" + r + (k - 8) + ":LIEN {cout:" + tab[k] + "}]->(" + e + (k - 8) + ")\n";
                            result = result + "SET " + r + (k - 8) + ".identifiant= id(" + r + (k - 8) + ")\n"}

                    }
                }
                else{
                    stake="";
                    let resultat =tab[2].substr(0, 2)
                    switch(resultat){
                        case 'Ar':
                            stake = 1;
                            break;
                        case 'Os':
                            stake = 6;
                            break;
                        case 'Pr':
                            stake = 2;
                            break;
                        case 'Af':
                            stake = 8;
                            break;
                        case 'No':
                            stake = 10;
                            break;
                        case 'Me':
                            stake = 9;
                            break;
                        case 'Ré':
                            stake =3;
                            break;
                        case 'In':
                            stake = 5;
                            break;
                        case 'Fo':
                            stake = 4;
                            break;
                        case 'Pa':
                            stake = 7;
                            break;



                    }
                    result = result + "CREATE("+n+")-[" + r+ ":LIEN {cout:4}]->("+ e+ stake + ")\n";
                    result = result + "SET " + r  + ".identifiant= id(" + r + ")\n"



                }
                temp_session
                    .run(result)
                    .catch(function (err) {
                        console.log(err)
                    });


                }







        })
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

    app.listen(8080);
    console.log("Serveur démarré sur le port 8080!");


