import { Box, Container, Button } from "@mui/material";
import { useState } from "react";
import { useRxCollection, useRxQuery } from "rxdb-hooks";
import AddTaskModal from "./addTaskModal";
import TaskItem from "./taskItem";

function TaskList() {
  const [open, setOpen] = useState<boolean>(false);
  const collection = useRxCollection("characters");
  const query = collection?.find();
  const { result } = useRxQuery(query);

  function handleTaskModal() {
    setOpen(!open);
  }

  return (
    <div className="App">
      <Button
        variant="contained"
        onClick={handleTaskModal}
        sx={{ marginBottom: "20px" }}
      >
        Add Task
      </Button>
      <AddTaskModal open={open} onClose={handleTaskModal} />
      <div>
        {result.map((task) => (
          <div key={task.get("id")}>
            <Container sx={{ minWidth: "466px" }} maxWidth="lg">
              <Box
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  height: "100vh",
                  fontFamily: "Roboto",
                }}
              >
                <TaskItem
                  id={task.get("id")}
                  name={task.get("name")}
                  description={task.get("description")}
                  status={task.get("status")}
                  checklists={task.get("checklists")}
                />
              </Box>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
