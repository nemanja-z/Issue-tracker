"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sendEmail = require("../utils/sendEmail");

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const {
  Op
} = require('sequelize');

const {
  UserInputError,
  AuthenticationError
} = require('apollo-server');

require('dotenv').config();

var _default = {
  Query: {
    allUsers: async (_, args, {
      models,
      user
    }) => {
      return (await args.me) ? await models.User.findAll({}) : await models.User.findAll({
        where: {
          username: {
            [Op.not]: user.username
          }
        }
      });
    },
    allUnassignedUsers: async (_, args, {
      models
    }) => {
      const assigned = await models.Project.findAll({
        where: {
          isActive: true
        },
        include: [{
          model: models.User,
          as: 'member'
        }]
      });
      const users = new Set(assigned.map(project => project.member.map(member => member.id)).flat());
      return await models.User.findAll({
        where: {
          id: {
            [Op.notIn]: [...users]
          },
          role: {
            [Op.notIn]: ['Admin', 'Manager']
          }
        }
      });
    },
    projectUsers: async (_, args, {
      models
    }) => {
      const users = await models.Project.findOne({
        where: {
          name: args.name
        },
        include: [{
          model: models.User,
          as: 'member',
          where: {
            role: {
              [Op.not]: 'Contractor'
            }
          }
        }]
      });
      return users.member;
    },
    me: async (_, args, {
      models,
      user
    }) => {
      const currentUser = await models.User.findOne({
        where: {
          id: user.id
        }
      });
      return currentUser;
    }
  },
  Mutation: {
    createUser: async (_, args, {
      models,
      cloudinary
    }) => {
      if (!args.username || !args.password || !args.email) {
        throw new UserInputError('All fields are required');
      }

      const saltRounds = 10;
      let profile = '';

      try {
        if (args.profile) {
          const {
            createReadStream
          } = await args.profile;
          await new Promise((resolve, reject) => {
            const streamLoad = cloudinary.uploader.upload_stream(function (error, result) {
              if (result) {
                profile = result.secure_url;
                resolve(profile);
              } else {
                reject(error);
              }
            });
            createReadStream().pipe(streamLoad);
          });
        }

        const userExist = await models.User.findOne({
          where: {
            username: args.username
          }
        });
        const emailExist = await models.User.findOne({
          where: {
            email: args.email
          }
        });
        if (userExist) throw new Error('This username is already taken!');
        if (emailExist) throw new Error('This email address is already taken!');
        const user = await models.User.create({
          username: args.username,
          email: args.email,
          role: args.role,
          profile: profile || process.env.CLOUDINARY,
          passwordHash: await bcrypt.hash(args.password, saltRounds)
        });
        const userForToken = {
          username: user.username,
          id: user.id
        };
        const token = jwt.sign(userForToken, process.env.SECRET);
        user.resetPasswordToken = token;
        await user.save();
        await (0, _sendEmail.sendEmail)(user.email, `<html>
                <body>
                <p>Click on the <a href=${process.env.hosting}/confirm/${token}> link</a> to verify your account!</p>
                </body>
                </html>`);
        return user;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    confirmUser: async (_, args, {
      models
    }) => {
      const user = await models.User.findOne({
        where: {
          resetPasswordToken: args.token
        }
      });

      if (!user) {
        throw new Error("User doesn't exist!");
      }

      try {
        user.isVerified = true;
        user.resetPasswordToken = undefined;
        await user.save();
        return true;
      } catch (e) {
        throw new Error(e);
      }
    },
    loginUser: async (_, args, {
      models
    }) => {
      try {
        const user = await models.User.findOne({
          where: {
            username: args.username,
            isVerified: true
          }
        });
        const passwordCorrect = user === null ? false : await bcrypt.compare(args.password, user.passwordHash);

        if (!(user || passwordCorrect)) {
          throw new AuthenticationError(`Cannot find user ${args.username}`);
        }

        const userForToken = {
          username: user.username,
          id: user.id
        };
        const token = jwt.sign(userForToken, process.env.SECRET);
        return {
          token
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },
    sendForgotPasswordEmail: async (_, args, {
      models
    }) => {
      const userF = await models.User.findOne({
        where: {
          email: args.email
        }
      });
      const userForToken = {
        username: userF.username,
        id: userF.id
      };

      if (!userF) {
        throw new Error("User doesn't exist");
      }

      const token = jwt.sign({
        exp: Date.now() + 3600000,
        data: userForToken
      }, process.env.SECRET);

      try {
        await models.User.update({
          resetPasswordToken: token
        }, {
          where: {
            id: userF.id
          }
        });
        await (0, _sendEmail.sendEmail)(userF.email, `<html>
                <body>
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account. 
                Please click on the following<a href="http://localhost:3000/reset/${token}"> link</a>, or paste this into your browser to complete the process:
                
                If you did not request this, please ignore this email and your password will remain unchanged.</p>
                </body>
                </html>`);
        return token;
      } catch (err) {
        throw new Error(err);
      }
    },
    forgotPassword: async (_, args, {
      models
    }) => {
      const user = await models.User.findOne({
        where: {
          resetPasswordToken: args.token
        }
      });

      if (!user) {
        throw new Error('User doesnt exist or token is expired');
      }

      try {
        await models.User.update({
          resetPasswordToken: undefined,
          passwordHash: await bcrypt.hash(args.newPassword, 10)
        }, {
          where: {
            email: user.email
          }
        });
        await (0, _sendEmail.sendEmail)(user.email, `<html>
                    <body>
                    <p>Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n</p>
                    </body>
                    </html>`);
        return true;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    editUser: async (_, args, {
      models,
      user,
      cloudinary
    }) => {
      if (!user) {
        throw new Error('You are not authorized to edit user profile!');
      }

      try {
        var _profile;

        let profile = '';

        if (args.profile) {
          const {
            createReadStream
          } = await args.profile;
          await new Promise((resolve, reject) => {
            const streamLoad = cloudinary.uploader.upload_stream(function (error, result) {
              if (result) {
                profile = result.secure_url;
                resolve(profile);
              } else {
                reject(error);
              }
            });
            createReadStream().pipe(streamLoad);
          });
        }

        const data = { ...args,
          profile: (_profile = profile) !== null && _profile !== void 0 ? _profile : user.profile
        };
        await models.User.update(data, {
          where: {
            email: args.email
          }
        });
        return await models.User.findOne({
          where: {
            email: args.email
          }
        });
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
exports.default = _default;