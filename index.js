const express = require("express");

// const { users } = require("./Data/users.json");
// const { users } = require("./Data/books.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  //  res.status(200).send("Server is up");
  //  res.status(200).send("Server is up", "hey");
  res.status(200).json({
    message: "Server is up and running",
    data: "Hey",
  });
});

const userRoute = require("./routes/users.js");
const bookRoute = require("./routes/books.js");

app.use("/users", userRoute);
app.use("/books", bookRoute);

app.get("*", (req, res) => {
  res.status(200).json({
    message: "This route doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`Node starts running on http://localhost:${port}`);
});
