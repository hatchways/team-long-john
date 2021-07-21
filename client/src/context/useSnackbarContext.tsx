import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback } from 'react';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';

interface ISnackBarContext {
  updateSnackBarMessage: (message: string) => void;
}

export const SnackBarContext = createContext<ISnackBarContext>({
  updateSnackBarMessage: () => null,
});

export const SnackBarProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const updateSnackBarMessage = useCallback((message: string) => {
    setMessage(message);
    setOpen(true);
  }, []);

  const snackbarHandleClose = useCallback((event: SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }, []);

  return (
    <SnackBarContext.Provider value={{ updateSnackBarMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        message={message}
      />
    </SnackBarContext.Provider>
  );
};

export function useSnackBar(): ISnackBarContext {
  return useContext(SnackBarContext);
}
