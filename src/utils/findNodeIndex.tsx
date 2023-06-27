import {NodeProps} from "../components/organisms/Tree/Tree.types";

const findNodeIndex = (node: NodeProps, targetId: string): number => {
    if (node.children) {
        return node.children.findIndex(child => child.id.join('.') === targetId);
    }
    return -1;
};

export default findNodeIndex