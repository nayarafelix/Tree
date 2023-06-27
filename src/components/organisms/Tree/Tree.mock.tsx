import {NodeProps} from "./Tree.types";

export const treeClean: NodeProps = {
    id: ['0'],
    level: '0',
    label: 'start',
    children: []
};

export const treeModel: NodeProps = {
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