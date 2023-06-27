import styled from "styled-components";
import Box from "@mui/material/Box";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
`;

export const BoxButtons = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-bottom: 20px;
`;