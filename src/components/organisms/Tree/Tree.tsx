import React, {useState} from 'react';

import Add from '@mui/icons-material/Add';
import { Container, AddCircle } from './Tree.styles'

import Node from '../../molecules/Node'
import { NodeProps } from "./Tree.types";
import DropZone from "../../atoms/DropZone";

const initialTree: NodeProps = {
    id: ['0'],
    level: '0',
    label: 'start',
    children: [
        {
            id: ['1'],
            level: '1',
            label: 'Node 1',
            children: [
                {
                    id: ['1', '1'],
                    level: '1.1',
                    label: 'Node 1.1',
                    children: [
                        {
                            id: ['1', '1', '1'],
                            level: '1.1.1',
                            label: 'Node 1.1.1',
                            children: []
                        },
                        {
                            id: ['1', '1', '2'],
                            level: '1.1.2',
                            label: 'Node 1.1.2',
                            children: []
                        }
                    ]
                },
                {
                    id: ['1', '2'],
                    level: '1.2',
                    label: 'Node 1.2',
                    children: []
                },
                {
                    id: ['1', '3'],
                    level: '1.3',
                    label: 'Node 1.3',
                    children: []
                }
            ]
        },
        {
            id: ['2'],
            level: '2',
            label: 'Node 2',
            children: [
                {
                    id: ['2', '1'],
                    level: '2.1',
                    label: 'Node 2.1',
                    children: []
                }
            ]
        }
    ]
};

const Tree: React.FC = () => {
    const [tree, setTree] = useState<NodeProps>(initialTree);
    const [ dragOver, setDragOver ] = React.useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        setDragOver(false);
        const droppedNodeId = event.dataTransfer.getData('text');
        const parentNodeId = event.currentTarget.id;

        const newTree = { ...tree };

        console.log(droppedNodeId);
        console.log(parentNodeId);

        const findNodeIndex = (node: NodeProps, targetId: string): number => {
            if (node.children) {
                return node.children.findIndex(child => child.id.join('.') === targetId);
            }
            return -1;
        };

        const findParentNode = (node: NodeProps, targetId: string): NodeProps | undefined => {
            if (node.id.join('.') === targetId) {
                return node;
            }

            if (node.children) {
                for (const child of node.children) {
                    if (child.id.join('.') === targetId) {
                        return node;
                    }

                    const foundNode = findParentNode(child, targetId);
                    if (foundNode) {
                        return foundNode;
                    }
                }
            }

            return undefined;
        };

        const removeNode = (node: NodeProps, targetId: string) => {
            if (node.children) {
                const index = findNodeIndex(node, targetId);
                if (index > -1) {
                    node.children.splice(index, 1);
                    return;
                }
                for (const child of node.children) {
                    removeNode(child, targetId);
                }
            }
        };

        const droppedNode = findNode(newTree, droppedNodeId);
        const parentNode = findNode(newTree, parentNodeId);

        if (droppedNode && parentNode) {
            removeNode(newTree, droppedNodeId);
            parentNode.children = [...(parentNode.children || []), droppedNode];
        }

        setTree(newTree);

        console.log(tree)
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const findNode = (node: NodeProps, targetId: string): NodeProps | undefined => {
        if (node.id.join('.') === targetId) {
            return node;
        }

        if (node.children) {
            for (const child of node.children) {
                const foundNode = findNode(child, targetId);
                if (foundNode) {
                    return foundNode;
                }
            }
        }

        return undefined;
    };

    const generateNewNodeId = (parentNode: NodeProps): string[] => {
        const children = parentNode.children

        if (!children?.length) {
            return [...parentNode.id, "1"]
        }

        const lastChild = children?.[children?.length - 1];

        const lastChildId = lastChild ? lastChild.id : parentNode.id;

        const newId = [...lastChildId];

        newId[newId.length - 1] = String(Number(newId[newId.length - 1]) + 1);

        return newId;
    };

    const addNode = (parentId: string) => {
        const parentNode = findNode(tree, parentId);

        if (parentNode) {
            const newId = generateNewNodeId(parentNode);

            const newNode: NodeProps = {
                id: newId,
                level: newId.join('.'),
                label: `Node ${newId.join('.')}`,
                children: []
            };

            parentNode.children = [...(parentNode.children || []), newNode];
            setTree({ ...tree });
        }

        console.log(tree)
    };

    const renderTreeNodes = (nodes: NodeProps[] | undefined, parentId: string) => {
        if (!nodes) return null;

        return nodes.map(node => {
            return (
                <Node
                    key={node.level}
                    id={node.level}
                    level={node.level}
                    label={node.label}
                    isBlocked={node.locked}
                    // onRemove={() => removeNode(parentId, node.id)}
                >
                    {renderTreeNodes(node.children, node.level)}
                    <DropZone id={node.level} dragOver={dragOver} enableDropping={enableDropping} handleDrop={handleDrop} handleDragOverStart={handleDragOverStart} handleDragOverEnd={handleDragOverEnd} />
                    <AddCircle onClick={() => { addNode(node.level) }} ><Add/></AddCircle>
                </Node>
            )
        });
    };

    return (
        <Container>
            <Node id="welcome" label="Welcome" level={'0'} isBlocked >
                {renderTreeNodes(tree.children, tree.level)}
                <DropZone id={tree.level} dragOver={dragOver} enableDropping={enableDropping} handleDrop={handleDrop} handleDragOverStart={handleDragOverStart} handleDragOverEnd={handleDragOverEnd} />
                <AddCircle onClick={() => { addNode(tree.level) }} ><Add/></AddCircle>
            </Node>
        </Container>
    );
};

export default Tree;
