const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const {UserInputError, AuthenticationError} = require('apollo-server');
import {cloudinary} from "../models";

export default {
    Query:{
        allUsers:async(_,args,{models,user})=>{
            return await args.me ? await models.User.findAll({}) : await models.User.findAll({where:{
                username:{
                    [Op.not]:user.username
                }
            }});
        },
        me:async(_,args,{models, user})=>{
             const currentUser = await models.User.findOne({where:{id:user.id}});
             return currentUser;
        }
    },
    Mutation: {
        createUser: async (_, args, { models }) => {
            if(!args.username||!args.password||!args.email){
                throw new UserInputError('All fields are required');
            }
            const saltRounds = 10;
            let profile="";
            try {
                const {createReadStream} = await args.profile;
                await new Promise((resolve, reject) => {
                    const streamLoad = cloudinary.uploader.upload_stream(function (error, result) {
                        if (result) {
                            profile = result.secure_url;
                            resolve(profile)
                        } else {
                            reject(error);
                        }
                    });
    
                    createReadStream().pipe(streamLoad);
                })
                const user = await models.User.create({
                    username: args.username,
                    email: args.email,
                    profile,
                    passwordHash: await bcrypt.hash(args.password, saltRounds)
                });
                return user;

            } catch (err) {
                throw new Error(err.message);
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