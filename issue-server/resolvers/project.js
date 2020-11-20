export default {
    Query:{
        allProjects:async(_,args,{models})=>{
            const projects=await models.Project.findAll({include:["manager","member"]});
            return projects; 
        },
        findProject:async(_, args, {models})=>{
            const projects=await models.Project.findOne({where:{id:args.projectId}, include:[{model:models.User, as:"member"}]});
            return projects; 
        },
        userProjects:async(_, args, {models, user})=>{
            try{
                const projectManager=await models.Project.findAll({where:{managerId:user.id, isActive:true}, include:["manager", "member"]});
                console.log(projectManager)
                /* const managers = projectManager.map(p=>{
                    return {
                        user:p.UserId,
                        project:p.ProjectId
                    }});
                const targetQuery =await models.sequelize.transaction(async t=>{
                    let project;
                    let project_leads=[];
                    for(let i=0; i<managers.length; i++){
                        project=await models.Project.findOne({where:{id:managers[i].project}, include:['manager','member']},{ transaction: t });
                        project_leads=project_leads.concat(project);
                    }
                    
                    return project_leads;
                 }); */
                //return targetQuery.filter(t=>t.manager.username===user.username && t.isActive === true);
                return projectManager;
                
            }catch(e){
                throw new Error(e);
            }
        }},
        AddProjectPayload: {
            refetch: () => ({})
          },
    Mutation: {
        createProject: async (_, args, { models, user }) => {
            console.log(user)
            if(user.role !== "Manager"){
                throw new Error('You are not authorized to create project!');
            }
            const projectLead = await models.User.findOne({where:{username:args.projectLead}});
            if(projectLead.role !== "Leader"){
                throw new Error("You can only add user with leader role!");
            }
            try {
                const project=await models.Project.create({
                    name:args.name,
                    url:args.url,
                    isActive:true,
                    managerId:user.id
            }, {include:[{model:models.User, as:"manager"}, {model:models.User, as:"member"}]});
                await Promise.all([
                    project.addMember(projectLead),
                    project.reload()]);
                return {project};
            } catch (err) {
                throw new Error(err);
            }
        },
        addRole:async(_,{username,project,role},{models,user})=>{
            if(!user){
                throw new Error('You are not authorized to add roles!')
            }
            let targetProject;
            let addUserRole;
            try{
                 targetProject=await models.Project.findOne({where:{name:project}, include:['member', 'manager']});
            }catch(e){
                throw new Error('Project doesn\'t exist');
            }
            try{
                 addUserRole=await models.User.findOne({where:{username}});
            }catch(e){
                throw new Error('User doesn\'t exist');
            }

            const userRole=await models.Role.findOne({where:{
                UserId:user.id,
                ProjectId:targetProject.id
            }});
            const roleCheck=await models.Role.findOne({where:{
                UserId:addUserRole.id,
                ProjectId:targetProject.id
            }});
            if(roleCheck){
                throw new Error('User cannot have more than one role');
            }
            if(!(userRole.role==='Admin' || userRole.role==='Manager')){
                throw new Error('You are not authorized to add members');
            }
            try{
                await targetProject.addMember(addUserRole,{through:{role}});
                return {project:targetProject};
            }catch(e){
                throw new Error(e);
            }
        },
        changeStatus:async(_,args,{models, user})=>{
            const project = await models.Project.findOne({where:{id:args.projectId}, include:['manager']});
            if(project.manager.id!==user.id){
                throw new Error("Only project manager can change project status!");
            }
            try{
                await models.Project.update({isActive:args.isActive}, {where:{id:args.projectId}});
                const project = await models.Project.findOne({where:{id:args.projectId},include:["manager","member"]});
                project.reload();
                return {project}
            }
            catch(e){
                throw new Error(e);
            }
        }
    }
}