import { Context } from "@cms/components/prisma";

import {
  Attends,
  Clubs,
  Events,
  Projects,
  Tasks,
  Users,
  WorksOn,
} from "@prisma/client";

export const resolvers = {
  Query: {
    helloWorld: () => "Hello World!",
    getAllUsers: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.findMany({});
    },
    getAllProjects: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.projects.findMany({});
    },
    getAllEvents: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.events.findMany({});
    },
    getAllTasks: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.tasks.findMany({});
    },
    assignedTasks: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.findUnique({
        where: { id: _args.id },
      }).tasks;
    },
    attendedEvents: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.findUnique({
        where: { id: _args.id },
      }).Attends;
    },
    isAdmin: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.findUnique({
        where: { id: _args.id },
        select: { role: true },
      });
    },
    isActiveProject: (_parent: any, _args: Projects, context: Context) => {
      return context.prisma.projects.findUnique({
        where: { id: _args.id },
        select: { status: true },
      });
    },
    openProjects: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.projects.findMany({ where: { status: true } });
    },
    openTasks: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.tasks.findMany({ where: { status: true } });
    },
    eventAttendees: (_parent: any, _args: Events, context: Context) => {
      return context.prisma.events.findUnique({
        where: { id: _args.id },
      }).Attends;
    },
    findAllMembers: (_parent: any, _args: Clubs, context: Context) => {
      return context.prisma.clubs.findUnique({ where: { id: _args.id } })
        .Members;
    },
  },
  Mutation: {
    createUser: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.create({
        data: {
          regNo: _args.regNo,
          userName: _args.userName,
          contactNo: _args.contactNo,
          role: _args.role,
        },
      });
    },
    createTask: (_parent: any, _args: Tasks, context: Context) => {
      return context.prisma.tasks.create({
        data: {
          description: _args.description,
          status: true,
          userId: _args.userId,
          projectID: _args.projectID,
        },
      });
    },
    createProject: (_parent: any, _args: Projects, _context: Context) => {
      return _context.prisma.projects.create({
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
      return context.prisma.events.create({
        data: {
          name: _args.name,
          startsAt: new Date(_args.startsAt).toISOString(),
          venue: _args.venue,
        },
      });
    },
    assignTask: (_parent: any, _args: WorksOn, context: Context) => {
      return context.prisma.worksOn.create({
        data: {
          user: { connect: { id: _args.userID } },
          task: { connect: { id: _args.taskID } },
        },
      });
    },
    attendEvent: (_parent: any, _args: Attends, context: Context) => {
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
    updateProjectDescription: (
      _parent: any,
      _args: Projects & { projectId: string },
      context: Context
    ) => {
      return context.prisma.projects.update({
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
      return context.prisma.projects.update({
        where: { id: _args.projectId },
        data: {
          status: _args.status,
        },
      });
    },
    updateUserRole: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.update({
        where: { id: _args.id },
        data: {
          role: _args.role,
        },
      });
    },
    updateUserContactNo: (_parent: any, _args: Users, context: Context) => {
      return context.prisma.users.update({
        where: { id: _args.id },
        data: {
          contactNo: _args.contactNo,
        },
      });
    },
    removeProject: (_parent: any, _args: Projects, context: Context) => {
      return context.prisma.projects.delete({
        where: { id: _args.id },
      });
    },
    removeTask: (_parent: any, _args: Tasks, context: Context) => {
      return context.prisma.tasks.delete({
        where: { id: _args.id },
      });
    },
    removeEvent: (_parent: any, _args: Events, context: Context) => {
      return context.prisma.events.delete({
        where: { id: _args.id },
      });
    },
    removeAttendee: (_parent: any, _args: Attends, context: Context) => {
      return context.prisma.attends.delete({
        where: {},
      });
    },
  },
};
