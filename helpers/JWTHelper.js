const RefreshToken = require("../modules/login/models/RefreshToken");

const generateToken = (userId, email) => {
    return new Promise((resolve, reject) => {
        try {
            const token = generateAccessToken(userId, email)
            const refreshToken = generateRefreshToken(userId, email);
            const tokens = { token, refreshToken };
            saveRefreshToken(refreshToken, userId);
            resolve(tokens);
        } catch (err) {
            reject("unable to generate token")
        }
    })

}

const generateRefreshToken = (userId, email) => {
    const refreshToken = jwt.sign(
        { user_id: userId, email },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME
        }
    );
    return refreshToken;
}


const generateAccessToken = (userId, email) => {
    const token = jwt.sign(
        { user_id: userId, email },
        process.env.ACCESS_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME
        }
    );
    return token;
}


const saveRefreshToken = async (token, userId) => {
    try {

        var date = new Date();
        date.setDate(date.getDate() + process.env.REFRESH_TOKEN_EXPIRY_TIME.toString().split('d'));
        const dateString = date.toISOString().split('T')[0];
        const refreshTokenObj = {
            user: userId,
            token: token,
            expires: dateString
        }
        const result = await RefreshToken.create(refreshTokenObj);
        return result;
    } catch (error) {
        return error;
    }


}
module.exports = {
    generateToken
}