import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InitialTree from './initialTree';

describe('InitialTree', () => {
    it('should call handleClean when "Vazia" button is clicked', () => {
        // Arrange
        const handleCleanMock = jest.fn();
        const { getByText } = render(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <InitialTree handleClean={handleCleanMock} handleModel={() => {}} />
        );
        const emptyButton = getByText('Vazia');
        fireEvent.click(emptyButton);
        expect(handleCleanMock).toHaveBeenCalledTimes(1);
    });

    it('should call handleModel when "Modelo" button is clicked', () => {
        const handleModelMock = jest.fn();
        const { getByText } = render(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <InitialTree handleClean={() => {}} handleModel={handleModelMock} />
        );
        const modelButton = getByText('Modelo');
        fireEvent.click(modelButton);
        expect(handleModelMock).toHaveBeenCalledTimes(1);
    });

    it('should close the modal when any button is clicked', () => {
        const handleCloseMock = jest.fn();
        const { getByText } = render(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <InitialTree handleClean={() => {}} handleModel={() => {}} handleClose={handleCloseMock} />
        );
        const emptyButton = getByText('Vazia');
        const modelButton = getByText('Modelo');
        fireEvent.click(emptyButton);
        fireEvent.click(modelButton);
        expect(handleCloseMock).toHaveBeenCalledTimes(2);
    });
});
