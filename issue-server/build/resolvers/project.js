"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  Query: {
    allProjects: async (_, args, {
      models
    }) => {
      const projects = await models.Project.findAll({
        include: ['manager', 'member']
      });
      return projects;
    },
    findProject: async (_, args, {
      models
    }) => {
      const projects = await models.Project.findOne({
        where: {
          id: args.projectId
        },
        include: [{
          model: models.User,
          as: 'member'
        }]
      });
      return projects;
    },
    userProjects: async (_, args, {
      models,
      user
    }) => {
      try {
        const projectManager = await models.Project.findAll({
          where: {
            managerId: user.id,
            isActive: true
          },
          include: ['manager', 'member']
        });
        return projectManager;
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  AddProjectPayload: {
    refetch: () => ({})
  },
  Mutation: {
    createProject: async (_, args, {
      models,
      user
    }) => {
      if (user.role !== 'Manager') {
        throw new Error('You are not authorized to create project!');
      }

      const projectLead = await models.User.findOne({
        where: {
          username: args.projectLead
        }
      });

      if (projectLead.role !== 'Leader') {
        throw new Error('You can only add user with leader role!');
      }

      try {
        const project = await models.Project.create({
          name: args.name,
          url: args.url,
          isActive: true,
          managerId: user.id
        }, {
          include: [{
            model: models.User,
            as: 'manager'
          }, {
            model: models.User,
            as: 'member'
          }]
        });
        await Promise.all([project.addMember(projectLead), project.reload()]);
        return {
          project
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    addMember: async (_, {
      username,
      project
    }, {
      models,
      user
    }) => {
      if (!user) {
        throw new Error('You are not authorized to add members!');
      }

      const targetProject = await models.Project.findOne({
        where: {
          name: project
        },
        include: [{
          model: models.User,
          as: 'member'
        }, {
          model: models.User,
          as: 'manager',
          where: {
            username: user.username
          }
        }]
      });
      const addUserRole = await models.User.findOne({
        where: {
          username
        }
      });

      if (!targetProject) {
        throw new Error('You cannot add a member because project doesn\'t exist or you are not a manager!');
      }

      if (!addUserRole) {
        throw new Error('User doesnt exist!');
      }

      try {
        await targetProject.addMember(addUserRole);
        await targetProject.reload();
        return {
          project: targetProject
        };
      } catch (e) {
        throw new Error(e);
      }
    },
    changeStatus: async (_, args, {
      models,
      user
    }) => {
      const project = await models.Project.findOne({
        where: {
          id: args.projectId
        },
        include: [{
          model: models.User,
          as: 'manager',
          where: {
            username: user.username
          }
        }]
      });

      if (!project) {
        throw new Error('The project manager can only change the project status!');
      }

      try {
        await models.Project.update({
          isActive: args.isActive
        }, {
          where: {
            id: args.projectId
          }
        });
        const project = await models.Project.findOne({
          where: {
            id: args.projectId
          },
          include: ['manager', 'member']
        });
        await project.reload();
        return {
          project
        };
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
exports.default = _default;