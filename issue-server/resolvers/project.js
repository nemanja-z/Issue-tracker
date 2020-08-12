export default {
    Query:{
        allProjects:async(_,args,{models})=>{
            const projects=await models.Project.findAll({
                include: 
                [{model: models.User}]
            });
            console.log(projects);
            return projects; 
        }
    },
    Mutation: {
        createProject: async (_, args, { models, user }) => {
            try {
                const project=await models.Project.create({
                    ...args,
                    Project_lead:user.id});
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        addMember:async(_,{username,project},{models,user})=>{
            const projectMember=await models.Project.findOne({where:{name:project}});
            const projectLead=await models.User.findOne({where:{username:user.username}});
            const addMember=await models.User.findOne({where:{username}});
            if(!projectMember){
                throw new Error('Project doesn\'t exist');
            }
            if(!projectLead){
                throw new Error('You are not authorized to add members');
            }
            try{
                await projectMember.addUser(addMember,{through:"Member"});
                return true;
            }catch(e){
                console.log(e);
                return false;
            }
        }
    }
}