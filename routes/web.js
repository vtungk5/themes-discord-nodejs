import express from 'express';
import Pages from '../app/controller/pages';
import API from '../app/controller/api';


import Auth from '../app/middleware/auth';
import Guest from '../app/middleware/guest';

import AuthAPI from '../app/middleware/authAPI';
import GuestAPI from '../app/middleware/guestAPI';

const Router = express.Router();

// users
Router.get('/', Guest,Pages.TrangChu);


Router.get('/login',Auth, Pages.DangNhap);
Router.get('/register',Auth, Pages.DangKy);

Router.post('/api/profile/update-name', GuestAPI,API.UpdateName);

Router.post('/api/register',AuthAPI, API.DangKy);
Router.post('/api/login',AuthAPI, API.DangNhap);

Router.get('/api/check', API.Check);


module.exports= Router;

