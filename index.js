const express = require("express");
const cors = require("cors");
const movie = require("./routes/movie");
const user = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

if (!config.get("jwtPrivateKey")){
   console.log("FETAL:ERROR: jwt private key is not set!")
   process.exit(1);
}

const corsOptions = {
  exposedHeaders: ["Authorization", "x-auth-token"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/movie", movie);
app.use("/api/user", user);
app.use("/api/auth", auth);

mongoose
  .connect("mongodb://localhost/auth-project")
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((e) => {
    console.log("Error", e);
  });

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
