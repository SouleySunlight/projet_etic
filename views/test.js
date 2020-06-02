var fs = require('fs');
var chemin = '../Uploads/0ac666aa0a17539d9e70ebc7cea52c6f'
console.log("ééééééééééééééééééé")

fs.readFile(chemin,'latin1', function (err, data) {
    console.log(data)
})
