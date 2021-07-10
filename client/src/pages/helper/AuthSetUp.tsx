import Grid from '@material-ui/core/Grid';
import { useAuth } from '../../context/useAuthContext';

export default function AuthSetUp(): JSX.Element {
  const { updateLoginContext } = useAuth();

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
    .then((data) => updateLoginContext(data.success))
    .catch((error) => alert(error));

  return <Grid />;
}
