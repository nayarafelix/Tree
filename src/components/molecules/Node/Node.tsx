import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { NodeProps } from './Node.types';
import { NodeContainer, NodeWrapper, Circle } from './Node.styles';

const Node: React.FC<NodeProps> = ({ id, level, label, isBlocked, children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.dataTransfer.setData('text', event.currentTarget.id);
    }

    const handleToggle = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
    };

    const generateColor = (level: string, isBlocked: boolean | undefined) => {
        const hue = (parseInt(level) * 30) % 360;
        return isBlocked ? '#0062cc' : `hsl(${hue}, 70%, 50%)`;
    };

    return (
        <NodeWrapper isBlocked={isBlocked} id={id} draggable="true" onDragStart={handleDragStart}>
            <Tooltip title={label} placement="right">
                <Circle color={generateColor(level, isBlocked)}>{level === '0' ? 'START' : label}</Circle>
            </Tooltip>

            {!isExpanded && (
                <Tooltip title="Expandir" placement="right">
                    <ArrowCircleRightIcon
                        onClick={handleToggle}
                        sx={{ color: 'gray', cursor: 'pointer' }}
                    />
                </Tooltip>
            )}
            {isExpanded && (
                <Tooltip title="Recolher" placement="right">
                    <ArrowDropDownCircleIcon
                        onClick={handleToggle}
                        sx={{ color: 'gray', cursor: 'pointer' }}
                    />
                </Tooltip>
            )}
            {isExpanded && (
                <NodeContainer>
                    {React.Children.map(children, (child) =>
                        React.isValidElement(child) ? React.cloneElement(child) : child
                    )}
                </NodeContainer>
            )}
        </NodeWrapper>
    );
};

export default Node;
