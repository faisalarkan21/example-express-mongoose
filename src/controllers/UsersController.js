const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    async register(req, res, next) {
        const {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body;

        const UserSchema = await new User({
            firstName,
            lastName,
            email,
            password,
            role,
        }).save();

        if(UserSchema){
            res.sendStatus(200);
        }



    },
    async login(req, res, next) {

        const {
            email,
            password
        } = req.body;

        try {
            //TODO: Login
            const theUser = await User.findOne({
                email
            });

            const match = await bcrypt.compare(password, theUser.password);

            if (!theUser) {
               return res.json({
                    message: "User Not Found"
                })
            }else if(!match){
               return res.json({
                    message: "Password not match"
                })
            }

            const payload = {
                id: theUser.id
            }

            const token = jwt.sign(payload, keys.JWT_SECRET_KEY, {
                expiresIn: 7 * 24 * 60 * 60
            });

            //TODO: Sending Response
            res.send({
                data: {
                    token,
                    user: theUser

                },
                status: {
                    code: 200,
                    message: "Request Handle Corretly",
                    succeeded: true
                }
            })
        } catch (err) {
            next(err)
        }
    },
}