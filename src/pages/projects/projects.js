import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import {
  addProject,
  getProjects,
  removeProject,
  updateProject,
} from "../../api/projects";
import AddNewItem from "../../components/add-new-project/add-new-item";
import styles from "./projects.module.scss";
import ProjectsList from "../../components/projects-list/projects-list";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const onAddNewProject = async ({ name }) => {
    const newProjects = await addProject({ name });
    setProjects(newProjects);
  };

  const fetchProjects = async () => {
    const newProjects = await getProjects(user);
    setProjects(newProjects);
  };

  const onRemoveProject = async ({ id }) => {
    const newProjects = await removeProject({ id });
    setProjects(newProjects);
  };

  const onRenameProject = async ({ id, name }) => {
    const newProjects = await updateProject({ id, name });
    setProjects(newProjects);
  };

  const onCardClick = ({ id }) => {
    navigate(`/projects/${id}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.addProject}>
        <AddNewItem title={"Add new project"} onSubmit={onAddNewProject} />
      </div>
      <div className={styles.projects}>
        <ProjectsList
          projects={projects}
          onRemove={onRemoveProject}
          onSave={onRenameProject}
          onCardClick={onCardClick}
        />
      </div>
    </div>
  );
};

export default Projects;
