import React, { useEffect } from "react";
import { Button, Card, Input } from "antd";
import styles from "./task-card.module.scss";

const TaskCard = ({ task, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [innerTask, setInnerTask] = React.useState({
    name: task?.name || "",
    id: task?.id || "",
    completed: task?.completed || false,
  });

  useEffect(() => {
    setInnerTask({
      name: task.name,
      id: task.id,
      completed: task.completed,
    });
  }, [task]);

  const onCompletedChange = () => {
    setInnerTask({ ...innerTask, completed: !innerTask.completed });
    onUpdate({ ...innerTask, completed: !innerTask.completed });
  };

  const onEdit = (e) => {
    e.stopPropagation();
    if (isEditing) {
      onUpdate(innerTask);
    }
    setIsEditing(!isEditing);
  };
  return (
    <Card key={task.id}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <input
            type="checkbox"
            checked={innerTask.completed}
            onChange={onCompletedChange}
          />
          {isEditing && (
            <Input
              value={innerTask.name}
              onChange={(e) =>
                setInnerTask({ ...innerTask, name: e.target.value })
              }
              onPressEnter={() => {
                onUpdate(innerTask);
                setIsEditing(false);
              }}
            />
          )}
          {!isEditing && (
            <div>
              {innerTask.completed ? (
                <del>{innerTask.name}</del>
              ) : (
                innerTask.name
              )}
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <Button disabled={innerTask?.name?.length === 0} onClick={onEdit}>
            {!isEditing ? "Edit" : "Save"}
          </Button>
          <Button danger onClick={() => onRemove({ id: task.id })}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
