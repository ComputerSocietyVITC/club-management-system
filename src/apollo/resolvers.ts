const resolvers = {
  Query: {
    users: async () => {
      return prisma.users.findMany();
    },
    user: async (_, { id }) => {
      return prisma.users.findUnique({ where: { id } });
    },
    tasks: async () => {
      return prisma.tasks.findMany();
    },
    task: async (_, { id }) => {
      return prisma.tasks.findUnique({ where: { id } });
    },
    projects: async () => {
      return prisma.projects.findMany();
    },
    project: async (_, { id }) => {
      return prisma.projects.findUnique({ where: { id } });
    },
    events: async () => {
      return prisma.events.findMany();
    },
    event: async (_, { id }) => {
      return prisma.events.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createUser: async (_, { regNo, userName, contactNo, role }) => {
      return prisma.users.create({
        data: {
          regNo,
          userName,
          contactNo,
          role,
        },
      });
    },
    createTask: async (_, { description, contactNo, userID, projectId }) => {
      return prisma.tasks.create({
        data: {
          description,
          contactNo,
          userID,
          projectId,
        },
      });
    },
    createProject: async (_, { title, status, contactNo, role }) => {
      return prisma.projects.create({
        data: {
          title,
          status,
          contactNo,
          role,
        },
      });
    },
    createEvent: async (_, { name, startsAt, venue }) => {
      return prisma.events.create({
        data: {
          name,
          startsAt,
          venue,
        },
      });
    },
    assignTaskToUser: async (_, { userID, taskID }) => {
      return prisma.worksOn.create({
        data: {
          userID,
          taskID,
        },
      });
    },
    attendEvent: async (_, { userID, eventID }) => {
      return prisma.attends.create({
        data: {
          userID,
          eventID,
        },
      });
    },
  },
  User: {
    createdBy: async (parent) => {
      return prisma.users.findUnique({
        where: { id: parent.userID },
      });
    },
    assignedTasks: async (parent) => {
      return prisma.tasks.findMany({
        where: { userID: parent.id },
      });
    },
  },
  Task: {
    createdBy: async (parent) => {
      return prisma.users.findUnique({
        where: { id: parent.userID },
      });
    },
    assignedTo: async (parent) => {
      return prisma.projects.findUnique({
        where: { id: parent.projectId },
      });
    },
  },
  Event: {
    attendees: async (parent) => {
      return prisma.attends
        .findMany({
          where: { eventID: parent.id },
        })
        .then((attendees) =>
          attendees.map((attendee) =>
            prisma.users.findUnique({ where: { id: attendee.userID } })
          )
        );
    },
  },
};

module.exports = resolvers;
