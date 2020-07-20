module.exports = {
    Mutation: {
        createGroup: async (parent, args, { models }) => {
            try {
                await models.Group.create(args);
                return true
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
};