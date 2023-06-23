import styled from 'styled-components';
import { NodeWrapperProps, DndProps } from './Node.types';

export const NodeWrapper = styled.div<NodeWrapperProps>`
  display: flex;
  //align-items: flex-start;
  align-items: center;
  margin-bottom: 8px;
  cursor: ${({ isBlocked }) => (isBlocked ? 'not-allowed' : 'move')};
  opacity: 1;
  transition: all 0.3s ease;
  border: ${({ isDraggedOver }) => (isDraggedOver ? '2px dashed green' : 'none')};
`;

export const NodeContainer = styled.div<DndProps>`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  background-color: ${({ isHighlighted }) => (isHighlighted ? 'rgba(0, 0, 255, 0.2)' : 'initial')};
`;

export const Circle = styled.div<NodeWrapperProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ isBlocked }) => (isBlocked ? '#0062cc' : '#007bff')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-family: sans-serif;
  font-size: 10px;
  text-align: center;
`;