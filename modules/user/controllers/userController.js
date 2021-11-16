const jwt = require("jsonwebtoken");
const JWTHelper = require("../../../helpers/JWTHelper");
const User = require("../../user/models/User");
const bcrypt = require('bcrypt');
const { formatResponse } = require("../../../helpers/commonHelper");

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        const userObj = prepareUserObj(req.body, encryptedPassword);
        const user = await createUser(userObj);
        user.token = await JWTHelper.generateToken(user._id, email);
        res.status(201).send(formatResponse(user));
    } catch (err) {
        console.log(err);
    }
}
const prepareUserObj = (userData, encryptedPassword) => {
    return {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email.toLowerCase(),
        password: encryptedPassword,
    }
}

const createUser = async (userObj) => {
    const user = await User.create(userObj);
    return user;
}
module.exports = {
    register
}