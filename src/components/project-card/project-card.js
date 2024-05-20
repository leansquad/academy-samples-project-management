import React, { useEffect } from "react";
import { Button, Card, Input } from "antd";
import styles from "./project-card.module.scss";

const ProjectCard = ({ project, onRemove, onSave, onCardClick }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(project.name);

  useEffect(() => {
    setName(project.name);
  }, [project]);

  const onEdit = (e) => {
    e.stopPropagation();
    if (isEditing) {
      onSave({ name, id: project.id });
    }
    setIsEditing(!isEditing);
  };

  const onRemoveClick = (e) => {
    e.stopPropagation();
    onRemove({ id: project.id });
  };

  return (
    <Card
      key={project.id}
      onClick={() => onCardClick(project)}
      className={styles.card}
    >
      <div className={styles.wrapper}>
        <div>
          {isEditing && (
            <Input
              value={name}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setName(e.target.value)}
              onPressEnter={() => {
                setIsEditing(false);
              }}
            />
          )}
          {!isEditing && <div>{name}</div>}
        </div>
        <div className={styles.buttons}>
          <Button disabled={name?.length === 0} onClick={onEdit}>
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button danger onClick={onRemoveClick}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
