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

/**
 * Route : /users/:id
 * Method : GET
 * Description : GET subscription details by their id
 * Access : Public
 * Parameter : id
 */
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with ID doesn't exist",
    });
  }
  const returnDays = (data = "") => {
    let date;
    if (data === "") date = new Date();
    else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const SubscriptionType = (date) => {
    if (user.subscriptionType === "Basic") date = date + 90;
    else if (user.subscriptionType === "Standard") date = date + 180;
    else date = date + 365;
    return date;
  };

  //Jan 1 1970 UTC
  let returnDate = returnDays(user.returnDate);
  let currentDate = returnDays();
  let subscriptionDate = returnDays(user.subscriptionDate);
  let subscriptionExpiry = SubscriptionType(subscriptionDate);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiry <= currentDate,
    daysLeftForSubscription:
      subscriptionExpiry <= currentDate ? 0 : subscriptionExpiry - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiry < currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success : true,
    message : "Subscription details of user: ",
    data,
  })
});
module.exports = router;
