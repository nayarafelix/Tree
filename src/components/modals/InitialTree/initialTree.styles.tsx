import styled from "styled-components";
import Box from '@mui/material/Box';

export const BoxModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #FFFFFF;
  padding: 30px;
  border-radius: 4px;
  text-align: center;
`;

export const BoxButtons = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;
