import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddCircle from './AddCircle';

describe('AddCircle', () => {
    it('should call the onClick function when clicked', () => {
        const onClickMock = jest.fn();
        const { getByTestId } = render(<AddCircle onclick={onClickMock} />);
        const addButton = getByTestId('add-button');
        fireEvent.click(addButton);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
