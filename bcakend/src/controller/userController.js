const { userModel } = require("../model/users");

const handleSignupPage = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.json({ err: "All Fields must required...." });

  const user = await userModel.create({
    fullname: username,
    email: email,
    password: password,
  });

  const result = user.toObject();
  delete result.password;

  return res.status(200).json(result);
};

const handleLoginPage = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ err: "All Fields must required...." });

  const user = await userModel
    .findOne({
      email: email,
      password: password,
    })
    .select("-password");

  if (!user) return res.json({ err: "Invalid Email or Password" });

  return res.status(200).json(user);
};

module.exports = {
  handleSignupPage,
  handleLoginPage,
};
