
var http=require('http');
var fs=require('fs');
let port=31313;
let big="";
function serveStaticFile(res,path,contentType,responseCode) {
 if (!responseCode) responseCode=200;
 fs.readFile(__dirname+path, function(err,data) {
  if (err) {
   res.writeHead(500, {'Content-Type':'text/plain'});
   res.end('500-Internal Error');
  }
  else {
   res.writeHead(responseCode,{'Content-Type':contentType});
   res.end(data);
  }
 });
};
function merge3files(file1,file2,file3) {
 import mergeFiles from 'merge-files';
 const outPath=__dirname+'/toview.html';
 const inputPathList=[__dirname+file1,__dirname+file2,__dirname+file3];
 const status=await mergeFiles(inputPathList,outputPath)
};

//merge3files('/../docs/header.ihtml','/../docs/main.ihtml','/../docs/footer.ihtml'); 
http.createServer(function(req,res){
 var path=req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
 switch(path) {
  case '':
  case 'index.html':
  case 'main.html':
  case 'main.ihtml':
//          console.log(parser);  
          merge3files('/../docs/header.ihtml','/../docs/main.ihtml','/../docs/footer.ihtml'); 
          serveStaticFile(res,'/toview.html','text/html');
          break;
  case '/members':
          merge3files('/../docs/header.ihtml','/../docs/members/index.shtml','/../docs/footer.ihtml'); 
          serveStaticFile(res,'/toview.html','text/html');
          break;
 // case 'img
  case '/css/style.css':
          serveStaticFile(res,'/../docs/css/style.css','text/css',200);
          break;
  default:
          serveStaticFile(res,'/public/404.html','text/html',404);
          break;
 }
}).listen(port);
console.log('Сервер запущен на localhost:'+port+'; нажмите CTRL+C для завершения...')

