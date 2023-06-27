import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tree from './Tree';

describe('Tree', () => {
    it('should render the Tree component', () => {
        const { getByText } = render(<Tree />);
        const treeComponent = getByText('Welcome');
        expect(treeComponent).toBeInTheDocument();
    });

    it('should call setTreeClean when the "Limpar" button is clicked', () => {
        const setTreeClean = jest.fn();
        const { getByText } = render(<Tree setTreeClean={setTreeClean} />);
        const limparButton = getByText('Limpar');
        fireEvent.click(limparButton);
        expect(setTreeClean).toHaveBeenCalledTimes(1);
    });

    it('should call setTreeModal when the "Usar modelo" button is clicked', () => {
        // Arrange
        const setTreeModal = jest.fn();
        const { getByText } = render(<Tree setTreeModal={setTreeModal} />);
        const usarModeloButton = getByText('Usar modelo');
        fireEvent.click(usarModeloButton);
        expect(setTreeModal).toHaveBeenCalledTimes(1);
    });
});
