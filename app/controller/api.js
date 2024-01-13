
import library from '../library/function.js';
import User from '../model/User.js';
import jwt from 'jsonwebtoken';

exports.Check = async (req, res) => {
    var dd = await User.find();
    res.json(dd);
}

exports.UpdateName = async (req, res) => {

    var users = await User.findOne({ username: jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET).username });

    const fullname = req.body.fullname;

    if (!library.empty(users.fullname)) {

        return res.status(401).json({
            code: 401,
            message: 'Tài khoản của bạn đã có tên',
        });

    } else if (library.empty(fullname)) {

        return res.status(400).json({
            code: 400,
            message: 'Tên không được bỏ trống',
        });

    } else if (await User.updateOne({ username: users.username }, { $set: { fullname: fullname } })) {

        return res.status(200).json({
            code: 200,
            message: 'Đặt tên tài khoản thành công',
            href: '/'
        });

    } else {

        return res.status(401).json({
            code: 401,
            message: 'Đặt tên cho tài khoản thất bại',
        });

    }

}

exports.DangNhap = async (req, res) => {

    try {

        const account = req.body.account;
        const password = req.body.password;

        const users1 = await User.findOne({ email: account });
        const users2 = await User.findOne({ username: account });
        const users3 = await User.findOne({ phone: account });

        if (users1) {
            var acc = true;
            var user = users1;
        } else if (users2) {
            var acc = true;
            var user = users2;
        } else if (users3) {
            var acc = true;
            var user = users3;
        } else {
            var acc = false;
        }

        if (library.empty(account)) {

            return res.status(400).json({
                code: 400,
                message: 'Tài khoản không được bỏ trống',
            });

        } else if (!acc) {

            return res.status(401).json({
                code: 401,
                message: 'Tài khoản không tồn tại trong hệ thống',
            });

        } else if (library.empty(password)) {

            return res.status(400).json({
                code: 400,
                message: 'Mật khẩu không được bỏ trống',
            });

        } else if (user.password != password) {

            return res.status(400).json({
                code: 400,
                message: 'Mật khẩu tài khoản không chính xác',
            });

        } else {

            var token = await jwt.sign(
                {
                    username: user.username,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '365d',
                },
            );

            var login = User.updateOne({ username: user.username }, { $set: { token: token } });

            if (await login) {
                res.cookie('access_token', token);

                return res.status(200).json({
                    code: 200,
                    message: 'Đăng nhập thành công',
                    href: '/'
                });

            } else {

                return res.status(401).json({
                    code: 401,
                    message: 'Đăng nhập thất bại',
                });

            }

        }

    } catch (error) {

        return res.status(401).json({
            code: 401,
            message: 'Có lỗi gì xảy ra',
            errorlog: error
        });

    }
}

exports.DangKy = async (req, res) => {

    try {

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const DateBirth = req.body.DateBirth;
        const MonthBirth = req.body.MonthBirth;
        const YearBirth = req.body.YearBirth;

        const users1 = await User.findOne({ email: email });
        const users2 = await User.findOne({ username: username });

        if (library.empty(email)) {

            return res.status(400).json({
                code: 400,
                message: 'Email không được bỏ trống',
            });

        } else if (users1) {

            return res.status(401).json({
                code: 401,
                message: 'Email đã tồn tại trong hệ thống',
            });

        } else if (library.empty(username)) {

            return res.status(400).json({
                code: 400,
                message: 'Tên đăng nhập không được bỏ trống',
            });

        } else if (users2) {

            return res.status(401).json({
                code: 401,
                message: 'Tên đăng nhập đã tồn tại trong hệ thống',
            });

        } else if (library.empty(password)) {

            return res.status(400).json({
                code: 400,
                message: 'Mật khẩu không được bỏ trống',
            });

        } else if (library.empty(DateBirth)) {

            return res.status(400).json({
                code: 400,
                message: 'Ngày sinh không được bỏ trống',
            });

        } else if (library.empty(MonthBirth)) {

            return res.status(400).json({
                code: 400,
                message: 'Tháng sinh không được bỏ trống',
            });

        } else if (library.empty(YearBirth)) {

            return res.status(400).json({
                code: 400,
                message: 'Năm sinh không được bỏ trống',
            });

        } else {

            var token = await jwt.sign(
                {
                    username: username,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '365d',
                },
            );

            const user = new User({
                username: username,
                email: email,
                DateBirth: DateBirth,
                MonthBirth: MonthBirth,
                YearBirth: YearBirth,
                password: password,
                FullInfo: false,
                token: token
            });

            if (user.save()) {

                res.cookie('access_token', token);

                return res.status(200).json({
                    code: 200,
                    message: 'Đăng ký tài khoản thành công, vui lòng đến bước tiếp theo',
                    href: '/'
                });

            } else {

                return res.status(401).json({
                    code: 401,
                    message: 'Đăng ký tài khoản thất bại',
                });

            }

        }


    } catch (error) {

        return res.status(401).json({
            code: 401,
            message: 'Có lỗi gì xảy ra',
            errorlog: error
        });

    }
}
