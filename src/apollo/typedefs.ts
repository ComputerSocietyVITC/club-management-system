import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    regNo: String!
    userName: String!
    contactNo: Int!
    role: String
    assignedTasks: [Task!]!
  }

  type Clubs {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    facultyCoordinator: String
    email: String!
    Projects: [Project]
    Members: [Members]
  }

  type Task {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    description: String!
    status: Boolean!
    contactNo: Int!
    userId: String!
    assignedTo: Project!
    projectId: String
  }

  input TaskInput {
    description: String!
    status: Boolean!
    createdBy: String!
    assignedTo: String!
  }

  type Project {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    description: String
    link: String
    clubID: String
    title: String!
    status: String
    contactNo: Int!
    role: String
  }

  type Event {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    startsAt: DateTime!
    venue: String!
    attendees: [User!]
  }

  type Members {
    id: Int!
    userId: String!
    clubId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type WorkOn {
    id: Int!
    user: User!
    task: Task!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Attend {
    id: Int!
    user: User!
    event: Event!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  scalar DateTime

  type Query {
    helloWorld: String!
    getAllUsers: [User!]
    getAllProjects: [Project!]
    getAllTasks: [Task!]
    getAllEvents: [Event!]
    assignedTasks(id: String!): [Task]
    attendedEvents(id: String!): [Event]
    isAdmin(id: String!): User
    isActiveProject(id: String!): Project
    openProjects: [Project]
    openTasks: [Task]
    eventAttendees(id: Event): [Attend]
    findAllMembers(id: Clubs): [Members]
  }
  type Mutation {
    createUser(
      regNo: String!
      userName: String!
      contactNo: Int!
      role: String
    ): User!
    createTask(
      description: String!
      contactNo: Int!
      userID: Int!
      projectId: Int!
      userid: String!
      projectid: String!
    ): Task!
    createProject(
      title: String!
      status: String
      contactNo: Int!
      role: String
    ): Project!
    createEvent(name: String!, startsAt: DateTime!, venue: String!): Event!
    assignTask(userid: String!, taskid: String!): WorkOn!
    attendEvent(userid: String!, eventid: String!): Attend!
    updateTask(params: TaskInput): Task!
    updateProjectLink(projectid: String!, link: String!): Project!
    updateProjectDescription(projectid: String!, description: String): Project!
    updateProjectStatus(projectid: String!, status: String): Project!
    updateUserRole(userid: String!, role: String): User!
    updateUserContactNo(userid: String!, contactNo: Int): User!
    removeProject(projectid: String!): Project
    removeAttendee(attendeeid: String!): Attend!
    removeEvent(eventid: String!): Event
    removeTask(taskId: String): Task
  }
`;