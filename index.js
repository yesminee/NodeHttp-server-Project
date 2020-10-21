// will use the node http module
const http = require('http');
const hostname = 'localhost'; //default
const port = 3000 ;
const fs = require('fs'); //fs=system files : to read and write on files
const path = require('path');  //to specify path to files

//setup the server
const server = http.createServer((req,res) =>{
    console.log('on va afficher les headers');
    console.log(req.headers);
    console.log('request for '+ req.url +' by method '+ req.method); //req.maethod = get ,put ,post..
    
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') 
        fileUrl = '/index.html';
        else
        fileUrl = req.url;
        
        var filePath = path.resolve ('./public'+fileUrl);
        const fileExt = path.extname(filePath) // extname = file extention
        if (fileExt == '.html'){
            fs.exists(filePath, (exists)=> {
                if(!exists) {
                    res.statusCode = 404 ;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>ERROR 404: </h1></body></html>' + fileUrl + '<html><body><h1>NOT FOUND</h1></body></html>');
                    return;
                } //else
                res.statusCode = 200;
                res.setHeader('content-type', 'text/html');
                fs.createReadStream(filePath).pipe(res); //reads file content and put it in res body
            });
            
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>ERROR 404: </h1></body></html>' + fileUrl + '<html><body><h1>NOT AN HTML FILE</h1></body></html>');
            return;
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>ERROR 404: </h1></body></html>' + req.method + '<html><body><h1> NOT SUPPORTED</h1></body></html>');
        return;
    }
});

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`); 
});