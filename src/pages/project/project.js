import React, { useEffect } from "react";
import styles from "./project.module.scss";
import { Breadcrumb } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../app";
import {
  addTaskToProject,
  editProjectTask,
  getProjectById,
  getTasksByProjectId,
  removeTaskFromProject,
} from "../../api/projects";
import AddNewItem from "../../components/add-new-project/add-new-item";
import TaskCard from "../../components/task-card/task-card";

const Project = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = React.useState({});
  const [tasks, setTasks] = React.useState([]);

  const fetchProject = async () => {
    const newProject = await getProjectById(projectId);
    setProject(newProject);
  };

  const breadcrumbItems = [
    {
      title: "Projects",
      onClick: () => navigate(routes.projects),
    },
    {
      title: `Project ${project?.name || projectId}`,
    },
  ];

  const onAddTask = async ({ name }) => {
    const UpdatedTasks = await addTaskToProject({
      projectId,
      task: { name },
    });
    setTasks(UpdatedTasks);
  };

  const onUpdateTask = async (task) => {
    const newTasks = await editProjectTask({
      projectId,
      task: { ...task },
    });
    setTasks(newTasks);
  };

  const onRemoveTask = async ({ id }) => {
    const newTasks = await removeTaskFromProject({ projectId, taskId: id });
    setTasks(newTasks);
  };
  const fetchProjectTasks = async () => {
    const newTasks = await getTasksByProjectId(projectId);
    setTasks(newTasks);
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchProjectTasks();
    }
  }, [projectId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className={styles.addTask}>
        <AddNewItem title={"Add new task"} onSubmit={onAddTask} />
      </div>
      <div className={styles.content}>
        <h1>Project {project?.name}</h1>
      </div>
      <div className={styles.taskslist}>
        {tasks
          ?.sort((a, b) => b.created_at - a.created_at)
          ?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onRemove={onRemoveTask}
              onUpdate={onUpdateTask}
            />
          ))}
      </div>
    </div>
  );
};

export default Project;
