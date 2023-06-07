import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  regNo: String!
  userName: String!
  contactNo: Int!
  role: String
  createdBy: User!
  assignedTasks: [Task!]!
}

type Task {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  contactNo: Int!
  createdBy: User!
  assignedTo: Project!
}

type Project {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  status: String
  contactNo: Int!
  role: String
}

type Event {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  startsAt: DateTime!
  venue: String!
  attendees: [User!]!
}

type WorkOn {
  user: User!
  task: Task!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Attend {
  user: User!
  event: Event!
  createdAt: DateTime!
  updatedAt: DateTime!
}

scalar DateTime

type Query {
  users: [User!]!
  user(id: Int!): User
  tasks: [Task!]!
  task(id: Int!): Task
  projects: [Project!]!
  project(id: Int!): Project
  events: [Event!]!
  event(id: Int!): Event
}

type Mutation {
  createUser(regNo: String!, userName: String!, contactNo: Int!, role: String): User!
  createTask(description: String!, contactNo: Int!, userID: Int!, projectId: Int!): Task!
  createProject(title: String!, status: String, contactNo: Int!, role: String): Project!
  createEvent(name: String!, startsAt: DateTime!, venue: String!): Event!
  assignTaskToUser(userID: Int!, taskID: Int!): WorkOn!
  attendEvent(userID: Int!, eventID: Int!): Attend!
}

schema {
  query: Query
  mutation: Mutation
}
`
