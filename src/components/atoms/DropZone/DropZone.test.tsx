import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropZone from './DropZone';

describe('DropZone', () => {
    it('should call the enableDropping function when dragged over', () => {
        const enableDroppingMock = jest.fn();
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <DropZone
                id="drop-zone"
                dragOver={false}
                hasChildren={false}
                enableDropping={enableDroppingMock}
                handleDrop={() => {}}
                handleDragOverStart={() => {}}
                handleDragOverEnd={() => {}}
            />
        );
        const dropZone = getByTestId('drop-zone');
        fireEvent.dragOver(dropZone);
        expect(enableDroppingMock).toHaveBeenCalledTimes(1);
    });

    it('should call the handleDrop function when dropped', () => {
        const handleDropMock = jest.fn();
        const { getByTestId } = render(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            <DropZone
                id="drop-zone"
                dragOver={false}
                hasChildren={false}
                enableDropping={() => {}}
                handleDrop={handleDropMock}
                handleDragOverStart={() => {}}
                handleDragOverEnd={() => {}}
            />
        );
        const dropZone = getByTestId('drop-zone');
        fireEvent.drop(dropZone);
        expect(handleDropMock).toHaveBeenCalledTimes(1);
    });
});
