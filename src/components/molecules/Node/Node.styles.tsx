import styled from 'styled-components';
import { NodeWrapperProps, NodeContainerProps, NodeCircleProps} from './Node.types';

export const NodeWrapper = styled.div<NodeWrapperProps>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  cursor: ${({ isBlocked }) => (isBlocked ? 'not-allowed' : 'move')};
  opacity: 1;
  transition: all 0.3s ease;
`;

export const NodeBox = styled.div`
  display: flex;
  align-items: center;
`;

export const NodeContainer = styled.div<NodeContainerProps>`
  display: flex;
  flex-direction: ${({ hasChildren }) => (hasChildren ? 'column' : 'row')};
  align-items: ${({ hasChildren }) => (hasChildren ? 'flex-start' : 'center')};
  margin-left: 24px;
  position: relative;
  
  &.level1 {
    margin-top: -40px;
  }
  
  ${({ hasChildren }) =>
    hasChildren &&
    `
    &::before {
      content: '';
      background: #CCCCCC;
      width: 2px;
      height: 100%;
      position: absolute;
      left: 25px;
      z-index: -1;
    }
  `}
      
`;

export const Circle = styled.div<NodeCircleProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-family: sans-serif;
  font-size: 10px;
  text-align: center;
`;