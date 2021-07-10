import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import login from '../../helpers/APICalls/login';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';

export default function AuthSetUp(): JSX.Element {
  const history = useHistory();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const url = '/users/me';
  const request = new Request(url, {
    method: 'GET',
    credentials: 'include',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) {
        return res.json();
      } else if (res && res.status === 401) {
        alert('Req.user is undefined');
      }
    })
    .then((data) => {
      if (data.username) {
        history.push('/dashboard');
      } else {
        history.push('/profile_settings');
      }
    })
    .catch((error) => {
      alert(error);
    });

  return <Grid />;
}
