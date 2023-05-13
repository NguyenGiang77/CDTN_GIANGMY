import userServices from "../services/UserServices";
let HandleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check email có tồn tại k
    //check password có đúng k
    if (!email || !password) { 
        return res.status(500).json({
            errCode: 1,
            errMessage: "Email or password incorrect"
         })
    }

    let userData = await userServices.HanleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        userData
    })
}

module.exports = {
    HandleLogin: HandleLogin
}