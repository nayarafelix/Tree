import React, {useState} from 'react';

import Button from "@mui/material/Button";
import { Container, BoxButtons } from './Tree.styles';

import InitialTree from '../../modals/InitialTree';
import Node from '../../molecules/Node';
import AddCircle from "../../atoms/AddCircle";
import DropZone from "../../atoms/DropZone";
import { TreeNode, NodeArrayProps } from "../../molecules/Node/Node.types";

import { treeClean, treeModel } from './Tree.mock'

import removeNode from '../../../utils/removeNode'
import addNode from "../../../utils/addNode";
import findNode from "../../../utils/findNode";

const Tree: React.FC = () => {
    const [tree, setTree] = useState<TreeNode>(treeClean);
    const setTreeModal = () => setTree(treeModel)
    const setTreeClean = () => setTree(treeClean)

    const [ dragOver, setDragOver ] = React.useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const handleDrop = (positionTop: boolean, event: React.DragEvent<HTMLDivElement>) => {
        setDragOver(false);
        const droppedNodeId = event.dataTransfer.getData('text');
        const parentNodeId = event.currentTarget.id;

        const newTree = { ...tree };

        const droppedNode = findNode(newTree, droppedNodeId);
        const parentNode = findNode(newTree, parentNodeId);

        if (droppedNode && parentNode) {
            removeNode(newTree, droppedNodeId);

            if (positionTop) {
                parentNode.children = [droppedNode, ...(parentNode.children || [])];
            } else {
                parentNode.children = [...(parentNode.children || []), droppedNode];
            }
        }

        setTree(newTree);

    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const findParentNode = (node: NodeArrayProps, targetId: string): NodeArrayProps | undefined => {
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

    const handleRemoveNode = (targetId: string) => {
        const newTree = { ...tree };
        removeNode(newTree, targetId);
        setTree(newTree);
    }

    const renderTreeNodes = (nodes: TreeNode[] | undefined, parentId: string) => {
        if (!nodes) return null;

        return nodes.map((node, index) => {
            const hasChildren = !!(node.children && node.children.length > 0);

            return (
                <Node
                    key={node.level}
                    id={node.level}
                    level={node.level}
                    label={node.label}
                    isBlocked={node.isBlocked}
                    onRemove={() => handleRemoveNode(node.level)}
                >
                    {hasChildren && <DropZone
                        id={node.level}
                        hasChildren={hasChildren}
                        dragOver={dragOver}
                        enableDropping={enableDropping}
                        handleDrop={ (event) => handleDrop(true, event)}
                        handleDragOverStart={handleDragOverStart}
                        handleDragOverEnd={handleDragOverEnd}
                     />}

                    {renderTreeNodes(node.children, node.level)}

                    <DropZone
                        id={node.level}
                        hasChildren={hasChildren}
                        dragOver={dragOver}
                        enableDropping={enableDropping}
                        handleDrop={ (event) => handleDrop(false, event)}
                        handleDragOverStart={handleDragOverStart}
                        handleDragOverEnd={handleDragOverEnd}
                    />

                    <AddCircle onclick={ () => addNode(node.level, tree, setTree) }/>

                </Node>
            )
        });
    };

    return (
        <Container>
            <InitialTree handleModel={ setTreeModal } handleClean={ setTreeClean }/>

            <BoxButtons>
                <Button variant='contained' onClick={ () => setTreeClean() }>Limpar</Button>
                <Button variant='contained' onClick={ () => setTreeModal() }>Usar modelo</Button>
            </BoxButtons>

            <Node id="welcome" label="Welcome" level={'0'} isBlocked>

                {tree.children && <DropZone
                    id={tree.level}
                    hasChildren={ tree.children.length > 0 }
                    dragOver={dragOver}
                    enableDropping={enableDropping}
                    handleDrop={ (event) => handleDrop(true, event)}
                    handleDragOverStart={handleDragOverStart}
                    handleDragOverEnd={handleDragOverEnd}
                />}

                {renderTreeNodes(tree.children, tree.level)}

                <DropZone
                    id={tree.level}
                    hasChildren={ !!(tree.children && tree.children.length > 0) }
                    dragOver={dragOver}
                    enableDropping={enableDropping}
                    handleDrop={ (event) => handleDrop(false, event)}
                    handleDragOverStart={handleDragOverStart}
                    handleDragOverEnd={handleDragOverEnd}
                />

                <AddCircle onclick={ () => addNode(tree.level, tree, setTree) }/>

            </Node>
        </Container>
    );
};

export default Tree;
