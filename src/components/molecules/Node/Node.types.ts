import React from "react";

export interface NodeWrapperProps {
    isBlocked?: boolean;
}

export interface NodeProps {
    id: string;
    level: string;
    label: string;
    isBlocked?: boolean;
    children?: React.ReactNode;
}