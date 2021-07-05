import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { useAuth } from '../../context/AuthContext';
import useStyles from './useStyles';

const DemoButton = (): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();
  const { updateIsDemoContext } = useAuth();

  const handleClick = () => {
    updateIsDemoContext(true);
    history.push('/dashboard');
  };

  return (
    <Button
      type="submit"
      size="large"
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={handleClick}
    >
      Demo
    </Button>
  );
};

export default DemoButton;
