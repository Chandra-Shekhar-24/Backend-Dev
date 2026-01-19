const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to the Home Page");
    } 
    else if (path === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About Page</h1>");
    } 
    else if (path === "/user") {
        const { name, age } = parsedUrl.query;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ name: name || "Unknown", age: age || "Not provided" }));
    } 
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
