var app = require("express")();
const express = require("express");
const server = require("http").createServer(app);
const storage = require("./server/storage.json");
const fs = require("fs");
const faker = require("faker");
console.log(__dirname);
app.use(express.static(__dirname + "/build"));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
const PORT = 8080;
const storagePath = "./server/storage.json";
const fakeGroup = [
  {
    name: faker.name.firstName(),
    passengers: "0",
    proposedPlace: faker.random.word(),
    returnTime: "0",
  },
  {
    name: faker.name.firstName(),
    passengers: "2",
    proposedPlace: `${faker.random.word()} shack`,
    returnTime: "0",
  },
  {
    name: faker.name.firstName(),
    passengers: "3",
    proposedPlace: `${faker.name.lastName()}'s ${faker.random.word()}`,
    returnTime: "100",
  },
  {
    name: faker.name.firstName(),
    passengers: "0",
    proposedPlace: `${faker.name.lastName()}'s ${faker.random.word()} house`,
    returnTime: "1230",
  },
  {
    name: faker.name.firstName(),
    passengers: "0",
    proposedPlace: faker.random.word(),
    returnTime: "0",
  },
];

io.on("connection", (socket) => {
  socket.on("getLunch", (lunch) => {
    console.log(lunch, fakeGroup);
    fakeGroup.push(lunch);
    io.emit("lunchRes", fakeGroup);
  });

  socket.on("write", () => {
    storage.table.push({ "Id ": 400, "square ": 256 });
    fs.writeFile(storagePath, JSON.stringify(storage), (err) => {
      if (err) throw err;
    });
  });

  socket.on("sendMessage", (message) => {
    io.emit("newMessage", message);
  });

  socket.on("disconnect", (socket) => {
    console.log("Client disconnected", socket);
  });
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${PORT}`);
});
