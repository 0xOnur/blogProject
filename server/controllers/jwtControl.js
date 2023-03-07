import jwt from "jsonwebtoken";
const refreshTokens = {};
console.log("refreshTokens: ", refreshTokens);

export const generateToken = (userId) => {
    try {
        const accessToken = jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_LIFE})
        const refreshToken = jwt.sign(userId, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE})
        const response = {
            "status": "Logged in",
            "accessToken": accessToken,
            "refreshToken": refreshToken,
        }
        refreshTokens[refreshToken] = response;;

        console.log(refreshTokens);
        return (
            {
                accessToken: accessToken,
                refreshToken: refreshToken 
            }
        )
    } catch (error) {
        console.log(error.message);
    }
}

export const updateToken = (refreshToken) => {
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    if (refreshToken && refreshToken in refreshTokens) {

      const decoded = jwt.decode(refreshToken);
      const userId = decoded._id;
      const accessToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_LIFE,
      });
      const response = {
        status: "Logged in",
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      refreshTokens[refreshToken] = response;
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }else {
        return "Refresh token is not valid";
    }
  } catch (error) {
    return error.message;
  }
};
  
