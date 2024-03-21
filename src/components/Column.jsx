import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button, Typography, Box, TextField } from "@mui/material";
const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 10px;
  width: 400px;
  height: max-content;
`;

const Title = styled.h3`
  padding: 8px;

  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column({ title, tasks, id, onAddItem }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    inputValue1: "",
    inputValue2: "",
  });
  const handleOpen = () => {
    setOpen(true);
    console.log("Open")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };
  const handleAddButtonClick = () => {
    const newItem = {
      title: inputValue.inputValue1,
      like: inputValue.inputValue2,
      id: `${id}-${Math.random().toString(36).substr(2, 9)}`,
    };
    onAddItem(newItem, id);
    handleClose();
  };

  return (
    <Container className="column">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 10px",
          marginTop: "5px",
        }}
      >
        <Title>{title}</Title>
        <MoreHorizIcon />
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Card key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <div
        style={{
          // border:"1px solid",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          width: "max-content",
          margin: "2px 10px",
        
        }}
        onClick={handleOpen}
      >
        <AddIcon />
        <p>Add a card</p>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            borderRadius: "10px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: "90%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Modal Content
          </Typography>
          <TextField
  label="Project Name"
  name="inputValue1"  // Ensure name prop matches state key
  value={inputValue.inputValue1}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
/>
<TextField
  label="Likes"
  name="inputValue2"  // Ensure name prop matches state key
  value={inputValue.inputValue2}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
/>

          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              backgroundColor: "green",
              margin: "auto 160px",
            }}
            onClick={handleAddButtonClick}
          >
            Add
          </Button>
        </Box>
      </Modal>
     
    </Container>
  );
}
