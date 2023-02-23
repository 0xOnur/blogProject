import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    res.status(401).json({ message: "Token is not valid" });
                }else {
                    next();
                }
            });
        }else {
            res.status(401).json({ message: "No token, authorization denied" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
}
        

export default authMiddleware;
