import { compileFunction } from "vm";

export default {
    Query:{
        allProjects:async(_,args,{models})=>{
            const projects=await models.Project.findAll({ include:[{model:models.User}]});
            console.log(projects)
            return projects; 
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
                return true;
            } catch (err) {
                throw new Error(err);
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
            const user_role=await models.Role.findOne({where:{
                UserId:user.id,
                ProjectId:targetProject.id
            }});
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
            if(roleCheck.role!==null){
                throw new Error('User cannot have more than one role');
            }
            
            if(!user_role.role==='Admin'){
                throw new Error('You are not authorized to add members');
            }
            try{
                await targetProject.addUser(addUserRole,{through:{role}});
                return true;
            }catch(e){
                throw new Error(err);
                console.log(e);
                return false;
            }
        }
    }
}