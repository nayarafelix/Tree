import React from 'react';
import Add from "@mui/icons-material/Add";
import { BtnAdd } from './AddCircle.styles';

interface AddCircleProps {
    onclick: () => any
}

const AddCircle = ({onclick}: AddCircleProps) => {
    return (
        <BtnAdd onClick={onclick} ><Add/></BtnAdd>
    )
}

export default AddCircle