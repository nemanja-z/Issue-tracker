const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError, UserInputError } = require("apollo-server-core");
module.exports = {
    Mutation: {
        createUser: async (parent, args, { models }) => {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(args.password, saltRounds);
            try {
                return await models.User.create({
                    username: args.username,
                    email: args.email,
                    passwordHash
                });
            } catch (err) {
                console.log(err);
            }
        },
        loginUser: async (parent, args, { models }) => {
            const user = await models.User.findOne({ username: args.username });
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash);
            if (!(user && passwordCorrect)) {
                throw new AuthenticationError('The username or password is incorrect')
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