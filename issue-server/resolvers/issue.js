export default {
    Mutation: {
        createIssue: async (_, {input}, { models, user }) => {
            if(!user){
                throw new Error('You are not authorized to report issue!')
            }
            const projectOne=await models.Project.findOne({where:{name:input.Project},
                include:[{model:models.User, where:{username:user.username}}]
            });
            if(!projectOne){
                throw new Error('You are not authorized to report issue');
            }
            
             try {
                await models.Issue.create({
                    ...input,
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