export default {
    Mutation: {
        createGroup: async (_, {name}, { models, user }) => {
            try {
                await models.Group.create({
                name,
                creator:await user.id
                });
                
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
};