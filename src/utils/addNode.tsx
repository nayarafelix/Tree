import findNode from "./findNode";
import {NodeProps} from "../components/organisms/Tree/Tree.types";
import type { TreeNode, SetTreeFunction } from '../components/molecules/Node/Node.types';

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

const addNode = (parentId: string, tree: TreeNode, setTree: SetTreeFunction) => {
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

export default addNode