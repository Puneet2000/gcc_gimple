var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app);
var bodyParser= require('body-parser');
var fs,fs1= require('fs');

var path = require('path');
var cmd = require('node-cmd');

const execSync = require('child_process').execSync;

app.use(bodyParser.urlencoded({ extended: true }));
 app.get('/',function(req,res){
    res.sendFile('/home/crazy-man-gla/editor.html');
 
  ;});

app.post('/res', function(req, res){
var code=req.body.code;
var lang= req.body.lang;
var input = req.body.input;
switch(lang)
{
    case "C++" : 
       
       require('fs').writeFileSync(__dirname+"/code.cpp",code);
        require('fs').writeFileSync(__dirname+"/input.txt",input);
        execSync("g++ code.cpp -o code.exe &> err.txt");
        var error= require('fs').readFileSync(__dirname+"/error.txt",'utf-8');
        require('fs').writeFileSync(__dirname+"/error.txt","");
        if(error=="")
        {
        execSync("./code.exe < input.txt > output.txt");
           var output = require('fs').readFileSync(__dirname+"/output.txt",'utf-8');
         res.send(output);
         }
         else
         {
         	res.send(error);
         }           
    break;
    case "C":
       require('fs').writeFileSync(__dirname+"/code.c",code);
        require('fs').writeFileSync(__dirname+"/input.txt",input);
        execSync("gcc code.c -o code.exe &> err.txt");
        var error= require('fs').readFileSync(__dirname+"/error.txt",'utf-8');
        require('fs').writeFileSync(__dirname+"/error.txt","");
        if(error=="")
        {
        execSync("./code.exe < input.txt > output.txt");
           var output = require('fs').readFileSync(__dirname+"/output.txt",'utf-8');
         res.send(output);
         }
         else
         {
         	res.send(error);
         }            
       
    break;
    case "Python 2":
      require('fs').writeFileSync(__dirname+"/codec.py",code);
        require('fs').writeFileSync(__dirname+"/input.txt",input);
        execSync("python codec.py &> err.txt < input.txt > output.txt");
        
        
           var error= require('fs').readFileSync(__dirname+"/error.txt",'utf-8');
        require('fs').writeFileSync(__dirname+"/error.txt","");
        if(error=="")
        {
        
           var output = require('fs').readFileSync(__dirname+"/output.txt",'utf-8');
         res.send(output);
         }
         else
         {
         	res.send(error);
         }          
       
   
    break;
    case "Python 3":
        require('fs').writeFileSync(__dirname+"/codec.py",code);
        require('fs').writeFileSync(__dirname+"/input.txt",input);
        execSync("python3 codec.py < input.txt > outputp.txt");
        
        
           var error= require('fs').readFileSync(__dirname+"/error.txt",'utf-8');
        require('fs').writeFileSync(__dirname+"/error.txt","");

        if(error=="")
        {
        
           var output = require('fs').readFileSync(__dirname+"/outputp.txt",'utf-8');
         res.send(output);
         }
         else
         {
         	res.send(error);
         }      
    break;
}
 });
server.listen(8000,'127.0.0.1',function(){

 })