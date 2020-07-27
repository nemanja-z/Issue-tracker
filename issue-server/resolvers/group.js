export default {
    Mutation: {
        createGroup: async (_, args, { models, user }) => {
            try {
                await models.Group.create({
                    ...args,
                owner:user.dataValues.id});
                return true
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
};