export interface DropZoneProps {
    id: string;
    dragOver: boolean;
    enableDropping: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOverStart: () => void;
    handleDragOverEnd: () => void;
}