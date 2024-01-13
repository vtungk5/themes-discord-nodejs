import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';


exports.TrangChu = async (req, res, next) => {
    var users = await User.findOne({ username: jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET).username });

    return res.render('home/index', {
        users: users
    });
    
}

exports.DangNhap = async (req, res, next) => {

    var qr = QRCode.toString('http://' + process.env.URL + '/login', {
        errorCorrectionLevel: 'H',
        type: 'svg'
    }, function (err, data) {
        if (err) throw err;
    });

    return res.render('auth/login', {
        qrcode: qr
    });
}

exports.DangKy = async (req, res, next) => {
    return res.render('auth/register');
}
