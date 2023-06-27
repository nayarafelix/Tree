import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Node from './Node';

describe('Node', () => {
    const mockProps = {
        id: 'node-id',
        level: '1',
        label: 'Node Label',
        isBlocked: false,
        onRemove: jest.fn(),
        children: null,
    };

    it('should call onRemove when the delete button is clicked', () => {
        const { getByTitle } = render(<Node {...mockProps} />);
        const deleteButton = getByTitle('Remover');
        fireEvent.click(deleteButton);
        expect(mockProps.onRemove).toHaveBeenCalledTimes(1);
    });

    it('should toggle the expanded state when the expand/collapse button is clicked', () => {
        const { getByText } = render(<Node {...mockProps} />);
        const expandCollapseButton = getByText('Recolher');
        fireEvent.click(expandCollapseButton);
        expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
    });
});
