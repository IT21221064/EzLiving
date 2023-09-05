const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongooose = require("mongoose");
const auth = require("../middleware/requireUserAuth");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//get all the  users
const getUsers = async (req, res) => {
  const user = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(user);
};

//get a user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongooose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error: "No such staff" });
  }

  res.status(200).json(user);
};

//create a new user
const creatingUser = async (req, res) => {
  const { name, NIC, email, username, pw, type } = req.body;

  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!NIC) {
    emptyFields.push("NIC");
  }

  if (!email) {
    emptyFields.push("email");
  }
  if (!username) {
    emptyFields.push("username");
  }
  if (!pw) {
    emptyFields.push("pw");
  }
  if (!type) {
    emptyFields.push("type");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  try {
    //const user_id = req.admin._id

    const user = await User.creatingUser(name, NIC, email, username, pw, type);

    //create token
    const token = createToken(user._id);
    const userid = user._id;
    const uname = user.username;

    console.log(user);
    res.status(200).json({ user, token, userid, uname });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongooose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

//update user

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, NIC, email, username, type } = req.body;

  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!NIC) {
    emptyFields.push("NIC");
  }

  if (!email) {
    emptyFields.push("email");
  }
  if (!username) {
    emptyFields.push("username");
  }
  if (!type) {
    emptyFields.push("type");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  if (!mongooose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  if (emptyFields.length == 0) {
    res.status(200).json(user);
  }
};

//login user
const loginUser = async (req, res) => {
  const { username, pw } = req.body;

  try {
    const user = await User.login(username, pw);
    const token = createToken(user._id);
    const userid = user._id;
    const uname = user.username;

    res.status(200).json({ username, token, userid, uname });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchProfile = async (req, res) => {
  const profile = await User.profile();

  res.status(200).json(profile);
};

module.exports = {
  getUsers,
  getUser,
  creatingUser,
  deleteUser,
  updateUser,
  loginUser,
  fetchProfile,
};
