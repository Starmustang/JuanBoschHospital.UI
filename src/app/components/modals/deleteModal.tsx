import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
