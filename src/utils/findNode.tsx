import {NodeProps} from "../components/organisms/Tree/Tree.types";

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

export default findNode