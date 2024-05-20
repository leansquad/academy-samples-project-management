import React from "react";
import { Button, Flex, Input } from "antd";

const AddNewItem = ({ onSubmit, title }) => {
  const [projectName, setProjectName] = React.useState("");

  const handleSubmit = () => {
    onSubmit({ name: projectName });
    setProjectName("");
  };

  return (
    <Flex justify={"space-between"} align={"center"}>
      {title}:{" "}
      <Input
        style={{ width: "300px" }}
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Button
        disabled={!projectName?.length}
        type="primary"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </Flex>
  );
};

export default AddNewItem;
