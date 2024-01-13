import User from '../model/User.js';
import jwt from 'jsonwebtoken';

exports.empty  = function (obj) {
    if(!obj){
        return true;
    }else if(obj == null && obj == undefined ){
        return true;
    }else if (obj.length <= 0) {
        return true;
    }
    return false;
}

