const express = require("express");
const user = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/user", user);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
