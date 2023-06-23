import React from 'react'
import { Area } from './DropZone.styles'
import {DropZoneProps} from "./DropZone.types";

const DropZone: React.FC<DropZoneProps> = ({ dragOver, enableDropping, handleDrop, handleDragOverStart, handleDragOverEnd }) => {
    return (
        <Area
            onDragOver={enableDropping}
            onDrop={handleDrop}
            onDragEnter={handleDragOverStart}
            onDragLeave={handleDragOverEnd}
            style={ dragOver ? { opacity: '1', fontWeight: 'bold'} : { opacity: '0' } }
        >
            Drop Zone
        </Area>
    )
}

export default DropZone;