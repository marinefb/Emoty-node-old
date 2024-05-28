/*
    Serveur HTTP qui écoute sur le port 8765
    - Si l'url est '/', le serveur renvoie le fichier index.html
    - Si l'url est '/emotions', le serveur récupére les émotions passées en paramètres et pilote les leds en fonction

    Lancement du serveur: 

    $ node server.js 
    ou mieux: 
    $ nodemon server.js
    
    Test du serveur:
    - http://127.0.0.1:8765
    - http://127.0.0.1:8765/emotions?sad=0&happy=100
    
*/

var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');

http.listen(8765); //listen to port 8765

function handler(req, res) { //create server
    //console.log("ma première requête est arrivée");
    console.log(req.url);

    // split query string. Ex: /?sad=0&happy=100
    var url_parts = url.parse(req.url, true);
    console.log("url_parts: ", url_parts);

    switch (url_parts.pathname) {
        case '/':
            fs.readFile(__dirname + '/public/index.html', function (err, data) { //read file index.html in public folder
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //display 404 on error
                    return res.end("404 Not Found");
                }
                res.writeHead(200, { 'Content-Type': 'text/html' }); //write HTML
                res.write(data); //write data from index.html
                return res.end();
            });

            break;

        case '/emotions':

            var query = url_parts.query;
            console.log("sad: ", query.sad);
            console.log("happy: ", query.happy);

            // display sad and happy values
            res.writeHead(200, { 'Content-Type': 'text/html' }); //write HTML
            res.write("sad: " + query.sad + "<br>");
            res.write("happy: " + query.happy + "<br>");

            res.write("Hello Marine, tout va bien. Les leds sont éteintes"); //write data from index.html
            return res.end();

            break;

        default:
            break;
    }



    // ERREUR
    // res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
    // return res.end("404 Not Found");

} 