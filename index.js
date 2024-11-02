const express = require("express");

const { users } = require("./Data/users.json");

const app = express();

const port = 8081;

app.use(express.json());

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameter : None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route : /users/:id
 * Method : GET
 * Description : Get single user by their ID
 * Access : Public
 * Parameter : ID(user)
 */

//htpps://localhost:8081/users/id -> this url is always an request.

app.get("/users/:id", (req, res) => {
  const { id } = req.params; //req.params = { id: "123" };
  // const id = req.params.id; another approac
  console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * Route : /users/
 * Method : POST
 * Description : Creating a new user
 * Access : Public
 * Parameter : None
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    res.status(404).json({
      success: false,
      message: "Users with the IdD already exists!",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(201).json({
    success: true,
    message: "User is added.",
    data: users,
  });
});

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating user by id
 * Access : Public
 * Parameter : id
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  //console.log(req.params);
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User updated succesfully",
    data: updateUserData,
  });
});

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : Delete user by id
 * Access : Public
 * Parameter : id
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
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
