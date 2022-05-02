var app = require("express")();
const express = require("express");
const server = require("http").createServer(app);
const storage = require("./server/storage.json");
const fs = require("fs");
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
const timeSetting = 60;
let secondsLeft = timeSetting;

const initVars = () => {
  lunchGroup = [];
  votes = {};
  secondsLeft = timeSetting;
};

io.on("connection", (socket) => {
  setInterval(() => {
    io.emit(
      "countDown",
      `${Math.floor(secondsLeft / 60)}:${
        secondsLeft - Math.floor(secondsLeft / 60) * 60
          ? secondsLeft - Math.floor(secondsLeft / 60) * 60 < 10
            ? "0" + (secondsLeft - Math.floor(secondsLeft / 60) * 60)
            : secondsLeft - Math.floor(secondsLeft / 60) * 60
          : "00"
      }`
    );
  }, 1000);
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
    if (secondsLeft === timeSetting) {
      startTimer();
    }
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
    const everyoneLeft = io.sockets.adapter.rooms.size === 0;
    if (everyoneLeft) {
      initVars();
    }
  });
});

const startTimer = () => {
  setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
    } else {
      secondsLeft = 0;
      io.emit("endVote", JSON.stringify(endTheVote()));
    }
  }, 1000);
};

const endTheVote = () => {
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

  return lunchGroup.sort((a, b) => a.votes - b.votes).reverse();
};
const tallyVotes = (newVote) => {
  if (newVote) {
    votes[newVote.name] = newVote.vote;
  }
  const voteTally = {};
  for (const vote in votes) {
    if (voteTally[votes[vote]] === undefined) {
      voteTally[votes[vote]] = 1;
    } else {
      voteTally[votes[vote]]++;
    }
  }
  return lunchGroup.forEach((lunch) => {
    lunch.votes =
      voteTally[lunch.proposedPlace] !== undefined
        ? voteTally[lunch.proposedPlace]
        : 0;
  });
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${PORT}`);
});
