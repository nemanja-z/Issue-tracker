const { Op } = require("sequelize");
export default {
    Query:{
        allIssues: async(_, args, {models}) =>{
            const issues=await models.Issue.findAll({where:{project:args.projectId},
            include:[{model:models.Project}, {model:models.User, as:'reporter'}, {model:models.User, as:'assignees'}]});
            return issues;
            
        },
        targetIssue:async(_, args, {models})=>{
            const issue=await models.Issue.findOne({where:{id:args.issueId},
                include:[{model:models.Project}, {model:models.User, as:'reporter'}, {model:models.User, as:'assignees'}]});
            return issue;
        },
        assignedToMe:async(_,args,{models, user})=>{
            return await models.Issue.findAll({
                include:[{model:models.Project}, {model:models.User, as:'reporter'}, {model:models.User, as:'assignees',
                where:{username:user.username}}]});
        },
        issueComment:async(_, args, {models})=>{
            const comments=await models.Comment.findAll({where:{issueId:args.issueId},
            include:'commenter'});
            return comments;
        },
        issuesAll:async(_, args, {models,user})=>{
            const role=await models.Role.findAll({where:
                {UserId:user.id,
                    role:{[Op.not]:"Contractor"}}});
            const userIssues =await models.sequelize.transaction(async t=>{
                let allIssues=[];
                for(let i=0; i<role.length;i++){
                    const issue = await models.Issue.findOne({where:{project:role[i].ProjectId},include:[{model:models.Project}, {model:models.User, as:'reporter'}]});
                    allIssues=[...allIssues, issue];
                }
                return allIssues.filter(issue=>issue!==null)
            })
            return userIssues;
        }
    },
    AddIssuePayload: {
        refetch: () => ({})
      },
    Mutation: {
        createIssue: async (_, {input}, { models, user, cloudinary }) => {
            if(!user){
                throw new Error('You are not authorized to report issue!');
            }
            const targetProject=await models.Project.findOne({where:{name:input.project}});
            /* const user_role=await models.Role.findOne({where:{
                UserId:user.id,
                ProjectId:targetProject.id
            }});
            if(!user_role){
                throw new Error('You are not authorized to report issue');
            } */
            let attachment=[];
            try {
                if(input.attachment){
                    const {createReadStream} = await input.attachment;
                    await new Promise((resolve, reject) => {
                        const streamLoad = cloudinary.uploader.upload_stream(function (error, result) {
                            if (result) {
                                attachment = attachment.concat(result.secure_url);
                                resolve(attachment)
                            } else {
                                reject(error);
                            }
                        });
        
                        createReadStream().pipe(streamLoad);
                    });
                }
                const issue = await models.Issue.create({
                    ...input,
                    attachment,
                    reporterId:user.id,
                    project:targetProject.id
                }, {include:[{model:models.User, as:"reporter"}, {model:models.Project}, {model:models.User, as:"assignees"}]});
                await issue.reload();
                return {issue};
            } catch (err) {
                throw new Error(err);
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
                await targetIssue.addAssignees(assignee,{through:"Assignee"});
                return true;
            }catch(err){
                console.log(err);
                return false;
            }
            
        },
        postComment: async(_, args, {models, user}) => {
            if(!user){
                throw new Error('You are not authorized to report issue!');
            }
            const issue = await models.Issue.findOne({where:{id:args.issueId}});
            if(!issue){
                throw new Error('Issue doesn\'t exist');
            }
            try{
                await models.Comment.create({
                    comment:args.comment, 
                    commenterId:user.id, 
                    issueId:args.issueId});
                return true;
            }catch(e){
                console.log(e);
                return false;
            }
        },
        editIssue: async(_, args, {models, user})=>{
            if(!user){
                throw new Error('You are not authorized to report issue!');
            }
            try{
                const data = {...args.input}
                await models.Issue.update(data, {where:{id:args.issueId}});
                return true;
            }catch(e){
                throw new Error(e);
            }
        }

    }
}