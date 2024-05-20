import React from "react";
import styles from "./projects-list.module.scss";
import ProjectCard from "../project-card/project-card";

const ProjectsList = ({ projects, onRemove, onSave, onCardClick }) => {
  if (!projects?.length) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      {projects?.length > 0 &&
        projects
          .sort((a, b) => b.created_at - a.created_at)
          .map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onRemove={onRemove}
              onSave={onSave}
              onCardClick={onCardClick}
            />
          ))}
    </div>
  );
};

export default ProjectsList;
