import styled from "styled-components";

interface AreaProps {
    dragOver: boolean;
    hasChildren: boolean;
}

export const Area = styled.div<AreaProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  color: #CCCCCC;
  background-color: #F2F2F2;
  width: 60px;
  height: 60px;
  border: 1px dashed #CCCCCC;
  ${({ hasChildren }) => hasChildren && `margin-bottom: 18px;`}
  ${({ hasChildren }) => !hasChildren && `margin-right: 24px;`}
`;