const express = require("express");

const { users } = require("./Data/users.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("/", (req, res) => {
  //  res.status(200).send("Server is up");
  //  res.status(200).send("Server is up", "hey");
  res.status(200).json({
    message: "Server is up and running",
    data: "Hey",
  });
});

app.get("*", (req, res) => {
  res.status(200).json({
    message: "This route doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Node starts running on http://localhost:${port}`);
});
