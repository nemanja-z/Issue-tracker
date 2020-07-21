module.exports = {
    Mutation: {
        createProject: async (_, args, { models, user }) => {
            try {
                await models.Project.create({
                    ...args,
                    owner: user.id
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
}