"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/project.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// Define the ProjectItem component
const ProjectItem = ({
  title,
  description,
  githubLink,
}: {
  title: string;
  description: string;
  githubLink: string;
}) => {
  return (
    <>
      <Link className={styles.link} href={githubLink}>
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
    </>
  );
};

// Define the Projects component
function Projects() {
  const [projects, setProjects] = useState<{ title: string }[]>([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>PROJECTS</h1>
        <div className={styles.projectContainer}>
          {projects.map((project) => (
            <ProjectItem
              description={""}
              githubLink={""}
              key={project.title}
              {...project}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Projects;
