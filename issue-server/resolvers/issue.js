export default {
    Query:{
        allIssues: async(_, args, {models}) =>{
            const issues=await models.Issue.findAll({where:{project:args.projectId}});
            console.log(issues)
            return issues;
            
        },
        targetIssue:async(_, args, {models})=>{
            const issue=await models.Issue.findOne({where:{id:args.issueId}});
            return issue;
        }
    },
    Mutation: {
        createIssue: async (_, {input}, { models, user }) => {
            if(!user){
                throw new Error('You are not authorized to report issue!');
            }
            const targetProject=await models.Project.findOne({where:{name:input.project}});
            const user_role=await models.Role.findOne({where:{
                UserId:user.id,
                ProjectId:targetProject.id
            }});
            if(!user_role){
                throw new Error('You are not authorized to report issue');
            }
            
             try {
                await models.Issue.create({
                    ...input,
                    reporter: user.id,
                    project:targetProject.id
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            } 
        },
        assignUser: async(_,args,{models,user})=>{
            if(!user){
                throw new Error('You are not authorized to report issue!');
            }
            const targetProject=await models.Project.findOne({where:{name:args.project}});
            const targetIssue=await models.Issue.findOne({where:{id:args.issue}});
            const user_role=await models.Role.findOne({where:{
                UserId:user.id,
                ProjectId:targetProject.id
            }});
            const assignee=await models.User.findOne({where:{username:args.user}});
            if(!assignee){
                throw new Error("User doesn\'t exist");
            }
            if (!user_role || user_role.role==="Contractor"){
                throw new Error("You cannot assign issue");
            }
            try{
                targetIssue.addUser(assignee,{through:"Assignee"});
                return true;
            }catch(err){
                console.log(err);
                return false;
            }
            
        }
    }
}