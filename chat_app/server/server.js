const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// Load initial data
let groupsData = JSON.parse(fs.readFileSync("./data/groups.json"));
let usersData = JSON.parse(fs.readFileSync("./data/users.json"));

app.get("/users", (req, res) => {
  res.json(usersData);
});

// Endpoint to login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = usersData.find(
    (u) => u.username === username && u.password === password
  );

  res.json(user || null);
});

// Endpoint to create a new user
app.post("/create-user", (req, res) => {
  const newUser = req.body;

  // Check if the username is already taken
  const isUsernameTaken = usersData.some(
    (user) => user.username === newUser.username
  );

  if (isUsernameTaken) {
    res
      .status(400)
      .json({ success: false, message: "Username is already taken" });
  } else {
    // Add the new user to the data
    usersData.push(newUser);

    // Save the updated data to the file
    fs.writeFileSync("./data/users.json", JSON.stringify(usersData, null, 2));

    res.json({ success: true, user: newUser });
  }
});

app.delete("/delete-user/:username", (req, res) => {
  const { username } = req.params;

  const userIndex = usersData.findIndex((user) => user.username === username);

  if (userIndex !== -1) {
    usersData.splice(userIndex, 1);

    fs.writeFileSync("./data/users.json", JSON.stringify(usersData, null, 2));

    res.json({ success: true, message: "User deleted successfully" });
  } else {
    res.json({ success: false, message: "User not found" });
  }
});

// Endpoint to get all users
app.get("/get-users", (req, res) => {
  const usersData = JSON.parse(fs.readFileSync("./data/users.json"));
  res.json(usersData);
});

app.get("/get-user/:username", (req, res) => {
  const { username } = req.params;
  const user = usersData.find((user) => user.username === username);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
