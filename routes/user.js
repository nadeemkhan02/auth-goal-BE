const express = require("express");
const dummyUserData = require("../utils/dummyUsers");


const router = express.Router();

router.get("/getUserList", (reqm, res)=>{
   res.send(dummyUserData);
});




module.exports = router;
