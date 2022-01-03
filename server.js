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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = 8080;
const storagePath = "./server/storage.json";
let lunchGroup = [];
let votes = {};
const fakeGroup = [
  {
    name: faker.name.firstName(),
    passengers: "0",
    proposedPlace: faker.random.word(),
    returnTime: "0",
    votes: 0,
  },
  {
    name: faker.name.firstName(),
    passengers: "2",
    proposedPlace: `${faker.random.word()} shack`,
    returnTime: "0",
    votes: 0,
  },
  {
    name: faker.name.firstName(),
    passengers: "3",
    proposedPlace: `${faker.name.lastName()}'s ${faker.random.word()}`,
    returnTime: "2",
    votes: 0,
  },
  {
    name: faker.name.firstName(),
    passengers: "0",
    proposedPlace: `${faker.name.lastName()}'s ${faker.random.word()} house`,
    returnTime: "4",
    votes: 0,
  },
  {
    name: faker.name.firstName(),
    passengers: "0",
    proposedPlace: faker.random.word(),
    returnTime: "0",
    votes: 0,
  },
];

const initVars = () => {
  lunchGroup = [];
  votes = {};
};

io.on("connection", (socket) => {
  const useMock = socket.request.headers.referer.startsWith("http://localhost");
  if (useMock) lunchGroup = fakeGroup;

  socket.on("getLunch", (lunch) => {
    const update = lunchGroup.findIndex(
      (lunchGroup) => lunchGroup.name === lunch.name
    );
    if (update !== -1) {
      lunchGroup[update] = lunch;
    } else {
      lunchGroup.push({ ...lunch, votes: 0 });
    }
    io.emit("lunchRes", lunchGroup);
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

  socket.on("vote", (vote) => {
    votes[vote.name] = vote.vote;
    const voteTally = {};
    for (const vote in votes) {
      if (voteTally[votes[vote]] === undefined) {
        voteTally[votes[vote]] = 1;
      } else {
        voteTally[votes[vote]]++;
      }
    }
    lunchGroup.forEach((lunch) => {
      lunch.votes =
        voteTally[lunch.proposedPlace] !== undefined
          ? voteTally[lunch.proposedPlace]
          : 0;
    });
    io.emit("lunchRes", lunchGroup);
  });

  socket.on("disconnect", (socket) => {
    console.log("Client disconnected");
    const everyoneLeft = io.sockets.adapter.rooms.size === 0;
    if (everyoneLeft) {
      initVars();
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${PORT}`);
});
