import styled from "styled-components";
import Box from "@mui/material/Box";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
`;

export const AddCircle = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed #CCCCCC;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #F2F2F2;
  }
`;

export const BoxButtons = styled(Box)`
  width: 600px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;