import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemModalProps = {
  open: boolean;
  onClose: () => void;
  checklistIndex: number;
  addItemToChecklist: Function;
};

const AddItemModal: React.FC<AddItemModalProps> = ({
  open,
  onClose,
  checklistIndex,
  addItemToChecklist,
}) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    status: "in progress",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    addItemToChecklist(checklistIndex, newItem);
    onClose();
    setNewItem({
      name: "",
      description: "",
      status: "in progress",
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddItem} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemModal;
