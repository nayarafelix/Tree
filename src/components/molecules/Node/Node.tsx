import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DeleteIcon from '@mui/icons-material/Delete';

import { NodeProps } from './Node.types';
import { NodeContainer, NodeBox, NodeWrapper, Circle } from './Node.styles';

const Node: React.FC<NodeProps> = (
{
    id,
    level,
    label,
    isBlocked,
    onRemove,
    children,
}) => {
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

    const hasChildren = React.Children.toArray(children).length > 2;

    return (
        <>
            <NodeWrapper isBlocked={isBlocked} id={id} draggable="true" onDragStart={handleDragStart}>
                <NodeBox>
                    <Tooltip title={label} placement="right">
                        <Circle color={generateColor(level, isBlocked)}>{level === '0' ? 'START' : label}</Circle>
                    </Tooltip>

                    <Tooltip title="Remover" placement="right">
                        <DeleteIcon onClick={onRemove} sx={{ color: 'gray', cursor: 'pointer' }} />
                    </Tooltip>

                    {!isExpanded ? (
                        <Tooltip title="Expandir" placement="right">
                            <ArrowCircleRightIcon onClick={handleToggle} sx={{ color: 'gray', cursor: 'pointer' }} />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Recolher" placement="right">
                            <ArrowDropDownCircleIcon onClick={handleToggle} sx={{ color: 'gray', cursor: 'pointer' }} />
                        </Tooltip>
                    )}
                </NodeBox>

                {isExpanded && (
                    <NodeContainer hasChildren={hasChildren}>
                        {React.Children.map(children, (child) =>
                            React.isValidElement(child) ? React.cloneElement(child) : child
                        )}
                    </NodeContainer>
                )}
            </NodeWrapper>
        </>
    );
};

export default Node;
