"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "@/styles/project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

interface Project {
  title: string;
  description: string;
  githubLink: string;
  projectLead: string;
  projectMembers: string[];
  private: boolean;
}

const ProjectItem = ({ title, description, githubLink }: Project) => {
  return (
    <Link href={githubLink}>
      <div className={styles.projectItem}>
        <div className={styles.itemHeader}>
          <FontAwesomeIcon icon={faFolder} className={styles.folderIcon} />
          <FontAwesomeIcon
            className={styles.folderIcon}
            icon={faArrowUpRightFromSquare}
          />
        </div>
        <h2 className={styles.projectHeading}>{title}</h2>
        <p className={styles.projectDescription}>{description}</p>
      </div>
    </Link>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    githubLink: "",
    projectLead: "",
    projectMembers: [],
    private: false,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProjects([...projects, newProject]);
    setNewProject({
      title: "",
      description: "",
      githubLink: "",
      projectLead: "",
      projectMembers: [],
      private: false,
    });
    setShowForm(false);
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, selectedOptions } = event.target as HTMLSelectElement;

    const checked = (event.target as HTMLInputElement).checked;

    if (name === "projectMembers") {
      setNewProject((prevProject) => ({
        ...prevProject,
        [name]: Array.from(selectedOptions, (option) => option.value),
      }));
    } else if (name === "private") {
      setNewProject((prevProject) => ({
        ...prevProject,
        [name]: checked,
      }));
    } else {
      setNewProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    }
  };
  const prisma = new PrismaClient();
  const [users, setUsers] = useState<
    {
      registration_number: string;
      name: string;
      email: string;
      phone_number: string;
      department: string;
      github: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data));
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers);
        console.log("Fetched users:", fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PROJECTS</h1>
      <div className={styles.projectContainer}>
        {projects.map((project) => (
          <ProjectItem key={project.title} {...project} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => setShowForm(!showForm)}
        >
          +
        </button>
        {showForm && (
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <label>
                Project Title:
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Link:
                <input
                  type="text"
                  name="githubLink"
                  value={newProject.githubLink}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Project Lead:
                <select
                  name="projectLead"
                  value={newProject.projectLead}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a lead</option>
                  {users.map((user) => (
                    <option
                      key={user.registration_number}
                      value={user.registration_number}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>{" "}
              <label>
                Project Members:
                <select
                  name="projectMembers"
                  value={newProject.projectMembers}
                  onChange={handleChange}
                  multiple
                >
                  <option value="member1">Member 1</option>
                  <option value="member2">Member 2</option>
                </select>
              </label>
              <label>
                Private:
                <input
                  type="checkbox"
                  name="private"
                  checked={newProject.private}
                  onChange={handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
