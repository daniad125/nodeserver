//<script type="module">
"use strict";
var http=require('http');
var fs=require('fs');
let port=31313;
let docsFile;
//to use another path to get a directory with html files you should write a path after filename of nodefile in a command line 
//example: node qrnode.js /home/username/proj1/docs
let configFile=require('./nodeconf.js');
console.log(require('path').normalize(__dirname+'/../docs'));
if (process.argv[2]) {
 docsFile=process.argv[2];
 console.log(process.argv[2])}
else {
 docsFile=__dirname+'/../docs'
};
function getPath(link) {
 let linkname=configFile.links.find(el=>el.name==link);
 return linkname.path
};
function getContent(link) {
 let linkname=configFile.links.find(el=>el.name==link);
 return linkname.content
};
function getCode(link) {
 let linkname=configFile.links.find(el=>el.name==link);
 return linkname.rescode
};
function serve3File(res,file1,file2,file3,contentType,responseCode) {
 let data_chunk = [ null, null, null];
 let data_errs = [ null, null, null];
 let data_filename = [ file1, file2, file3];
 let data_ok = [ false, false, false];
 if (!responseCode) responseCode=200;
 // readed chunk processing function
 let read_chunk_file = function(chunk_num,err,data)
   {
     data_chunk[chunk_num] = data;
     data_errs[chunk_num] = err;
     data_ok[chunk_num] = true;
     if (err) {
       console.log('No '+data_filename[chunk_num]+'This is the error1')
     }
     else{
       console.log('this is '+data_filename[chunk_num])
     }
     //lock(res) - i do not know how to, RTFM needed
     if(data_ok[0] && data_ok[1] && data_ok[2])
     {
      if(data_errs[0] || data_errs[1] || data_errs[2])
      {
       //do error page
       res.writeHead(500, {'Content-Type':'text/plain'});
       res.end('500-Internal Error');
      }
      else
      {
        res.writeHead(responseCode,{'Content-Type':contentType});
        res.write(data_chunk[0]);
        res.write(data_chunk[1]);
        res.end(data_chunk[2]);
      }
     }
   }
 fs.readFile(docsFile+file1, (err,data) => read_chunk_file(0,err,data));

 fs.readFile(docsFile+file2, (err,data) => read_chunk_file(1,err,data));
 fs.readFile(docsFile+file3, (err,data) => read_chunk_file(2,err,data));
};

function serveStaticFile(res,file1,contentType,responseCode) {
 if (!responseCode) responseCode=200;
 fs.readFile(docsFile+file1, function(err,data) {
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
let big="";
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
  console.log(big)
 }});
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
 })//}});
};

//merge3files('/../docs/header.ihtml','/../docs/main.ihtml','/../docs/footer.ihtml'); 
http.createServer(function(req,res){
//try{
 var path=req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
if (path==''||path=='index.html'||path=='main.ihtml'||path=='main.html') {
 path='/main'
};
 switch(path) {
/*  case '':
  case 'index.html':
  case 'main.html':
  case 'main.ihtml':
//          console.log(parser);  
//          merge3files(res,'/../docs/header.ihtml','/../docs/main.ihtml','/../docs/footer.ihtml','text/html',); 
          serve3File(res,getPath('header'),getPath('main'),getPath('footer'),'text/html',200);
          break;
*/
  case '/members':
  case '/gen':
  case '/ranges':
  case '/sitemap':
  case '/help':
  case '/members/become':
  case '/main':
//  case '/help/whiterabbit':
//   try {
          serve3File(res,getPath('header'),getPath(path.slice(1)),getPath('footer'),getContent(path.slice(1)),getCode(path.slice(1)));
//  }
//  catch {console.log('this is error. The end HAHA!!')};
          break;
  case '/img/qr.gif':
  case '/css/style.css':
//  case '/default':
	  //throw "Hello Error!";
          serveStaticFile(res,getPath(path.slice(1)),getContent(path.slice(1)),getCode(path.slice(1)));
          break;
  default:
         serveStaticFile(res,getPath('default'),getContent('default'),getCode('default'));
         break;
 }
}).listen(port);
//
// this is solution to not crash node if IO exception
//
process.on('uncaughtException',err=>{
  console.log(err);
  console.log('This is very bad to use uncaught exception. That is what manual said!!!');
});
//setTimeout(function(){console.log("Ok");},1000);
console.log('Сервер запущен на localhost:'+port+'; нажмите CTRL+C для завершения...')
//</script>
