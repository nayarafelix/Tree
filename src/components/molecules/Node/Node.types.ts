import React from "react";

export type TreeNode = {
    id: string[];
    level: string;
    label: string;
    isBlocked?: boolean;
    children?: TreeNode[];
};

export type SetTreeFunction = React.Dispatch<React.SetStateAction<TreeNode>>;

export interface NodeWrapperProps {
    id?: string;
    isBlocked?: boolean;
}

export interface NodeContainerProps {
    hasChildren?: boolean;
}

export interface NodeCircleProps {
    color?: string;
}
export interface NodeProps {
    id: string;
    level: string;
    label: string;
    isBlocked?: boolean;
    onRemove?: () => void;
    children?: React.ReactNode;
}

export interface NodeArrayProps {
    id: string[];
    level: string;
    label: string;
    isBlocked?: boolean;
    onRemove?: () => void;
    isLastItem?: boolean;
    children?: NodeArrayProps[];
}