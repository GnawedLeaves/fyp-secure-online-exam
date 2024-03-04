import React, { useEffect, useState } from "react";
import {
  BubbleAddContainer,
  BubbleAddBubblesContainer,
  BubbleAddBubble,
  BubbleAddIconContainer,
} from "./BubbleAddStyles";
import {
  AdminModuleField,
  AdminModuleFieldContainer,
  AdminModuleFieldTitle,
} from "../../pages/admin/AdminPagesStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { RxCross2 } from "react-icons/rx";
// PROPS:
// 1. handleBubbleData: The component will return data on what is added, handle this in parent component
//2. Title
//3. Width: This will set the width of the compoenent
const BubbleAdd = (props) => {
  const [newData, setNewData] = useState("");
  const [allData, setAllData] = useState([]);

  const handleFieldKeyDown = (e) => {
    if (e.key === "Enter" && newData !== "") {
      handleAddNewData();
    }
  };

  const handleRemoveBubble = (index) => {
    if (allData.length === 1) {
      setAllData([]);
    } else {
      const temp = [...allData.slice(0, index), ...allData.slice(index + 1)];
      setAllData(temp);
    }
  };

  const handleAddNewData = () => {
    setAllData([newData, ...allData]);
    setNewData("");
  };

  useEffect(() => {
    props.handleBubbleData(allData);
  }, [allData]);
  return (
    <ThemeProvider theme={theme}>
      <BubbleAddContainer>
        <AdminModuleFieldContainer>
          <AdminModuleFieldTitle>
            {props.title ? props.title : "New Item"}
          </AdminModuleFieldTitle>
          <AdminModuleField
            onKeyDown={handleFieldKeyDown}
            value={newData}
            onChange={(e) => {
              setNewData(e.target.value);
            }}
          />
        </AdminModuleFieldContainer>
        <BubbleAddBubblesContainer>
          {allData?.map((data, index) => {
            return (
              <BubbleAddBubble key={index} newItem={index === 0}>
                {index}
                {data}
                <BubbleAddIconContainer
                  onClick={() => {
                    handleRemoveBubble(index);
                  }}
                >
                  <RxCross2 />
                </BubbleAddIconContainer>
              </BubbleAddBubble>
            );
          })}
        </BubbleAddBubblesContainer>
      </BubbleAddContainer>
    </ThemeProvider>
  );
};

export default BubbleAdd;
