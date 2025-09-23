import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DeleteModelProps {
  show: boolean;
  handleClose?: () => void;
  apiCall: () => void;
  message?: string;
  tittle?: string;
}

const DeleteEntityModal = ({ show, handleClose, apiCall, message, tittle }: DeleteModelProps) => {
  const handleDeleteShow = () => {
    apiCall();
    handleClose?.();
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={handleClose}
        maxWidth="sm"
        sx={{ '.MuiDialog-paper': { width: '600px' } }}
      >
        <DialogTitle style={{ backgroundColor: '#F5734E' }}>{tittle || 'Eliminar registro'}</DialogTitle>

        <DialogContent style={{ marginTop: '30px' }}>
          {message || '¿Esta seguro que quiere eliminar este registro?'}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color="error" onClick={() => handleDeleteShow()}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteEntityModal;
