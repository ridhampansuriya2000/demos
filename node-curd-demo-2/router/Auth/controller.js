const bcrypt = require('bcrypt');

const {loginBodySchema, sighupBodySchema} = require('./bodySchema.js');
const {schemaErrorResponse} = require("../../Utiles/index.js");
const {User, Password, Token} = require("../../Models/index");

const login = async (request, response) => {
    try {
        const {value, error} = loginBodySchema.validate(request.body);
        if (error)
            return schemaErrorResponse({response, error});

        const user = await User.findOne({email : value.email});
        if (!user)
            return response.status(400).json({message: `User with email ${value.email} does not exist`});

        await user.matchPassword({password : value.password});

        const token = await user.generateAuthToken();

        return response.status(200).json({message: "Login successful", token, user});

    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const signup = async (request, response) => {
    try {
        const {value, error} = sighupBodySchema.validate(request.body, {abortEarly: false});
        if (error)
            return schemaErrorResponse({response, error});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(value.password, salt);

        const userIsExist = await User.checkIsExist({email : value.email});
        if(userIsExist)
            return response.status(400).json({message: `User with email '${value.email}' is already exist`});

        const user = await User.create({
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
        });

        await Password.create({
            password: hashPassword,
            userId: user._id,
        });

        response.status(200).send({message: "User created successfully"});
    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const logout = async (request, response) => {
    try {
        const tokenObj = await Token.findOne({userId : request.user._id, accessToken: request.user.token.accessToken});
        await tokenObj.revoke();
        response.status(200).send({message: "Logout successful"});
    } catch (error) {
        response.status(400).send({error : error.message});
    }
};

const userMe = async (request, response) => {
    try {
        const userObj = await User.findOne({_id : request.user._id});

        return response.status(200).send({ user :userObj, token :request.user.token.accessToken});

    } catch (error) {
        response.status(400).send({error : error.message});
    }
};


module.exports = {
    login,
    logout,
    signup,
    userMe
}