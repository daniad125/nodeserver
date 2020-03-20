var http=require('http');
var fs=require('fs');
let port=31313;
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
 var big="";
 fs.readFile(__dirname+file1,function(err,data) {
 if (err) {
  console.log("no "+file1)
 }
 else {
  big=big+data.toString();
//  console.log(big)
 }});
 fs.readFile(__dirname+file2,function(err,data) {
 if (err) {
  console.log("no "+file2)
 }
 else {
//  console.log(data.toString());
  big+=data.toString();
// console.log(big)
 }});
 fs.readFile(__dirname+file3,function(err,data) {
 if (err) {
  console.log("no "+file3)
 }
 else {
  big+=data.toString();
  //console.log(big)
// }});
console.log(big);
//big="durak durakovich "+"polny durak";
fs.writeFile('toview.html',big,function (err) {
 if(err) {
 console.log('no file or data');
 throw err
// break
}
else {
console.log('enjoy the biggest file')}
 })}});
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
          serveStaticFile(res,'/toview.html','text/html',200);
          break;
  case '/members':
          merge3files('/../docs/header.ihtml','/../docs/members/index.shtml','/../docs/footer.ihtml'); 
          serveStaticFile(res,'/toview.html','text/html',200);
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

