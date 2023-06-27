import {NodeProps} from "../components/organisms/Tree/Tree.types";

import findNodeIndex from './findNodeIndex'

const removeNode = (node: NodeProps, targetId: string) => {

    const index = findNodeIndex(node, targetId);

    if (node.children) {

        if (index > -1) {
            node.children.splice(index, 1);
            return;
        }
        for (const child of node.children) {
            removeNode(child, targetId);
        }
    }
};

export default removeNode