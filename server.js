let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs");

function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    let filepath = "";
    let fileext = "";
    if (pathname == "/") {
        filepath = path.join(__dirname, "page", "index.html");
        fileext = "";
    }
    else {
        filepath = path.join(__dirname, pathname);
        fileext = path.extname(filepath);
    }
    fs.stat(filepath, function (err, stats) {
        if (err || stats.isDirectory()) {
            console.log("Request for " + pathname + " 404.");
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404");
            response.end();
        }
        else {
            let contentType = "";
            switch (fileext) {
                case "":
                case ".html":
                    contentType = "text/html";
                    break;
                case ".css":
                    contentType = "text/css";
                    break;
                case ".js":
                    contentType = "application/javascript";
                    break;
                case ".ico":
                    contentType = "application/x-ico";
                    break;
            }
            response.writeHead(200, { "Content-Type": contentType });
            fs.createReadStream(filepath).pipe(response);
        }
    });
}

const port = 8888;
http.createServer(onRequest).listen(port);
console.log("简单服务已启动.");
var child_process = require('child_process');
child_process.exec(`\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\" http://localhost:${port}/`);

