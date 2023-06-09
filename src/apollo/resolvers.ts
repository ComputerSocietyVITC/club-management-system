import { prisma } from "@cms/server/db";
import { Context } from "@cms/server/prisma";
import {
  Attends,
  Events,
  Projects,
  Tasks,
  Users,
  WorksOn,
} from "@prisma/client";

export const resolvers = {
  Query: {
    helloWorld: () => "Hello World!",
    getAllUsers: () => {
      return prisma.users.findMany({});
    },
    getAllProjects: () => {
      return prisma.projects.findMany({});
    },
    getAllEvents: () => {
      return prisma.events.findMany({});
    },
    getAllTasks: () => {
      return prisma.tasks.findMany({});
    },
    // assignedTasks: () => {},
    // attendedEvents: () => {},
    // isAdmin: () => {},
    // isactiveProject: () => {},
    // openProjects: () => {},
    // openTasks: () => {},
    // eventAttendees: () => {},
    // members: () => {},
  },
  Mutation: {
    createUser: (_parent: any, _args: Users, context: Context) => {
      return prisma.users.create({
        data: {
          regNo: _args.regNo,
          userName: _args.userName,
          contactNo: _args.contactNo,
          role: _args.role,
        },
      });
    },
    createTask: (_parent: any, _args: Tasks, context: Context) => {
      return prisma.tasks.create({
        data: {
          description: _args.description,
          status: true,
          userId: _args.userId,
          projectID: _args.projectID,
        },
      });
    },
    createProject: (_parent: any, _args: Projects, _context: Context) => {
      return prisma.projects.create({
        data: {
          title: _args.title,
          description: _args.description,
          status: true,
          link: _args.link,
          contactNo: _args.contactNo,
          role: _args.role,
          clubID: _args.clubID,
        },
      });
    },
    createEvent: (_parent: any, _args: Events, context: Context) => {
      return prisma.events.create({
        data: {
          name: _args.name,
          startsAt: new Date(_args.startsAt).toISOString(),
          venue: _args.venue,
        },
      });
    },
    assignTask: (_parent: any, _args: WorksOn, context: Context) => {
      return prisma.worksOn.create({
        data: {
          user: { connect: { id: _args.userID } },
          task: { connect: { id: _args.taskID } },
        },
      });
    },
    attendEvent: (_parent: any, _args: Attends, context: Context) => {
      return prisma.attends.create({
        data: {
          user: { connect: { id: _args.userID } },
          event: { connect: { id: _args.eventID } },
        },
      });
    },
    updateTask: (_parent: any, _args: any, context: Context) => {
      return prisma.tasks.update({
        where: { id: _args.taskID },
        data: {
          description: _args.description,
          status: _args.status,
        },
      });
    },
    updateProjectLink: (_parent: any, _args: any, context: Context) => {
      return prisma.projects.update({
        where: { id: _args.projectID },
        data: {
          link: _args.link,
        },
      });
    },
    updateProjectDescription: (
      _parent: any,
      _args: Projects & { projectId: string },
      context: Context
    ) => {
      return prisma.projects.update({
        where: { id: _args.projectId },
        data: {
          description: _args.description,
        },
      });
    },
    updateProjectStatus: (
      _parent: any,
      _args: Projects & { projectId: string },
      context: Context
    ) => {
      return prisma.projects.update({
        where: { id: _args.projectId },
        data: {
          status: _args.status,
        },
      });
    },
    updateUserRole: (_parent: any, _args: Users, context: Context) => {
      return prisma.users.update({
        where: { id: _args.id },
        data: {
          role: _args.role,
        },
      });
    },
    updateUserContactNo: (_parent: any, _args: Users, context: Context) => {
      return prisma.users.update({
        where: { id: _args.id },
        data: {
          contactNo: _args.contactNo,
        },
      });
    },
    removeProject: (_parent: any, _args: Projects, context: Context) => {
      return prisma.projects.delete({
        where: { id: _args.id },
      });
    },
    removeTask: (_parent: any, _args: Tasks, context: Context) => {
      return prisma.tasks.delete({
        where: { id: _args.id },
      });
    },
    removeEvent: (_parent: any, _args: Events, context: Context) => {
      return prisma.events.delete({
        where: { id: _args.id },
      });
    },
    removeAttendee: (_parent: any, _args: Attends, context: Context) => {
      return prisma.attends.delete({
        where: {},
      });
    },
  },
};
