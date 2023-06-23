export interface NodeProps {
    id: string[];
    level: string;
    label: string;
    locked?: boolean;
    children?: NodeProps[];
}