export default {
    Mutation: {
        createGroup: async (_, args, { models, user }) => {
            try {
                await models.Group.create({
                name:args.name,
                owner:user.id})
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
};