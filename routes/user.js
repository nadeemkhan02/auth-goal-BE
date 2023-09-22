const express = require("express");
const dummyUserData = require("../utils/dummyUsers");

const router = express.Router();

router.get("/getUserList/:id?", (req, res) => {
  const id = req.params.id;
  if (id) {
    const user = dummyUserData.find((item) => item?.id === parseInt(id));
    if (user) return res.send(user);
    return res.status(404).send("User not found!");
  } else {
    res.send(dummyUserData);
  }
});

router.post("/addUser", (req, res) => {
  const userData = req.body;
  if (userData?.name && userData?.age && userData?.city) {
    const newUserData = {
      id: dummyUserData.length + 1,
      ...userData,
    };
    dummyUserData.push(newUserData);
    res.status(201).send(dummyUserData);
  } else {
    res.status(400).send("Bad request, please provide valid user data!");
  }
});

router.put("/updateUser/:id", (req, res) => {
  //check and find the user which is to be updated
  const id = req.params.id;
  if (id) {
    const user = dummyUserData.find((item) => item?.id === parseInt(id));
    if (user) {
      //is updated that user with updated data from body
      const userData = req.body;
      if (userData?.name && userData?.age && userData?.city) {
        user.name = userData.name;
        user.age = userData.age;
        user.city = userData.city;
        res.status(201).send(user);
      } else {
        res.status(400).send("Bad request, please provide valid user data!");
      }
    } else {
      return res.status(404).send("User not found!");
    }
  } else res.status(400).send("provide valid user id!");
});

router.delete("/deleteUser/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (!Number.isNaN(id)) {
    const index = dummyUserData.findIndex((user) => user?.id === id);

    if (index !== -1) {
      const deletedUser = dummyUserData[index];
      dummyUserData.splice(index, 1);
      res.status(200).send(deletedUser);
    } else {
      res.status(404).send("User not found!");
    }
  } else {
    res.status(400).send("Provide a valid user id!");
  }
});

module.exports = router;
