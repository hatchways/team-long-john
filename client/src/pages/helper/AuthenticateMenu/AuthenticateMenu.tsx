import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import logo from '../../../Images/logo.png';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@material-ui/core/Link';

type simpleFunc = () => void;

interface AuthProp {
  signup: boolean;
  email: string;
  google: simpleFunc;
  diffEmail: simpleFunc;
}

export default function AuthenticateMenu(prop: AuthProp): JSX.Element {
  const classes = useStyles();
  console.log(prop.email);

  return (
    <Box className={classes.wrapper}>
      <img src={logo} className={classes.logo} />
      <Box className={classes.mainContainer}>
        <Box className={classes.mainContent}>
          {prop.signup ? (
            <Box>
              <Typography className={classes.header}> Hi {prop.email}! </Typography>
              <Typography className={classes.subHeader}>
                The easiest way for you to sign up is with Google.
                <br />
                This will automatically connect your calendar so you can start using CalendApp right away!
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography className={classes.header}> Welcome back, </Typography>
              <Typography className={classes.header}> {prop.email} </Typography>
              <Typography className={classes.subHeader} />
            </Box>
          )}
          <ButtonBase className={classes.button} onClick={prop.google}>
            {prop.signup ? 'Sign up' : 'Login'} with Google
          </ButtonBase>
        </Box>
        <Box className={classes.redirect}>
          <Typography className={classes.redirectText}>
            Want to use different email?
            <Link component={Button} onClick={prop.diffEmail} className={classes.link}>
              Click here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
