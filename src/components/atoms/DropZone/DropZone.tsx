import React from 'react'
import { Area } from './DropZone.styles'
import {DropZoneProps} from "./DropZone.types";

const DropZone: React.FC<DropZoneProps> = ({ id, dragOver, enableDropping, handleDrop, handleDragOverStart, handleDragOverEnd }) => {
    return (
        <Area
            id={id}
            onDragOver={enableDropping}
            onDrop={handleDrop}
            onDragEnter={handleDragOverStart}
            onDragLeave={handleDragOverEnd}
            style={ dragOver ? { opacity: '1', fontWeight: 'bold'} : { opacity: '0' } }
        >
            Soltar aqui
        </Area>
    )
}

export default DropZone;