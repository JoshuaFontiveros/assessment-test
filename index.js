const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8000;
const lookUp = require("mime-types").lookup;

const server = http.createServer((req, res) => {
  let serverURL = url.parse(req.url, true);

  let path = serverURL.path.replace(/^\/+|\/+$/g, "");
  if (path == "") {
    path = "index.html";
  }
  let file = `${__dirname}/${path}`;
  console.log(file);
  fs.readFile(file, (err, data) => {
    if (!err) {
      // No error
      let mimeType = lookUp();
      res.writeHead(200, { "Content-Type": mimeType });
      return res.end(data);
    } else {
      // With error
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("File Not found!");
    }
  });
});

server.listen(8000, () => {
  console.log(`Server running on port ${port}`);
});
