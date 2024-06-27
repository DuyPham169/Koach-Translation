const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const users = [];

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.name === username)) {
    res.status(400).json({ message: "username already exist" });
    return;
  }
  const hashedPass = await bcrypt.hash(password, saltRounds);
  users.push({ name: username, pass: hashedPass });

  console.log(users);

  res.status(200).json({ message: "Registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.name === username);
  if (!user) {
    res.status(400).json({ message: "username doesn't exist" });
    return;
  }

  const compareResult = await bcrypt.compare(password, user.pass);
  if (!compareResult) {
    res.status(400).json({ message: "incorrect password" });
    return;
  }

  const token = jwt.sign({ user }, "privatekey", { expiresIn: "1h" });
  res.status(200).json({ message: "Login successfully", token });
});

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  let token = "";

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    token = bearer[1];
  }

  jwt.verify(token, "privatekey", (err) => {
    if (err) {
      res.status(403).json({ message: "Require logging in" });
      return;
    }
    next();
  });
};

app.post("/translate", checkToken, async (req, res) => {
  const { transText } = req.body;
  res.status(200).json({ message: `Translation: ${transText}` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`);
});
