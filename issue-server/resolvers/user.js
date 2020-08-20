const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import dotenv from 'dotenv';
const {UserInputError, AuthenticationError} = require('apollo-server');
dotenv.config();
export default {
    Query:{
        allUsers:async(_,args,{models})=>{
            const users=await models.User.findAll({
            });
            return users;
        }
    },
    Mutation: {
        createUser: async (_, args, { models }) => {
            if(!args.username||!args.password||!args.email){
                throw new UserInputError('All fields are required');
            }
            const saltRounds = 10;
            try {
                const user = await models.User.create({
                    username: args.username,
                    email: args.email,
                    passwordHash: await bcrypt.hash(args.password, saltRounds)
                });
                return user;

            } catch (err) {
                throw new Error(err);
                console.log(err);
            }
        },
        loginUser: async (_, args, { models }) => {
            const user = await models.User.findOne({ where: { username: args.username } });
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash);
            if (!(user && passwordCorrect)) {
                throw new AuthenticationError(`Cannot find user ${args.username}`);
            }
            const userForToken = {
                username: user.username,
                id: user.id
            };
            const token = jwt.sign(userForToken, process.env.SECRET);
            return token;
        }
    }
}