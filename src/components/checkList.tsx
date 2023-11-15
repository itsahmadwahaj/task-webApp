import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import listIcon from "../assets/list-icon.svg";
import ListItems from "./listItems";

type ItemProps = {
  name: string;
  description: string;
  status: string;
};

type CheckListProps = {
  checklists: {
    name: string;
    description: string;
    status: string;
    items: ItemProps[];
  }[];
  updateItemStatus: Function;
  addItemToChecklist: Function;
};

function CheckList({
  checklists,
  updateItemStatus,
  addItemToChecklist
}: CheckListProps) {
  const [openStates, setOpenStates] = useState(
    Array(checklists.length).fill(true)
  );

  const handleClick = (checklistIndex: number) => {
    setOpenStates(prevOpenStates => {
      const newOpenStates = [...prevOpenStates];
      newOpenStates[checklistIndex] = !newOpenStates[checklistIndex];
      return newOpenStates;
    });
  };

  return (
    <Box>
      {checklists.map((checklist, checklistIndex) => (
        <List key={checklistIndex} sx={{ bgcolor: "background.paper" }}>
          <ListItemButton
            onClick={() => handleClick(checklistIndex)}
            style={{ borderBlock: "1px solid #D3D3D3" }}
          >
            <ListItemText primary={`Checklist ${checklistIndex + 1}`} />
            {openStates[checklistIndex] ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            )}
          </ListItemButton>
          <Collapse
            in={openStates[checklistIndex]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListSubheader
                component="div"
                id={`nested-list-subheader-${checklistIndex}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                  fontWeight: 400
                }}
              >
                <ListItemIcon>
                  <img src={listIcon} alt="hiddenBox" />
                </ListItemIcon>
                <Typography color={"#0C0D0D"} fontSize={"16px"}>
                  {checklist.name}
                </Typography>
                <Typography
                  color={"#8D9196"}
                  fontSize={"12px"}
                  ml="auto"
                  py={2}
                >
                  {checklist.items.length || 0} STEPS
                </Typography>
              </ListSubheader>
              <ListItems
                checklistIndex={checklistIndex}
                items={checklist.items}
                updateItemStatus={updateItemStatus}
                addItemToChecklist={addItemToChecklist}
              />
            </List>
          </Collapse>
        </List>
      ))}
    </Box>
  );
}

export default CheckList;
