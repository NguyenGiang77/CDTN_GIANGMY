import db from "../models/index";
import bcrypt from 'bcryptjs';

let HanleUserLogin = (email, password) => { 
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) { 
                //user đã tồn tại
                let user = await db.User.findOne({
                    where: { email: email }
                });
                if (user) {
                   let check = await bcrypt.compareSync(password, user.password);// check password
                     if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        userData.user = user;
                    }
                     else {
                         userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                     }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
                // so sánh password
            }
            else {
                // return lỗi
                userData.errCode = 1;
                userData.errMessage = "Email is'nt exist";

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkEmail = (UserEmail) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let user = await db.User.findOne({
                where: {email: UserEmail}
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }

        catch (e) { 
            reject(e)
        }
    })
        
}
module.exports = {
    HanleUserLogin: HanleUserLogin
}