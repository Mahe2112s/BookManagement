const express = require("express");

const router = express.Router();

const { users } = require("../Data/users.json");
/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameter : None
 */

// ("/users") since it is a route we are not using "/users", "/" would be enough.

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const { id } = req.params; //req.params = { id: "123" };
  // const id = req.params.id; another routerroac
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: "User Deletd Succesfully",
    data: users,
  });
});

module.exports = router;
