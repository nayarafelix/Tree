import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import { BoxModal, BoxButtons } from './initialTree.styles'
import { InitialTreeProps } from './initialTree.types';

const InitialTree: React.FC<InitialTreeProps> = ({ handleClean, handleModel }) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxModal>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deseja iniciar a árvore zerada ou a partir de um modelo?
                    </Typography>
                    <BoxButtons>
                        <Button variant='contained' onClick={ () => { handleClean(); handleClose() } }>Vazia</Button>
                        <Button variant='contained' onClick={ () => { handleModel(); handleClose() } }>Modelo</Button>
                    </BoxButtons>
                </BoxModal>
            </Modal>
        </div>
    );
}

export default InitialTree