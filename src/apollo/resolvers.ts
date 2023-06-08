import { Context } from "@cms/pages/prisma";
import { Attends } from "@prisma/client";

export const resolvers = {
  Query: {
    assignedTasks: (_parent: any, _args: any, context: Context) => {
      return context.prisma.users.find({
        where: { id: _args.userID },
      }).tasks;
    },
    attendedEvents: (_parent: any, _args: any, context: Context) => {


      return context.prisma.users.find({
        where: { id: _args.userID },
      }).Attends;
    },
    isAdmin: (_parent: any, _args: any, context: Context) => {

      return context.prisma.users.find({
        where: { id: _args.userID },
      }).isAdmin;
    },
    isactiveProject: (_parent: any, _args: any, context: Context) => {
        return context.prisma.projects.find({
          where: { id: _args.projectID },
        }).status;

    },
    openProjects: (_parent: any, _args: any, context: Context) => {
      return context.prisma.projects.findMany({ where: { status: true } });
    },
    openTasks: (_parent: any, _args: any, context: Context) => {
      return context.prisma.tasks.findMany({ where: { status: true } });
    },
    eventAttendees: (_parent: any, _args: any, context: Context) => {

      return context.prisma.events.find({
        where: { id: _args.eventID },
      }).Attends;

    },
    members: (_parent: any, _args: any, context: Context) => {

      return context.prisma.Clubs.find({ where: { id: _args.clubID } }).Members;
    },
  },
  Mutation: {
    createUser: (_parent: any, _args: any, context: Context) => {
      return context.prisma.users.create({
        data: {
          regNo: _args.regNo,
          userName: _args.userName,
          contactNo: _args.contactNo,
          role: _args.role,


    }})},
    createTask: (_parent: any, _args: any, context: Context) => {

        return context.prisma.tasks.create({

          data: {
            description: _args.description,
            status:true,
            contactNo: _args.contactNo,
            userID: _args.userID,
            projectID: _args.projectID,
 } })},
    createProject: (_parent: any, _args: any, context: Context) => {
      return context.prisma.projects.create({
        data: {
          title: _args.title,
          description: _args.description,
          status: true,
          link: _args.link,
          contactNo: _args.contactNo,
          role: _args.role,
          clubID: _args.clubID

        
    }})},
    createEvent: (_parent: any, _args: any, context: Context) => {


      return context.prisma.events.create({
        data: {
          name: _args.name,
          startsAt: _args.startsAt,
          venue: _args.venue,
        },
      })

    },
    assignTask: (_parent: any, _args: any, context: Context) => {
      return context.prisma.worksOn.create({
        data: {
          user: { connect: { id: _args.userID } },
          task: { connect: { id: _args.taskID } },
        },
      });
    },
    attendEvent: (_parent: any, _args: any, context: Context) => {
      return context.prisma.attends.create({
        data: {
          user: { connect: { id: _args.userID } },
          event: { connect: { id: _args.eventID } },
        },
      });
    },
    updateTask: (_parent: any, _args: any, context: Context) => {
      return context.prisma.tasks.update({
        where: { id: _args.taskID },
        data: {
          description: _args.description,
          status: _args.status,
        },
      });
    },
    updateProjectLink: (_parent: any, _args: any, context: Context) => {
      return context.prisma.projects.update({
        where: { id: _args.projectID },
        data: {
          link: _args.link,
        },
      });
    },
    updateProjectDescription: (_parent: any, _args: any, context: Context) => {
      return context.prisma.projects.update({
        where: { id: _args.projectID },
        data: {
          description: _args.description,
        },
      });
    },
    updateProjectStatus: (_parent: any, _args: any, context: Context) => {
      return context.prisma.projects.update({
        where: { id: _args.projectID },
        data: {
          status: _args.status,
        },
      });
    },
    updateUserRole: (_parent: any, _args: any, context: Context) => {
      return context.prisma.users.update({
        where: { id: _args.userID },
        data: {
          role: _args.role,
        },
      });
    },
    updateUserContactNo: (_parent: any, _args: any, context: Context) => {
      return context.prisma.users.update({
        where: { id: _args.userID },
        data: {
          contactNo: _args.contactNo,
        },
      });
    },
    removeProject: (_parent: any, _args: any, context: Context) => {
      return context.prisma.projects.delete({
        where: { id: _args.projectID },
      });
    },
    removeTask: (_parent: any, _args: any, context: Context) => {
      return context.prisma.tasks.delete({
        where: { id: _args.taskID },
      });
    },
    removeEvent: (_parent: any, _args: any, context: Context) => {
      return context.prisma.events.delete({
        where: { id: _args.eventID },
      });
    },
    removeAttendees: (_parent: any, _args: any, context: Context) => {
      return context.prisma.attends.delete({
        where: { eventID_userID: _args.attendeeID },
      });
    },
  },
};