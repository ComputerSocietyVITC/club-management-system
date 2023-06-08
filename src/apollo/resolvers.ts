import { Context } from "@cms/pages/prisma";
import { Attends } from "@prisma/client";

export const resolvers = {
  Query: {
    assignedTasks: () => {},
    attendedEvents: () => {},
    isAdmin: () => {},
    isactiveProject: () => {},
    openProjects: () => {},
    openTasks: () => {},
    eventAttendees: () => {},
    members: () => {},
  },
  Mutation: {
    createUser: () => {},
    createTask: () => {},
    createProject: () => {},
    createEvent: () => {},
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
    removeAttendee: (_parent: any, _args: any, context: Context) => {
      return context.prisma.attends.delete({
        where: { eventID_userID: _args.attendeeID },
      });
    },
  },
};
