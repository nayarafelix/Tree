import React, {useState} from 'react';

import Add from '@mui/icons-material/Add';
import { Container, AddCircle, BoxButtons } from './Tree.styles';

import InitialTree from '../../modals/InitialTree';
import Node from '../../molecules/Node';
import { NodeProps } from "./Tree.types";
import DropZone from "../../atoms/DropZone";

import { treeClean, treeModel } from './Tree.mock'
import Button from "@mui/material/Button";

const Tree: React.FC = () => {
    const [tree, setTree] = useState<NodeProps>(treeClean);
    const [ dragOver, setDragOver ] = React.useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const setTreeModal = () => setTree(treeModel)
    const setTreeClean = () => setTree(treeClean)

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        setDragOver(false);
        const droppedNodeId = event.dataTransfer.getData('text');
        const parentNodeId = event.currentTarget.id;

        const newTree = { ...tree };

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

            if (parentNode.id.join('.') === '0') return ["1"]

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
            <InitialTree handleModel={ setTreeModal } handleClean={ setTreeClean }/>

            <BoxButtons>
                <Button variant='contained' onClick={ setTreeClean }>Reiniciar</Button>
            </BoxButtons>

            <Node id="welcome" label="Welcome" level={'0'} isBlocked>
                {renderTreeNodes(tree.children, tree.level)}
                <DropZone id={tree.level} dragOver={dragOver} enableDropping={enableDropping} handleDrop={handleDrop} handleDragOverStart={handleDragOverStart} handleDragOverEnd={handleDragOverEnd} />
                <AddCircle onClick={() => { addNode(tree.level) }} ><Add/></AddCircle>
            </Node>
        </Container>
    );
};

export default Tree;
