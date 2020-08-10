export default {
    Mutation: {
        createProject: async (_, args, { models, user }) => {
            try {
                await models.Project.create({
                    ...args,
                    project_lead: user.id
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
}