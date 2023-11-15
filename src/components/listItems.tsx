import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import hiddenBoxIcon from "../assets/hiddenBoxIcon.png";
import doneBoxIcon from "../assets/doneBoxIcon.png";
import addBoxIcon from "../assets/addBoxIcon.png";
import AddItemModal from "./addItemModal";

type ItemProps = {
  name: string;
  description: string;
  status: string;
};

type ListItemsProps = {
  checklistIndex: number;
  items: ItemProps[];
  updateItemStatus: Function;
  addItemToChecklist: Function;
};

function ListItems({
  checklistIndex,
  items,
  updateItemStatus,
  addItemToChecklist,
}: ListItemsProps) {
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(!showModal);
  }

  const handleToggle = async (itemName: string) => {
    const index = items.findIndex((item) => item.name === itemName);
    const itemStatus =
      items[index].status === "in progress" ? "completed" : "in progress";

    updateItemStatus(checklistIndex, index, itemStatus);
  };

  return (
    <Box>
      {items.map((item) => (
        <Box key={item.name}>
          <ListItemButton sx={{ paddingBlock: 0, marginBlock: 0 }}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                icon={<img src={hiddenBoxIcon} alt="hiddenBox" />}
                checkedIcon={<img src={doneBoxIcon} alt="doneBox" />}
                checked={item.status === "completed" || false}
                onClick={() => handleToggle(item.name)}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color={"#0C0D0D"} fontSize={"16px"}>
                  {item.name}
                </Typography>
              }
              secondary={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CircleIcon
                    style={{
                      color:
                        item.status === "completed" ? "#58E766" : "#FFBE3F",
                      fontSize: "12px",
                      marginRight: "6px",
                    }}
                  />
                  <Typography color={"#CFCFCF"} fontSize={"12px"}>
                    {item.description}
                  </Typography>
                </div>
              }
            />
          </ListItemButton>
        </Box>
      ))}
      <ListItemButton
        onClick={handleShowModal}
        sx={{ borderTop: "1px solid #D3D3D3" }}
      >
        <ListItemIcon>
          <img src={addBoxIcon} alt="addBox" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography color={"#2B87E3"} fontSize={"16px"} fontWeight={500}>
              ADD NEW ITEM
            </Typography>
          }
        />
      </ListItemButton>
      <AddItemModal
        open={showModal}
        onClose={handleShowModal}
        checklistIndex={checklistIndex}
        addItemToChecklist={addItemToChecklist}
      />
    </Box>
  );
}

export default ListItems;
