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

//
//
/////////// GROUP //////////////
// Endpoint to create group

app.get("/get-groups", (req, res) => {
  res.json(groupsData);
});

app.post("/create-group", (req, res) => {
  const newGroup = req.body;

  // Check if the group name is already taken
  const isNameTaken = groupsData.some((group) => group.name === newGroup.name);

  if (isNameTaken) {
    res
      .status(400)
      .json({ success: false, message: "Group name is already taken" });
  } else {
    // Add the new group to the data
    groupsData.push(newGroup);

    // Save the updated data to the file
    fs.writeFileSync("./data/groups.json", JSON.stringify(groupsData, null, 2));

    res.json({ success: true, group: newGroup });
  }
});

// Endpoint to add member to group
app.post("/add-members/:groupId", (req, res) => {
  const groupId = req.params.groupId;
  const newMembers = req.body.members;

  // Find the group by ID
  const group = groupsData.find((group) => group.id === groupId);

  if (!group) {
    res.status(404).json({ success: false, message: "Group not found" });
    return;
  }

  // Filter out members that are already in the group
  const uniqueNewMembers = newMembers.filter(
    (member) => !group.members.includes(member)
  );

  if (uniqueNewMembers.length === 0) {
    res.json({ success: true, message: "No new members to add" });
    return;
  }

  // Add new members to the group
  group.members.push(...uniqueNewMembers);

  // Save the updated data to the file (assuming groupsData is an array of groups)
  fs.writeFileSync("./data/groups.json", JSON.stringify(groupsData, null, 2));

  res.json({ success: true, group });
});

//
///
//////// USER ////////////
// Endpoint to create a new user

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

  console.log(newUser);
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
