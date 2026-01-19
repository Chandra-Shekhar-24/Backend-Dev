const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let responseMessage;

    switch (req.url) {
        case "/":
            responseMessage = "This is Home Page";
            break;
        case "/about":
            responseMessage = "This is About Page";
            break;
        case "/contact":
            responseMessage = "This is Contact Page";
            break;
        default:
            responseMessage = "404 Page Not Found";
            break;
    }

    const logEntry = `${new Date().toISOString()} | ${req.url} | ${responseMessage}\n`;

    fs.appendFile("log.txt", logEntry, (err) => {
        if (err) {
            console.error("Error writing log");
        }
    });

    res.end(responseMessage);
});

server.listen(8000, () => {
    console.log("Server is running on port 8000");
});
