const { generateToken } = require("../../../helpers/JWTHelper");
const User = require('../../user/models/User');

const bcrypt = require('bcrypt');
const { formatResponse } = require("../../../helpers/commonHelper");

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    //   // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      const result = await generateToken(user._id, email);
      // save user token
      user.token = result.token;
      user.refresh_token = result.refreshToken;
      // user
      res.status(200).send(formatResponse(user));
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  login
}