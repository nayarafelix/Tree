import React from 'react';
import Add from "@mui/icons-material/Add";
import { BtnAdd } from './AddCircle.styles';

interface AddCircleProps {
    onclick: () => void
}

const AddCircle = ({onclick}: AddCircleProps) => {
    return (
        <BtnAdd onClick={onclick} data-testid="add-button"><Add/></BtnAdd>
    )
}

export default AddCircle