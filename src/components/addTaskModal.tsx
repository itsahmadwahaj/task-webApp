import React, { useState } from "react";
import { useRxCollection } from "rxdb-hooks";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddTaskModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose }) => {
  const [newTask, setNewTask] = useState({
    id: `${Date.now()}`,
    name: "",
    description: "",
    status: "in progress",
    checklists: [
      {
        name: "",
        description: "",
        items: [],
      },
      {
        name: "",
        description: "",
        items: [],
      },
    ],
    createdAt: new Date(),
  });

  const collection = useRxCollection("characters");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checklistIndex?: number,
    field?: string
  ) => {
    const { name, value } = e.target;

    if (checklistIndex !== undefined && field) {
      setNewTask((prevItem) => ({
        ...prevItem,
        checklists: prevItem.checklists.map((checklist, i) =>
          i === checklistIndex ? { ...checklist, [field]: value } : checklist
        ),
      }));
    } else {
      setNewTask((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  async function handleAddTask() {
    const filteredChecklists = newTask.checklists.filter(
      (checklist) => checklist.name.trim() !== ""
    );

    const updatedNewTask = {
      ...newTask,
      id: `${Date.now()}`,
      status: "in progress",
      createdAt: new Date(),
      checklists: filteredChecklists,
    };

    await collection?.insert(updatedNewTask);

    onClose();
    setNewTask({
      id: "",
      name: "",
      description: "",
      status: "",
      checklists: [
        {
          name: "",
          description: "",
          items: [],
        },
        {
          name: "",
          description: "",
          items: [],
        },
      ],
      createdAt: new Date(),
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={newTask.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Checklist 01 Name"
          name="checklistName"
          value={newTask.checklists[0].name}
          onChange={(e) => handleInputChange(e, 0, "name")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Checklist 01 Description"
          name="checklistDescription"
          value={newTask.checklists[0].description}
          onChange={(e) => handleInputChange(e, 0, "description")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Checklist 02 Name"
          name="checklistName"
          value={newTask.checklists[1].name}
          onChange={(e) => handleInputChange(e, 1, "name")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Checklist 02 Description"
          name="checklistDescription"
          value={newTask.checklists[1].description}
          onChange={(e) => handleInputChange(e, 1, "description")}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddTask} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
