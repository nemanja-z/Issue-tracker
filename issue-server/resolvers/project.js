export default {
    Query:{
        allProjects:async(_,args,{models})=>{
            const projects=await models.Project.findAll({ include:[{model:models.User}]});
            return projects; 
        },
        userProjects:async(_, args, {models, user})=>{
            try{
                const projectManager=await models.Role.findAll({where:{role:"Manager"} });
                const managers = projectManager.map(p=>{
                    return {user:p.UserId,
                    project:p.ProjectId}});
                const targetQuery =await models.sequelize.transaction(async t=>{
                    let project_lead, project;
                    let project_leads=[];
                    for(let i=0; i<managers.length; i++){
                        project_lead=await models.User.findOne({where:{id:managers[i].user}},{ transaction: t });
                        project=await models.Project.findOne({where:{id:managers[i].project}},{ transaction: t });
                        project_leads=[...project_leads, {leaderId:project_lead.id, project_lead:project_lead.username,project:project.name, url:project.url, projectId:project.id}];
                    }
                    return project_leads;
                 });
                return targetQuery.filter(t=>t.project_lead===user.username);
            }catch(e){
                console.log(e);
            }
        },
        allProjectManagers:async(_, args, {models})=>{
            try{
                const projectManager=await models.Role.findAll({where:{role:"Manager"} });
                const managers = projectManager.map(p=>{
                    return {user:p.UserId,
                    project:p.ProjectId}});
                const targetQuery =await models.sequelize.transaction(async t=>{
                    let project_lead, project;
                    let project_leads=[];
                    for(let i=0; i<managers.length; i++){
                        project_lead=await models.User.findOne({where:{id:managers[i].user}},{ transaction: t });
                        project=await models.Project.findOne({where:{id:managers[i].project}},{ transaction: t });
                        project_leads=[...project_leads, {leaderId:project_lead.id, project_lead:project_lead.username,project:project.name, url:project.url, projectId:project.id}];
                    }
                    return project_leads;
                 });
                return targetQuery;
            }catch(e){
                console.log(e);
            }
        }},
    Mutation: {
        createProject: async (_, args, { models, user }) => {
            if(!user){
                throw new Error('You are not authorized to create project!');
            }
            try {
                const project=await models.Project.create({
                    ...args});
                await project.addUser(user,{through:{role:'Admin'}});
                if(!args.role){
                    await project.addUser(user,{through:{role:'Manager'}});
                }
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        addRole:async(_,{username,project,role},{models,user})=>{
            if(!user){
                throw new Error('You are not authorized to add roles!')
            }
            const targetProject=await models.Project.findOne({where:{name:project}});
            const addUserRole=await models.User.findOne({where:{username}});
            const userRole=await models.Role.findOne({where:{
                UserId:user.id,
                ProjectId:targetProject.id
            }});
            console.log(userRole)
            const roleCheck=await models.Role.findOne({where:{
                UserId:addUserRole.id,
                ProjectId:targetProject.id
            }});
            if(!targetProject){
                throw new Error('Project doesn\'t exist');
            }
            if(!addUserRole){
                throw new Error('User doesn\'t exist');
            }
            if(roleCheck){
                throw new Error('User cannot have more than one role');
            }
            if(!(userRole.role==='Admin')){
                throw new Error('You are not authorized to add members');
            }
            try{
                await targetProject.addUser(addUserRole,{through:{role}});
                return true;
            }catch(e){
                console.log(e);
                return false;
            }
        }
    }
}