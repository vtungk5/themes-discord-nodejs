
import library from '../library/function.js';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';


export default async (req, res, next) => {
    try {

        if (!library.empty(req.cookies.access_token)) {
            const token = jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET);
            const users = await User.findOne({ username: token.username });
            if (users) {
                if (users.token == req.cookies.access_token) {
                    return res.redirect('/');
                }
            }
        }
        next();
    } catch (error) {
        next();
    }
}
