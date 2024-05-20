import React, { useEffect } from "react";
import { Card } from "antd";
import styles from "./task-card.module.scss";

const TaskCard = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [completed, setCompleted] = React.useState(task.completed);
  const [taskText, setTaskText] = React.useState(task.name);

  useEffect(() => {
    setCompleted(task.completed);
    setTaskText(task.name);
  }, [task]);

  const onCompletedChange = () => {
    // onUpdate({ ...task, completed: !completed });
    setCompleted(!completed);
  };

  return (
    <Card key={task.id}>
      <div className={styles.wrapper}>
        <div>{task.name}</div>
        {/*<div>*/}
        {/*  <input*/}
        {/*    type="checkbox"*/}
        {/*    checked={completed}*/}
        {/*    onChange={onCompletedChange}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </Card>
  );
};

export default TaskCard;
