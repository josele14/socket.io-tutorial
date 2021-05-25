const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
    const sessionID = socket.id;
    console.log(`New user ${sessionID} connected`);
    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
    socket.on("chat message", msg => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});

http.listen(port, ()=> {
    console.log(`Listening on ${port}`);
});