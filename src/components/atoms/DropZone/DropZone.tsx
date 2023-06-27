import React from 'react'
import { Area } from './DropZone.styles'

interface DropZoneProps {
    id: string;
    dragOver: boolean;
    hasChildren: boolean;
    enableDropping: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOverStart: () => void;
    handleDragOverEnd: () => void;
}

const DropZone: React.FC<DropZoneProps> = ({ id, hasChildren, dragOver, enableDropping, handleDrop, handleDragOverStart, handleDragOverEnd }) => {
    return (
        <Area
            id={id}
            onDragOver={enableDropping}
            onDrop={handleDrop}
            onDragEnter={handleDragOverStart}
            onDragLeave={handleDragOverEnd}
            dragOver={dragOver}
            hasChildren={hasChildren}
        >
            Puxe um item e solte aqui
        </Area>
    )
}

export default DropZone;