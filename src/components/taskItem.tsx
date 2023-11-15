import { useRxCollection } from "rxdb-hooks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckList from "./checkList";

type ItemProps = {
  name: string;
  description: string;
  status: string;
};

type TaskItemProps = {
  id: string;
  name: string;
  description: string;
  status: string;
  checklists: {
    name: string;
    description: string;
    status: string;
    items: ItemProps[];
  }[];
};

function TaskItem({
  id,
  name,
  description,
  status,
  checklists,
}: TaskItemProps) {
  const collection = useRxCollection("characters");

  async function updateItemStatus(
    checklistIndex: number,
    itemIndex: number,
    itemStatus: string
  ) {
    const task: TaskItemProps = {
      id: id,
      name: name,
      description: description,
      status: status,
      checklists: checklists.map((checklist, i) => {
        if (i === checklistIndex) {
          return {
            ...checklist,
            items: checklist.items.map((item, j) => {
              if (j === itemIndex) {
                return {
                  ...item,
                  status: itemStatus,
                };
              }
              return item;
            }),
          };
        }
        return checklist;
      }),
    };

    await collection?.upsert(task);
  }

  async function addItemToChecklist(
    checklistIndex: number,
    newItem: ItemProps
  ) {
    const task: TaskItemProps = {
      id: id,
      name: name,
      description: description,
      status: status,
      checklists: checklists.map((checklist, i) => {
        if (i === checklistIndex) {
          return {
            ...checklist,
            items: [...checklist.items, newItem],
          };
        }
        return checklist;
      }),
    };

    await collection?.upsert(task);
  }

  async function deleteTask() {
    await collection?.findOne(id)?.remove();
  }

  return (
    <Box sx={{ border: "1px solid #D3D3D3" }}>
      <Box
        sx={{
          textAlign: "left",
          paddingInline: "20px",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Typography
            variant="h3"
            gutterBottom
            fontSize={"20px"}
            fontWeight={600}
            color={"#0C0D0D"}
          >
            {name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CircleIcon
              style={{
                color: status === "completed" ? "#FF5252" : "#FFBE3F",
                fontSize: "12px",
                marginRight: "6px",
              }}
            />
            <Typography color={"#F90000"} fontSize={"12px"}>
              {description}
            </Typography>
          </div>
        </div>
        <DeleteForeverIcon
          style={{ cursor: "pointer", color: "#F90000" }}
          onClick={deleteTask}
        />
      </Box>
      <CheckList
        checklists={checklists}
        updateItemStatus={updateItemStatus}
        addItemToChecklist={addItemToChecklist}
      />
    </Box>
  );
}

export default TaskItem;
