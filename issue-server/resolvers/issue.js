
export default {
    Mutation: {
        createIssue: async (_, args, { models, user }) => {
            const projectOne=await models.Project.findOne({where:{name:args.Project},
                include:[{model:models.User, where:{username:user.username}}]
            });
             try {
                await models.Issue.create({
                    ...args,
                    reporter: user.id,
                    ProjectId:projectOne.id
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            } 
        }
    }
}