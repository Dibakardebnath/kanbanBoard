import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import SubjectIcon from "@mui/icons-material/Subject";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;

  min-height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icons = styled.div`
 
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding: 2px 5px;
`;
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomColorFromStorage = () => {
  const storedColor = localStorage.getItem('randomColor');
  return storedColor || generateRandomColor();
};

export default function Card({ task, index }) {

  const [randomColor, setRandomColor] = useState(getRandomColorFromStorage);

  useEffect(() => {
    localStorage.setItem('randomColor', randomColor);
  }, [randomColor]);

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div
            style={{ display: "flex", justifyContent: "start", padding: 2 }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
          //  border:"1px solid",
              textAlign: "left",
              marginBottom:"5px ",
              width:"max-content",
              marginLeft:"8px"
              // padding: "2px 8px",
            }}
          >
            <hr
              style={{
                // border: "1px solid",
                backgroundColor: generateRandomColor(),
                height: "1.2vh",
                width: "2.8rem",
                borderRadius: "5px",
                marginLeft:"1px"
                
              }}
            />
            <TextContent>{task.title}</TextContent>
          </div>
          <Icons>
            <SubjectIcon />
            {task.like.length === 0 ? (
              ""
            ) : (
              <div
                style={{ 
                 
                  height:"3vh",
                  display: "flex",
                 alignItems: "center",
                  gap: "5px" }}
              >
                <ChatBubbleOutlineIcon />
                <p>{task.like}</p>
              </div>
            )}
          </Icons>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
