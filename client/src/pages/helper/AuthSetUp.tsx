import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function AuthSetUp(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  const url = '/users/me';
  const request = new Request(url, {
    method: 'GET',
    credentials: 'include',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) return res.json();
      else if (res && res.status === 401) updateSnackBarMessage('Req.user is undefined');
    })
    .then((data) => {
      updateLoginContext(data.success);
      if (!data.success.user.username) history.push('initialSettings');
      else history.push('dashboard');
    })
    .catch((error) => updateSnackBarMessage(error.message));

  return <Grid />;
}
