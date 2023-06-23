import React from "react";

export interface NodeWrapperProps {
    isBlocked?: boolean;
    isDraggedOver?: boolean
}

export interface NodeProps {
    id: string;
    level: string;
    label: string;
    isBlocked?: boolean;
    children?: React.ReactNode;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: () => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
    isHighlighted?: boolean;
}

export interface DndProps {
    isHighlighted?: boolean;
}