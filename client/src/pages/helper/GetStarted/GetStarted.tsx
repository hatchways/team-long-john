import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import logo from '../../../Images/logo.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as reactLink } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';

type textChangeFunc = (args: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
type initiaterFunc = () => void;

interface GSProp {
  signup: boolean;
  redirTarget: string;
  textChange: textChangeFunc;
  initiater: initiaterFunc;
}

export default function GetStarted(prop: GSProp): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <img src={logo} className={classes.logo} />
      <Box className={classes.mainContainer}>
        <Box className={classes.mainContent}>
          <Typography className={classes.header}>
            {prop.signup ? 'Sign up with CalendApp' : 'Log into your account'}
          </Typography>
          <Typography className={classes.subHeader}> Enter your e-mail to get started! </Typography>
          <TextField
            className={classes.textField}
            onChange={prop.textChange}
            placeholder="E-mail Address"
            variant="outlined"
            fullWidth
            InputProps={{
              classes: {
                input: classes.textFieldContent,
              },
            }}
          />
          <ButtonBase className={classes.buttonGS} onClick={prop.initiater}>
            Get Started
          </ButtonBase>
        </Box>
        <Box className={classes.redirect}>
          <Typography className={classes.redirectText}>
            {prop.signup ? 'Already have an account? ' : "Don't have an account? "}
            <Link component={reactLink} to={prop.redirTarget} className={classes.link}>
              {prop.signup ? 'Log In' : 'Sign up'}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
